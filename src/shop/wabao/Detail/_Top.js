/**
 * const prefixCls = 'style-115855';
 * const images = '/static/images/src/shop/wabao/Detail';
 * @Author: czy0729
 * @Date: 2018-09-27 17:22:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 20:16:37
 * @Path m.benting.com.cn /src/shop/wabao/Detail/_Top.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Modal } from 'antd-mobile';
import { observer } from '@';
import { Button, CountDown } from '@components';
import Carousel from './_Carousel';
import Utils from '@utils';
import Styles from '@styles';
import { images } from './ds';

const prefixCls = 'style-115855';

const _Top = (props, { $ }) => {
  const { className } = props;
  const {
    endTime,
    perLimit = '-',
    perVipLimit,
    point,
    perTotal,
    _loaded
  } = $.getState('detail');

  return (
    <div className={classNames(prefixCls, className, 't-c')}>
      <div className="bg">
        <div className="time">
          {_loaded && (
            <>
              {$.isEnd ? (
                <p className="t-24 l-34 t-c t-void">挖宝已结束</p>
              ) : (
                <>
                  <p className="t-24 l-34 t-c t-void">距离结束还有</p>
                  <CountDown
                    className={`${prefixCls}__count-down mt-24`}
                    now={Utils.getTimestamp()}
                    beginTime={Number(endTime)}
                    onEnd={$.page.onEnd}
                  />
                </>
              )}
            </>
          )}
        </div>
        <Carousel className="mt-40" />
        <p className="t-24 l-34 t-void mt-32">
          <span>已有</span>
          <span className="ml-xs mr-xs">{perTotal || '-'}</span>
          <span>人次参与，每人最多参与</span>
          <span className="t-event ml-xs mr-xs">{perLimit}</span>
          <span>人次</span>
        </p>
        {_loaded && (
          <Button
            className="mt-32"
            type="event"
            disabled={$.isEnd}
            onClick={() =>
              Utils.checkLogin(() => {
                if (!_loaded) {
                  return;
                }

                const { tempCount } = $.getState();
                const { vip } = $.getState('userInfo');
                const leftCount =
                  vip == 1
                    ? parseInt(perVipLimit) - tempCount
                    : parseInt(perLimit) - tempCount;

                const data = [];
                for (let i = 1; i < leftCount + 1; i += 1) {
                  data.push({
                    text: `挖${i}下`,
                    onPress: () => $.page.showPayConfirm(i)
                  });
                }
                data.push({
                  text: <span className="t-sub">取消</span>
                });

                Modal.alert(
                  '挖宝',
                  `普通用户可参加${perLimit}次，VIP用户${perVipLimit}次`,
                  data
                );
              })
            }
          >
            {$.isEnd ? '挖宝结束' : `支付 ${point}积分 立即挖宝`}
          </Button>
        )}
      </div>

      <style jsx global>{`
        .style-115855 {
        }
        .${prefixCls}__count-down {
          display: inline-block;
        }
        .${prefixCls}__count-down .item {
          display: inline-block;
          width: 0.94rem !important;
          height: auto !important;
          padding: 0.24rem 0.18rem !important;
          line-height: 0.66rem !important;
          font-size: ${Styles.t_48} !important;
          font-weight: bold;
          border-radius: 0.06rem !important;
        }
        .${prefixCls}__count-down .split {
          margin: 0 0.08rem !important;
          font-size: ${Styles.t_48} !important;
        }
      `}</style>
      <style jsx>{`
        .style-115855 {
          position: relative;
          margin-top: -1rem;
          background: linear-gradient(
            90deg,
            rgba(87, 226, 255, 1) 0%,
            rgba(66, 165, 255, 1) 100%
          );
        }
        .bg {
          min-height: 9.24rem;
          padding: 1.4rem 0.8rem 0.4rem;
          background-image: url(${images}/bg.png);
          background-repeat: no-repeat;
          background-size: initial;
          background-position: bottom right;
        }
        .time {
          min-height: 0.34rem;
        }
      `}</style>
    </div>
  );
};

_Top.contextTypes = {
  $: PropTypes.object
};

export default observer(_Top);
