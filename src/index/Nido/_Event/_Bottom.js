/**
 * const prefixCls = 'style-519756';
 * const images = '/static/images/src/index/Nido/_Event';
 * @Author: czy0729
 * @Date: 2018-08-02 14:48:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 19:53:40
 * @Path m.benting.com.cn /src/index/Nido/_Event/_Bottom.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Flex, Badge } from 'antd-mobile';
import { CountDown, Img, Link } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-519756';

const _Bottom = (props, { $ }) => {
  const { panicGold, pointOncebuy, guess, pointAuction } = $.getState('event');

  return (
    <React.Fragment>
      <div className="block block-1">
        <Link className={`${prefixCls}__square`} href="/shop/jianlou">
          <Flex className={`${prefixCls}__content`}>
            <Img
              className={`${prefixCls}__img-sm`}
              src={Utils.getAppImgUrl(panicGold.imgId, 'scale')}
              size="1.2rem"
              transparent
            />
            <div className="ml-16">
              <p className="t-30 l-42 t-title">金币捡漏</p>
              {panicGold.state === 1 && (
                <Flex className="mt-6">
                  <CountDown
                    className="t-24 l-34 t-danger"
                    beginTime={panicGold.beginTime}
                    theme={false}
                  />
                  <span className="t-24 l-34 t-sub">后开始</span>
                </Flex>
              )}
              {panicGold.state === 2 && (
                <Badge className="mt-6" text="进行中" style={Styles._badge} />
              )}
              {panicGold.state === undefined && (
                <p className="t-22 l-48 t-sub">暂无活动</p>
              )}
            </div>
          </Flex>
        </Link>
        <Link className={`${prefixCls}__square`} href="/shop/wabao">
          <Flex className={`${prefixCls}__content`}>
            <Img
              className={`${prefixCls}__img-sm`}
              src={Utils.getAppImgUrl(pointOncebuy.imgId, 'scale')}
              size="1.2rem"
              transparent
            />
            <div className="ml-16">
              <p className="t-30 l-42 t-title">积分挖宝</p>
              {pointOncebuy.state === 2 ? (
                <Badge className="mt-6" text="进行中" style={Styles._badge} />
              ) : (
                <p className="t-22 l-48 t-sub">暂无活动</p>
              )}
            </div>
          </Flex>
        </Link>
      </div>
      <div className="block">
        <Link className={`${prefixCls}__square`} href="/shop/guess">
          <Flex className={`${prefixCls}__content`}>
            <Img
              className={`${prefixCls}__img-sm`}
              src={Utils.getAppImgUrl(guess.imgId, 'scale')}
              size="1.2rem"
              transparent
            />
            <div className="ml-16">
              <p className="t-30 l-42 t-title">欢乐猜鱼</p>
              {guess.state === 2 ? (
                <Badge className="mt-6" text="进行中" style={Styles._badge} />
              ) : (
                <p className="t-22 l-48 t-sub">暂无活动</p>
              )}
            </div>
          </Flex>
        </Link>
        <Link
          className={`${prefixCls}__square`}
          href="/shop/auction?id=1"
          as="/shop/auction/1"
        >
          <Flex className={`${prefixCls}__content`}>
            <Img
              className={`${prefixCls}__img-sm`}
              src={Utils.getAppImgUrl(pointAuction.imgId, 'scale')}
              size="1.2rem"
              transparent
            />
            <div className="ml-16">
              <p className="t-30 l-42 t-title">积分竞拍</p>
              {pointAuction.state === 2 ? (
                <Badge className="mt-6" text="进行中" style={Styles._badge} />
              ) : (
                <p className="t-22 l-48 t-sub">暂无活动</p>
              )}
            </div>
          </Flex>
        </Link>
      </div>

      <style jsx global>{`
        .style-519756 {
        }
        .${prefixCls}__square {
          display: inline-block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          padding-bottom: 45.6%;
        }
        .${prefixCls}__square:last-child {
          top: 50%;
          border-top: ${Styles.border};
        }
        .${prefixCls}__content {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          padding: 6.4% 8%;
        }
        .${prefixCls}__img-sm {
          background-color: transparent;
          background-size: contain;
        }
      `}</style>
      <style jsx>{`
        .style-519756 {
        }
        .block {
          display: inline-block;
          position: relative;
          vertical-align: top;
          width: 50%;
          padding-bottom: 45.6%;
          background: ${Styles.color_theme};
        }
        .block-1 {
          border-right: ${Styles.border};
        }
      `}</style>
    </React.Fragment>
  );
};

_Bottom.contextTypes = {
  $: PropTypes.object
};

export default observer(_Bottom);
