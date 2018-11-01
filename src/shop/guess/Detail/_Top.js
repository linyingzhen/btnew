/**
 * const prefixCls = 'style-154659';
 * const images = '/static/images/src/shop/guess/Detail';
 * @Author: czy0729
 * @Date: 2018-09-25 16:07:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 20:17:03
 * @Path m.benting.com.cn /src/shop/guess/Detail/_Top.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Button, CountDown } from '@components';
import Carousel from './_Carousel';
import Utils from '@utils';
import Styles from '@styles';
import { images, guessTypeDS } from './ds';

const prefixCls = 'style-154659';

const _Top = (props, { $ }) => {
  const { className } = props;
  const { endTime, partNum = '-', perPrice, guessType, _loaded } = $.getState(
    'detail'
  );
  const record = $.getState('record');
  const _guessType = Utils.getLabel(guessTypeDS, guessType);

  return (
    <div className={classNames(prefixCls, className, 't-c')}>
      <div className="bg">
        <div className="time">
          {_loaded && (
            <>
              {$.isEnd ? (
                <p className="t-24 l-34 t-c t-void">竞猜已结束</p>
              ) : (
                <>
                  <p className="t-24 l-34 t-c t-void">距离结束还有</p>
                  <CountDown
                    className={`${prefixCls}__count-down mt-24`}
                    now={Utils.getTimestamp()}
                    beginTime={endTime}
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
          <span className="ml-xs mr-xs">
            {record._loaded ? record.pageinfo.recordtotal : '-'}
          </span>
          <span>人次参与，每人最多参与</span>
          <span className="t-event ml-xs mr-xs">{partNum}</span>
          <span>次</span>
        </p>
        {_loaded && (
          <Button
            className="mt-32"
            type="event"
            disabled={$.isEnd}
            onClick={() => Utils.checkLogin($.page.guess)}
          >
            {$.isEnd ? '竞猜结束' : `支付 ${perPrice} ${_guessType} 立即竞猜`}
          </Button>
        )}
      </div>

      <style jsx global>{`
        .style-154659 {
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
        .style-154659 {
          position: relative;
          margin-top: -1rem;
          background: linear-gradient(
            90deg,
            rgba(34, 236, 164, 1) 0%,
            rgba(0, 219, 166, 1) 100%
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
