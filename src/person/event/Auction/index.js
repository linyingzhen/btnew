/**
 * const prefixCls = 'style-205921';
 * const images = '/static/images/src/person/event/Auction';
 * @Author: czy0729
 * @Date: 2018-09-18 09:55:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-27 15:58:43
 * @Path m.benting.com.cn /src/person/event/Auction/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { ListView } from '@components';
import { Layout } from '@_';
import Row from '@src/person/event/_/Row';
import Utils from '@utils';
import store from './store';

const Auction = (props, { $ }) => {
  const data = $.getState('list');
  const currentTime = Utils.getTimestamp();
  const type = Utils.getQuery('type');
  const ext = type === 'score' ? '积分' : '金币';

  return (
    <Layout title={`${ext}竞拍`}>
      <ListView
        className="tool-list-split mt-d"
        data={data}
        renderRow={item => {
          const {
            orderId,
            addressId,
            title,
            goodsImg,
            createTime,
            isOwn
          } = item;
          const isEnd = currentTime > item.endTime;
          const endPriceText = isEnd ? '最终价' : '当前价';
          const extra = isEnd ? '已结束' : <span className="t-success">进行中</span>;
          const myPrice = String(item.strPrice)
            .split(',')
            .reduce((prev, cur) => parseInt(cur) + prev, 0);

          return (
            <Row
              orderId={orderId}
              addressId={addressId}
              title={title}
              thumb={goodsImg}
              createTime={createTime}
              extra={extra}
              endPrice={`${parseInt(item.currentPrice)}${ext}`}
              endPriceText={endPriceText}
              myPrice={`${myPrice}${ext}`}
              myPriceText="我的出价"
              win={isOwn === 1}
              winText="竞拍成功"
              href={`/shop/auction/detail?id=${item.auctionId}`}
              as={`/shop/auction/detail/${item.auctionId}`}
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

export default injectV2(store)(observer(Auction));
