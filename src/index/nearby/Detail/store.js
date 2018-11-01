/**
 * const prefixCls = 'style-416399';
 * const images = '/static/images/src/index/nearby/Detail';
 * @Author: czy0729
 * @Date: 2018-10-22 12:02:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-22 17:06:41
 * @Path bt_mb_new /src/index/nearby/Detail/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import { prefixCls } from './ds';

export default class Store extends common {
  @observable
  state = this.initState({
    // 商铺详情
    shopDetail: {}
  });

  fetch = {
    config: {},

    // 商铺列表
    shopDetail: async () => {
      let shopDetail = this.getState('shopDetail');

      let res;
      if (!shopDetail.allianceId) {
        const { id } = this.params.params;

        const res = this.fetchThenSetState(
          'get_merchant_shop-detail',
          'shopDetail',
          {
            allianceId: id
          }
        );
        shopDetail = await res;
      }

      this.page.initMap(shopDetail.lon, shopDetail.lat);

      return res;
    }
  };

  page = {
    initMap: (lng, lat) => {
      this.map = new window.AMap.Map('amap', {
        center: new window.AMap.LngLat(lng, lat),
        zoom: 13,
        features: ['bg', 'road', 'point']
      });

      const plugin = () => {
        this.map.addControl(new window.AMap.ToolBar());
        this.map.addControl(new window.AMap.Scale());
        this.map.addControl(new window.AMap.OverView({ isOpen: false }));
      };
      window.AMap.plugin(
        ['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView'],
        () => {
          plugin();
        }
      );

      window.AMapUI.loadUI(['overlay/SimpleMarker'], SimpleMarker => {
        /* eslint-disable-next-line */
        new SimpleMarker({
          map: this.map,
          containerClassNames: `${prefixCls}__marker`,
          iconTheme: 'numv1',
          iconStyle: 'red',
          position: [lng, lat]
        });
      });
    },

    doNavigate: () => {
      const shopDetail = this.getState('shopDetail');

      if (Const.__WX__) {
        wx.openLocation({
          latitude: parseFloat(shopDetail.lat), // 纬度，浮点数，范围为90 ~ -90
          longitude: parseFloat(shopDetail.lon), // 经度，浮点数，范围为180 ~ -180。
          name: shopDetail.shopName, // 位置名
          address: shopDetail.address, // 地址详情说明
          scale: 12 // 地图缩放级别,整形值,范围从1~28。默认为最大
          // infoUrl: '' //在查看位置界面底部显示的超链接,可点击跳转
        });
      } else {
        window.location = `https://m.amap.com/navigation/index/daddr=${
          shopDetail.lon
        },${shopDetail.lat},${shopDetail.shopName}`;
      }
    }
  };
}
