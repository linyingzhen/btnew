/**
 * const prefixCls = 'style-480231';
 * const images = '/static/images/src/shop/auction/Detail';
 * @Author: czy0729
 * @Date: 2018-09-11 17:05:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-29 14:21:10
 * @Path m.benting.com.cn /src/shop/auction/Detail/_Row.js
 */
import React from 'react';
import { observer } from '@';
import { List, Flex } from '@components';
import { Avatar } from '@_';
import Utils from '@utils';

const _Row = props => {
  const {
    userId,
    faceImg,
    niname,
    auctionTime,
    auctionPriceTotal,
    type
  } = props;

  return (
    <List.Item thumb={<Avatar userId={userId} img={faceImg} />}>
      <Flex>
        <Flex.Item>
          <p className="t-30 l-44">{niname}</p>
          <p className="t-24 l-36 t-sub">
            {Utils.date('m-d H:i:s', auctionTime)}
          </p>
        </Flex.Item>
        <p>
          <span className="t-30 l-44 t-danger">
            {parseInt(auctionPriceTotal)}
          </span>
          <span className="t-24 l-36 t-sub ml-xs">{type}</span>
        </p>
      </Flex>
    </List.Item>
  );
};

export default observer(_Row);
