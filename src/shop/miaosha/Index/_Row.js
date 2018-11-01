/**
 * const prefixCls = 'style-849420';
 * const images = '/static/images/src/shop/miaosha/Index';
 * @Author: czy0729
 * @Date: 2018-09-20 16:29:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 14:42:41
 * @Path m.benting.com.cn /src/shop/miaosha/Index/_Row.js
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
    salePrice,
    price,
    dataType,
    panicType
  } = props;
  const tag = getTag(beginTime, endTime, nowTime, perNum);

  let extra;
  let elPrice;
  if (dataType == 2) {
    if (panicType == 1) {
      extra = '本汀余额';
      elPrice = (
        <>
          <span className="t-danger ml-xs">¥</span>
          <span className="t-34 l-34 t-danger mr-xs">
            {parseFloat(salePrice)}
          </span>
        </>
      );
    } else {
      extra = '金币';
      elPrice = (
        <>
          <span className="t-34 l-34 t-danger ml-xs">
            {(salePrice * 1000) / 100}
          </span>
          <span className="t-danger mr-xs">金币</span>
        </>
      );
    }
  } else {
    extra = '灵动余额';
    elPrice = (
      <>
        <span className="t-danger ml-xs">¥</span>
        <span className="t-34 l-34 t-danger mr-xs">
          {parseFloat(salePrice)}
        </span>
      </>
    );
  }

  const desc = (
    <>
      <span>秒杀价</span>
      {elPrice}
    </>
  );

  const sub = (
    <span className="del">
      原价
      {parseFloat(price)}
    </span>
  );

  return (
    <Row
      thumb={imgs}
      title={title}
      extra={extra}
      tag={tag}
      desc={desc}
      sub={sub}
      nowTime={nowTime}
      beginTime={beginTime}
      endTime={endTime}
      href={`/shop/miaosha/detail?id=${panicId}`}
      as={`/shop/miaosha/detail/${panicId}`}
    />
  );
};

export default observer(_Row);
