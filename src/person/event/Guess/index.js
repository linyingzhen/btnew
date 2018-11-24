/**
 * const prefixCls = 'style-903353';
 * const images = '/static/images/src/person/event/Guess';
 * @Author: czy0729
 * @Date: 2018-09-27 09:48:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-13 17:37:25
 * @Path m.benting.com.cn /src/person/event/Guess/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { ListView } from '@components';
import { Layout } from '@_';
import Row from '@src/person/event/_/Row';
import Utils from '@utils';
import store from './store';

const Guess = (props, { $ }) => {
  const data = $.getState('list');
  const currentTime = Utils.getTimestamp();
  const type = Utils.getQuery('type');
  const ext = type === 'score' ? '积分' : '金币';

  return (
    <Layout title={`${ext}猜鱼`}>
      <ListView
        className="tool-list-split mt-d"
        data={data}
        renderRow={item => {
          const {
            orderId,
            addressId,
            guessId,
            title,
            imgId,
            information,
            weight,
            createTime,
            endTime,
            isWin,
            number,
            top
          } = item;
          const isEnd = currentTime > endTime;
          const extra = isEnd ? (
            '已结束'
          ) : (
            <span className="t-success">进行中</span>
          );
          const text = `竞猜成功（第${top}名，前${number}名可领奖）`;

          return (
            <Row
              orderId={orderId}
              addressId={addressId}
              title={title}
              thumb={imgId}
              thumbType="thumb"
              createTime={createTime}
              extra={extra}
              endPrice={`${weight || '-'}斤`}
              endPriceText="实际重量"
              myPrice={`${information}斤`}
              myPriceText="我猜"
              win={isWin === 2 && top <= number}
              winText={text}
              winDefaultText={isWin === 2 && text}
              href={`/shop/guess/detail?id=${guessId}`}
              as={`/shop/guess/detail/${guessId}`}
            />
          );
        }}
        onEndReached={$.fetch.list}
      />
    </Layout>
  );
};

Guess.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store, { login: true })(observer(Guess));
