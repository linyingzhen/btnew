/**
 * const prefixCls = 'style-912613';
 * const images = '/static/images/src/event/Index';
 * @Author: czy0729
 * @Date: 2018-10-11 14:53:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-15 10:17:14
 * @Path m.benting.com.cn /src/event/Index/_Row.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import Utils from '@utils';

const _Row = props => {
  const { tbId, acNaem, covermapId, startTime, endTime, className } = props;

  const now = Utils.getTimestamp();
  let onClick;
  if (now > endTime) {
    onClick = () => Utils.light('该活动已结束');
  } else if (now < startTime) {
    onClick = () => Utils.light('该活动尚未开始');
  } else {
    onClick = () =>
      Utils.router.push(
        `/event/cashback?id=${tbId}`,
        `/event/cashback/${tbId}`
      );
  }

  return (
    <img
      className={classNames('tool-animate-scale', className)}
      src={Utils.getAppImgUrl(covermapId, 'scale')}
      alt={acNaem}
      style={{
        width: '100%',
        borderRadius: '0.16rem',
        boxShadow: '0 0.1rem 0.3rem rgba(0, 0, 0, 0.4)'
      }}
      onClick={onClick}
    />
  );
};

_Row.contextTypes = {
  $: PropTypes.object
};

export default observer(_Row);
