/**
 * const prefixCls = 'style-198726';
 * const images = '/static/images/src/person/event/Floor';
 * @Author: czy0729
 * @Date: 2018-09-27 14:15:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 15:30:03
 * @Path m.benting.com.cn /src/person/event/Floor/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { ListView } from '@components';
import { Layout } from '@_';
import Row from '@src/person/event/_/Row';
import Utils from '@utils';
import store from './store';

const Floor = (props, { $ }) => {
  const data = $.getState('list');
  const currentTime = Utils.getTimestamp();

  return (
    <Layout title="欢乐踩楼">
      <ListView
        className="tool-list-split mt-d"
        data={data}
        renderRow={item => {
          const {
            orderId,
            addressId,
            threadId,
            title,
            imgId,
            floor,
            allFloor,
            createTime,
            endTime,
            isWin
          } = item;
          const isEnd = currentTime > endTime;
          const extra = isEnd ? '已结束' : <span className="t-success">进行中</span>;

          return (
            <Row
              orderId={orderId}
              addressId={addressId}
              title={String(title).replace('金币踩楼之', '')}
              thumb={imgId}
              createTime={createTime}
              extra={extra}
              endPrice={`${allFloor}楼`}
              endPriceText="总楼层数"
              myPrice={`${floor}楼`}
              myPriceText="我的楼层"
              win={isWin === 1}
              winText="恭喜中奖"
              href={`/bbs/floor/detail?id=${threadId}`}
              as={`/bbs/floor/detail/${threadId}`}
            />
          );
        }}
        onEndReached={$.fetch.list}
      />
    </Layout>
  );
};

Floor.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Floor));
