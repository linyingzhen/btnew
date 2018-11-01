/**
 * const prefixCls = 'style-210925';
 * const images = '/static/images/src/shop/auction/Index';
 * @Author: czy0729
 * @Date: 2018-09-10 18:27:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-29 17:38:01
 * @Path m.benting.com.cn /src/shop/auction/Index/_Row.js
 */
import React from 'react';
import { observer } from '@';
import Utils from '@utils';
import Row from '@src/shop/_/EventRow';
import { showStateDS, auctionTypeDS, appTypeDS } from './ds';

const _Row = props => {
  const {
    auctionId,
    goodsImg,
    title,
    showState,
    auctionType,
    appType,
    currentNum,
    nowTime,
    beginTime,
    endTime,
    currentPrice
  } = props;

  const tag = Utils.getLabel(showStateDS, showState);
  let temp;
  switch (tag) {
    case '预告中':
      temp = '起拍价';
      break;

    case '进行中':
      temp = '当前价';
      break;

    case '已结束':
      temp = '最终价';
      break;

    default:
      break;
  }

  const type = Utils.getLabel(auctionTypeDS, auctionType);
  const desc = (
    <>
      <span>{temp}</span>
      <span className="t-34 l-34 t-danger ml-xs mr-xs">
        {parseInt(currentPrice)}
      </span>
      <span>{type}</span>
    </>
  );

  let extra;
  if (type === '积分') {
    extra = Utils.getLabel(appTypeDS, appType);
  }

  let sub;
  if (tag !== '预告中') {
    sub = (
      <>
        <span>已参与</span>
        <span className="t-primary ml-xs mr-xs">{currentNum}</span>
        <span>人次</span>
      </>
    );
  }

  return (
    <Row
      thumb={goodsImg}
      title={title}
      extra={extra}
      tag={tag}
      desc={desc}
      sub={sub}
      nowTime={nowTime}
      beginTime={beginTime}
      endTime={endTime}
      href={`/shop/auction/detail?id=${auctionId}`}
      as={`/shop/auction/detail/${auctionId}`}
    />
  );
};

export default observer(_Row);
