/**
 * const prefixCls = 'style-206002';
 * const images = '/static/images/src/shop/wabao/Index';
 * @Author: czy0729
 * @Date: 2018-09-27 16:36:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 14:42:58
 * @Path m.benting.com.cn /src/shop/wabao/Index/_Row.js
 */
import React from 'react';
import { observer } from '@';
import Row from '@src/shop/_/EventRow';

const getTag = (start, end, current, now) => {
  const _start = parseInt(start);
  const _end = parseInt(end);
  const _current = parseInt(current);
  const _now = parseInt(now);

  if (_current <= _start) {
    return '预告中';
  }

  if (!_now || (!!_end && _current > _end)) {
    return '已结束';
  }

  return '进行中';
};

const _Row = props => {
  const { oncebuyId, imgs, title, nowTime, beginTime, endTime, state } = props;

  // 3 揭奖中
  const tag = getTag(beginTime, endTime, nowTime, parseInt(state) >= 3 ? 0 : 1);

  return (
    <Row
      thumb={imgs}
      thumbType="thumb"
      title={title}
      tag={tag}
      nowTime={nowTime}
      beginTime={beginTime}
      endTime={endTime}
      href={`/shop/wabao/detail?id=${oncebuyId}`}
      as={`/shop/wabao/detail/${oncebuyId}`}
    />
  );
};

export default observer(_Row);
