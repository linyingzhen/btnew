/**
 * const prefixCls = 'style-107983';
 * const images = '/static/images/src/index/nearby/Index';
 * @Author: czy0729
 * @Date: 2018-10-22 10:57:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-22 12:58:45
 * @Path bt_mb_new /src/index/nearby/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import { prefixCls } from './ds';

export default class Store extends common {
  map; // 地图实例
  circle; // circle实例
  fakeLocationMarker;
  markers = []; // 标注集实例
  geo = {
    count: 0,
    lng: null,
    lat: null
  };
  needRefreshList = false;
  needDropAnimate = false;
  lastSelectMarkerIndex = null; // 上一次点击的标注index

  @observable
  state = this.initState({
    state: {
      selectMarkerIndex: null
    },

    // 商铺列表
    shopList: Const.__EMPTY__
  });

  fetch = {
    config: {},

    // 商铺列表
    shopList: (lng, lat, distance = 1) =>
      this.fetchThenSetState('get_merchant_shop-list', 'shopList', {
        _: {
          limit: Const.__LIMIT__ * 2,
          search: {
            userLon: lng,
            userLat: lat,
            distance
          }
        }
      })
  };

  page = {
    // 地图初始化
    initMap: () => {
      // 地图初始化
      if (this.geo.count) {
        const { lng, lat } = this.geo;

        this.map = new window.AMap.Map('amap', {
          zoom: 13,
          center: new window.AMap.LngLat(lng, lat),
          features: ['bg', 'road', 'point']
        });

        // 因为没有定位，要手动创建一个定位标记
        this.fakeLocationMarker = new window.AMap.Marker({
          content:
            '<img style="position:relative;cursor:pointer;" width="23px" height="23px" src="https://webapi.amap.com/theme/v1.3/markers/b/loc.png">',
          position: new window.AMap.LngLat(lng, lat),
          offset: new window.AMap.Pixel(-12, -12),
          map: this.map
        });
      } else {
        this.map = new window.AMap.Map('amap', {
          zoom: 13,
          features: ['bg', 'road', 'point']
        });
      }

      // 加载组件
      const plugin = () => {
        this.map.addControl(new window.AMap.ToolBar());
        this.map.addControl(new window.AMap.Scale());
        // this.map.addControl(new window.AMap.OverView({ isOpen: false }));
      };
      window.AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], () => plugin());

      this.page.geolocation();
    },

    geolocation: () => {
      this.map.plugin('AMap.Geolocation', () => {
        const geolocation = new window.AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：无穷大
          maximumAge: 60000, // 定位结果缓存0毫秒，默认：0
          convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, // 显示定位按钮，默认：true
          buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new window.AMap.Pixel(10, 50), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true // 定位成功后将定位到的位置作为地图中心点，默认：true
          // zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        this.map.addControl(geolocation);

        window.AMap.event.addListener(geolocation, 'complete', res => {
          const { lng, lat } = res.position;

          this.geo = {
            count: 0,
            lng,
            lat
          };
          if (this.fakeLocationMarker) {
            this.fakeLocationMarker.setMap(null);
          }
          this.needRefreshList = true;
          this.page.setCircle();
          this.page.getList();
          this.geo.count = this.geo.count + 1;
        });
        window.AMap.event.addListener(geolocation, 'error', () => {
          Utils.light('定位失败，请点击地图左下方按钮重新定位');
        });

        if (this.geo.count === 0) {
          geolocation.getCurrentPosition();
        } else {
          this.page.setCircle();
          this.page.getList();
        }
      });
    },

    getList: async () => {
      const { lng, lat } = this.geo;

      let data;
      if (this.needRefreshList) {
        this.needRefreshList = false;
        this.needDropAnimate = true;
        data = await this.fetch.shopList(lng, lat);
      } else {
        data = this.getState('shopList');
      }

      window.AMapUI.loadUI(['overlay/SimpleMarker'], SimpleMarker => {
        // 移除上一次的markers
        if (this.markers.length) {
          this.markers.forEach(marker => {
            marker.setMap(null);
          });

          this.markers = [];
        }

        // 列表每次加载时，都需要跌落动画
        if (this.needDropAnimate) {
          this.needDropAnimate = false;

          data.list.forEach((item, index) => {
            setTimeout(() => {
              const marker = new SimpleMarker({
                map: this.map,
                animation: 'AMAP_ANIMATION_DROP',
                containerClassNames: `${prefixCls}__marker`,
                iconTheme: 'numv1',
                iconStyle: `red-${index + 1}`,
                position: [item.lon, item.lat],
                clickable: true
              });

              marker.on('click', () => {
                this.page.selectMarker(index, true);
              });

              this.markers.push(marker);
            }, 160 * index);
          });
        } else {
          data.list.forEach((item, index) => {
            const marker = new SimpleMarker({
              map: this.map,
              containerClassNames: `${prefixCls}__marker`,
              iconTheme: 'numv1',
              iconStyle: `red-${index + 1}`,
              position: [item.lon, item.lat],
              clickable: true
            });

            marker.on('click', () => {
              this.page.selectMarker(index, true);
            });

            this.markers.push(marker);
          });
        }
      });
    },

    // 设置定位中心圆圈
    setCircle: () => {
      const { lng, lat } = this.geo;

      // 删除上一个圆圈
      if (this.circle) {
        this.circle.setMap(null);
      }

      this.circle = new window.AMap.Circle({
        center: new window.AMap.LngLat(lng, lat), // 圆心位置
        radius: 1000, // 半径
        strokeColor: Styles.color_primary, // 线颜色
        strokeOpacity: 0.8, // 线透明度
        strokeWeight: 1, // 线粗细度
        fillColor: Styles.color_primary, // 填充颜色
        fillOpacity: 0.24 // 填充透明度
      });
      this.circle.setMap(this.map);
    },

    // 标注点击
    selectMarker: (index, scroll = false) => {
      // const { selectMarkerIndex } = this.getState();
      const shopList = this.getState('shopList');

      this.setState({
        selectMarkerIndex: index
      });

      // 点击标注，以标注为中心点
      const { lon, lat } = shopList.list[index];
      this.map.setCenter(new window.AMap.LngLat(lon, lat));

      // 还原上一个active标注
      if (this.lastSelectMarkerIndex !== null) {
        this.markers[this.lastSelectMarkerIndex].setIconStyle(
          `red-${this.lastSelectMarkerIndex + 1}`
        );
      }
      this.markers[index].setIconStyle(`blue-${index + 1}`);
      this.lastSelectMarkerIndex = index;

      // 列表项滚动到可视位置
      if (scroll) {
        Utils.scrollTo(
          document.querySelector(`.${prefixCls}__item-${index}`).offsetTop
        );
      }
    }
  };
}
