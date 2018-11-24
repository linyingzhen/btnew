/**
 * const prefixCls = 'style-136163';
 * const images = '/static/images/src/person/event/Wabao';
 * @Author: czy0729
 * @Date: 2018-09-28 15:53:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-13 17:37:50
 * @Path m.benting.com.cn /src/person/event/Wabao/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { ListView } from '@components';
import { Layout } from '@_';
import Row from '@src/person/event/_/Row';
import Utils from '@utils';
import store from './store';

const Wabao = (props, { $ }) => {
  const data = $.getState('list');
  const currentTime = Utils.getTimestamp();

  return (
    <Layout title="积分挖宝">
      <ListView
        className="tool-list-split mt-d"
        data={data}
        renderRow={item => {
          const {
            orderId,
            addressId,
            oncebuyId,
            title,
            goodsImg,
            nums,
            winNo,
            createTime,
            endTime,
            isWin
          } = item;
          const isEnd = currentTime > endTime;
          const extra = isEnd ? (
            '已结束'
          ) : (
            <span className="t-success">进行中</span>
          );

          return (
            <Row
              orderId={orderId}
              addressId={addressId}
              title={title}
              thumb={goodsImg}
              thumbType="thumb"
              createTime={createTime}
              extra={extra}
              endPrice={winNo || '-'}
              endPriceText="中奖号码"
              myPrice={
                String(nums).length > 10 ? (
                  <span className="t-24">{nums}</span>
                ) : (
                  nums
                )
              }
              myPriceText="我的号码"
              win={isWin == 1}
              winText="挖宝成功"
              href={`/shop/wabao/detail?id=${oncebuyId}`}
              as={`/shop/wabao/detail/${oncebuyId}`}
            />
          );
        }}
        onEndReached={$.fetch.list}
      />
    </Layout>
  );
};

Wabao.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store, { login: true })(observer(Wabao));
