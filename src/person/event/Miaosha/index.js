/**
 * const prefixCls = 'style-205921';
 * const images = '/static/images/src/person/event/Auction';
 * @Author: czy0729
 * @Date: 2018-09-18 09:55:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-13 17:35:08
 * @Path m.benting.com.cn /src/person/event/Auction/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { ListView } from '@components';
import { Layout } from '@_';
import Row from '@src/person/event/_/Row';
import store from './store';

const Auction = (props, { $ }) => {
  const data = $.getState('list');

  return (
    <Layout title="极速秒杀">
      <ListView
        className="tool-list-split mt-d"
        data={data}
        renderRow={item => {
          const {
            dataType,
            panicType,
            panicId,
            orderId,
            imgs,
            goodsTitle,
            isAddress,
            createTime,
            orderAmount
          } = item;

          let extra;
          let myPrice;
          if (dataType == 2) {
            if (panicType == 1) {
              extra = '本汀余额';
              myPrice = `¥${orderAmount}`;
            } else {
              extra = '金币';
              myPrice = `${orderAmount}金币`;
            }
          } else {
            extra = '灵动余额';
            myPrice = `¥${orderAmount}`;
          }

          return (
            <Row
              orderId={orderId}
              addressId={isAddress}
              extra={extra}
              title={goodsTitle}
              thumb={imgs}
              createTime={createTime}
              myPrice={myPrice}
              myPriceText="价格"
              win
              href={`/shop/miaosha/detail?id=${panicId}`}
              as={`/shop/miaosha/detail/${panicId}`}
            />
          );
        }}
        onEndReached={$.fetch.list}
      />
    </Layout>
  );
};

Auction.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store, { login: true })(observer(Auction));
