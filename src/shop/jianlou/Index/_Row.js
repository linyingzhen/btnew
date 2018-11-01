/**
 * const prefixCls = 'style-113670';
 * const images = '/static/images/src/shop/jianlou/Index';
 * @Author: czy0729
 * @Date: 2018-09-23 21:49:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 14:42:26
 * @Path m.benting.com.cn /src/shop/jianlou/Index/_Row.js
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
  const {
    panicId,
    imgs,
    title,
    nowTime,
    beginTime,
    endTime,
    perNum,
    salePrice
  } = props;
  const tag = getTag(beginTime, endTime, nowTime, perNum);

  const elPrice = (
    <>
      <span className="t-34 l-34 t-danger ml-xs">{parseFloat(salePrice)}</span>
      <span className="t-danger mr-xs">金币</span>
    </>
  );
  const desc = (
    <>
      <span>捡漏价</span>
      {elPrice}
    </>
  );

  return (
    <Row
      thumb={imgs}
      thumbType="thumb"
      title={title}
      tag={tag}
      desc={desc}
      nowTime={nowTime}
      beginTime={beginTime}
      endTime={endTime}
      href={`/shop/jianlou/detail?id=${panicId}`}
      as={`/shop/jianlou/detail/${panicId}`}
    />
  );
};

export default observer(_Row);
