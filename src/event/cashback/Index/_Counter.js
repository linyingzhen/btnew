/**
 * const prefixCls = 'style-118465';
 * const images = '/static/images/src/event/cashback/Index';
 * @Author: czy0729
 * @Date: 2018-10-15 16:32:57
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-10-15 16:32:57
 * @Path m.benting.com.cn /src/event/cashback/Index/_Counter.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { images } from './ds';

const prefixCls = 'style-118465';

const _Counter = (props, { $ }) => {
  const { className } = props;
  const { number, remainNum } = $.getState('eventDetail');

  // 若number为0，表示这活动不受名额限制
  let _remainNum;
  if (number) {
    const { length } = remainNum.toString();

    switch (length) {
      case 1:
        _remainNum = `0000${remainNum}`;
        break;

      case 2:
        _remainNum = `000${remainNum}`;
        break;

      case 3:
        _remainNum = `00${remainNum}`;
        break;

      case 4:
        _remainNum = `0${remainNum}`;
        break;

      default:
        _remainNum = remainNum;
        break;
    }
  }

  return (
    <div className={classNames(prefixCls, className)}>
      {number != 0 && (
        <>
          <img className="img-counter" src={`${images}/counter.png`} alt="" />
          <p className="p-num t-48 t-void">{_remainNum}</p>
        </>
      )}

      <style jsx>{`
        .style-118465 {
          position: relative;
          width: 100%;
          min-height: 100px;
          margin-top: 55%;
          text-align: center;
        }
        .img-counter {
          width: 6.36rem;
          height: 1.78rem;
        }
        .p-num {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: 0.16rem;
          margin-left: 0.92rem;
          letter-spacing: 0.28rem;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
};

_Counter.contextTypes = {
  $: PropTypes.object
};

export default observer(_Counter);
