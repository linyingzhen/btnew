/**
 * const prefixCls = 'style-148159';
 * const images = '/static/images/src/index/Nido/_Event';
 * @Author: czy0729
 * @Date: 2018-08-02 14:42:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 19:53:11
 * @Path m.benting.com.cn /src/index/Nido/_Event/_Top.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'antd-mobile';
import { observer } from '@';
import { CountDown, Img, Link } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-148159';

const _Top = (props, { $ }) => {
  const { panic, floor, goldAuction } = $.getState('event');

  return (
    <React.Fragment>
      <Link className={`${prefixCls}__block`} href="/shop/miaosha">
        <div className="content">
          <p>
            <span className="t-34 l-48 t-danger">极速秒杀</span>
            <span className="t-24 l-34 t-sub ml-8">倒计时：</span>
          </p>
          <CountDown className="mt-10" beginTime={panic.beginTime}>
            <span className="t-24 mt-10">进行中</span>
          </CountDown>
          <Img
            className={`${prefixCls}__img-lg`}
            src={Utils.getAppImgUrl(panic.imgId)}
            size="1.6rem"
            transparent
          />
        </div>
      </Link>
      <div className={`${prefixCls}__block`}>
        <Link className={`${prefixCls}__square`} href="/bbs/floor">
          <div className="content">
            <p className="t-30 l-42">欢乐踩楼</p>
            <Badge className="mt-6" text="进行中" style={Styles._badge} />
            <Img
              className={`${prefixCls}__img-sm`}
              src={Utils.getAppImgUrl(floor.imgId, 'scale')}
              size="1.2rem"
              transparent
            />
          </div>
        </Link>
        <Link className={`${prefixCls}__square`} href="/shop/auction">
          <div className="content">
            <p className="t-30 l-42">金币竞拍</p>
            {goldAuction.state === 2 && (
              <Badge className="mt-6" text="进行中" style={Styles._badge} />
            )}
            <Img
              className={`${prefixCls}__img-sm`}
              src={Utils.getAppImgUrl(goldAuction.imgId, 'scale')}
              size="1.2rem"
              transparent
            />
          </div>
        </Link>
      </div>

      <style jsx global>{`
        .style-148159 {
        }
        .${prefixCls}__block {
          display: inline-block;
          position: relative;
          vertical-align: top;
          width: 50%;
          padding-bottom: 45.6%;
          background: ${Styles.color_theme};
        }
        .${prefixCls}__block:first-child {
          border-right: ${Styles.border};
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
        .${prefixCls}__img-lg {
          position: absolute;
          right: 0.2rem;
          bottom: 0.2rem;
          background-color: transparent;
          background-size: contain;
        }
        .${prefixCls}__img-sm {
          position: absolute;
          top: 50%;
          right: ${Styles.wind};
          background-color: transparent;
          background-size: contain;
          transform: translateY(-50%);
        }
      `}</style>
      <style jsx>{`
        .style-148159 {
        }
        .content {
          ${Styles._full};
          padding: 6.4% 8%;
        }
      `}</style>
    </React.Fragment>
  );
};

_Top.contextTypes = {
  $: PropTypes.object
};

export default observer(_Top);
