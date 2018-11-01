/**
 * const prefixCls = 'style-825611';
 * const images = '/static/images/src/shop/guess/Index';
 * @Author: czy0729
 * @Date: 2018-09-25 14:54:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-29 17:46:06
 * @Path m.benting.com.cn /src/shop/guess/Index/_Row.js
 */
import React from 'react';
import { observer } from '@';
import Utils from '@utils';
import Row from '@src/shop/_/EventRow';

const sumType = (start, end, current) => {
  if (current <= start) {
    return '预告中';
  }

  if (!!end && current > end) {
    return '已结束';
  }

  return '进行中';
};

const _Row = props => {
  const { image, goods, startTime, endTime, totalNum, guessId } = props;
  const current = Utils.getTimestamp();
  const tag = sumType(startTime, endTime, current);

  let sub;
  if (tag !== '预告中') {
    sub = (
      <>
        <span>已参与</span>
        <span className="t-primary ml-xs mr-xs">{totalNum || 0}</span>
        <span>人次</span>
      </>
    );
  }

  return (
    <Row
      thumb={image}
      thumbType="thumb"
      title={goods}
      tag={tag}
      sub={sub}
      nowTime={Utils.getTimestamp()}
      beginTime={startTime}
      endTime={endTime}
      href={`/shop/guess/detail?id=${guessId}`}
      as={`/shop/guess/detail/${guessId}`}
    />
  );
};

export default observer(_Row);
