/**
 * const prefixCls = 'style-162266';
 * const images = '/static/images/src/index/nearby/Index';
 * @Author: czy0729
 * @Date: 2018-10-22 10:58:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-30 12:01:13
 * @Path bt_mb_new /src/index/nearby/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { injectV2, observer } from '@';
import { List, Flex, Icon, Img } from '@components';
import { Layout } from '@_';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import G from '@stores/g';
import store from './store';
import { prefixCls } from './ds';

@injectV2(store)
@observer
export default class Index extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  componentDidMount() {
    if (Const.__CLIENT__) {
      const { $ } = this.context;

      Utils.removeHD();
      G.loadAMapJS(() => $.page.initMap());
    }
  }

  componentWillUnmount() {
    if (Const.__CLIENT__) {
      Utils.setHD();
    }
  }

  render() {
    const { $ } = this.context;
    const { selectMarkerIndex } = $.getState();
    const { list } = $.getState('shopList');

    return (
      <Layout className={prefixCls} title="附近经销商" hide>
        <div className="wrap-map">
          <Flex
            className={`${prefixCls}__btn-back`}
            justify="center"
            onClick={Utils.router.back}
          >
            <Icon className="t-36 t-void" type="left" />
          </Flex>
          <Flex className={`${prefixCls}__btn-home`} justify="center" href="/">
            <Icon className="t-36 t-void" type="home-fill" />
          </Flex>
          <div id="amap" className="amap" />
        </div>
        <List className={`${prefixCls}__list`}>
          {list.map((item, index) => (
            <List.Item
              key={item.allianceId}
              className={`${prefixCls}__item-${index}`}
              thumb={
                <div
                  className={classNames({
                    'amap-simple-marker': true,
                    'amap-simple-marker-numv1-style': true,
                    [`${prefixCls}__marker`]: true,
                    [`amap-simple-marker-style-red-${index + 1}`]:
                      selectMarkerIndex !== index,
                    [`amap-simple-marker-style-blue-${index + 1}`]:
                      selectMarkerIndex === index
                  })}
                  onClick={() => $.page.selectMarker(index)}
                >
                  <div className="amap-simple-marker-icon" />
                </div>
              }
            >
              <Flex wrap="wrap">
                <Flex.Item
                  className="ml-sm"
                  href={`/nearby/detail?id=${item.allianceId}`}
                  as={`/nearby/detail/${item.allianceId}`}
                >
                  <p className="t-32">
                    <span>{item.shopName}</span>
                    <span className="t-24"> | </span>
                    <span className="t-24 t-sub">
                      {(item.distance / 1000).toFixed(2)}
                      km
                    </span>
                  </p>
                  <p className="p-address t-24 t-sub mt-8">
                    地址：
                    {item.address || '-'}
                  </p>
                </Flex.Item>
                <Img
                  className={`${prefixCls}__thumb ml-sm`}
                  src={item.shopFace}
                  lazyload
                  animate
                  size="1rem"
                  style={{
                    minWidth: '1.6rem'
                  }}
                  onClick={() => $.page.selectMarker(index)}
                />
              </Flex>
            </List.Item>
          ))}
        </List>

        <style jsx global>{`
          .style-162266 {
            padding-bottom: 0 !important;
          }
          .${prefixCls}__btn-back {
            position: absolute;
            z-index: 1000;
            top: ${Styles.space};
            left: ${Styles.wind};
            width: 0.64rem;
            height: 0.64rem;
            background: rgba(0, 0, 0, 0.64);
            border-radius: 50%;
            opacity: 0.8;
          }
          .${prefixCls}__btn-home {
            position: absolute;
            z-index: 1000;
            top: ${Styles.space};
            right: ${Styles.wind};
            width: 0.64rem;
            height: 0.64rem;
            background: rgba(0, 0, 0, 0.64);
            border-radius: 50%;
            opacity: 0.8;
          }
          .${prefixCls}__marker {
            width: 0.576rem !important;
            height: 0.576rem !important;
          }
          .${prefixCls}__list {
            margin-top: 75%;
          }
          .${prefixCls}__thumb {
            border: ${Styles.border};
          }
        `}</style>
        <style jsx>{`
          .style-162266 {
          }
          .wrap-map {
            position: fixed;
            z-index: 100;
            top: 0;
            left: 0;
            right: 0;
          }
          .amap {
            position: relative;
            padding-bottom: 75%;
            background: #fcf9f2;
            border-bottom: ${Styles.border};
            overflow: hidden;
          }
          .p-address {
            white-space: initial;
          }
        `}</style>
      </Layout>
    );
  }
}
