/**
 * const prefixCls = 'style-125799';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-10-22 18:31:49
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-10-22 18:35:09
 * @Path bt_mb_new \src\person\customer\Index\_Card.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { ListView } from '@components';

const prefixCls = 'style-125799';

const _Card = (props, { $ }) => {
  const { className } = props;
  const data = $.getState('consumerCardList');

  return (
    <div className={classNames(prefixCls, className)}>
      <ListView
        className="mt-d p-w"
        data={data}
        renderRow={item => (
          <div key={item.tbId} className="mt-24 card-box t-void">
            <p className="t-24">售后工单号:</p>
            <p className="t-48">{item.tbId}</p>
            <p className="t-r">
              <span className="t-24">剩余次数：</span>
              <span className="t-32">{item.carNum}次</span>
            </p>
            <p className="t-32 mt-48">
              来源订单号：
              {item.orderNo}
            </p>
            <hr className="hrwz" />
          </div>
        )}
        onEndReached={$.fetch.fetchConsumerCardList}
      />

      <style jsx>{`
        .style-125799 {
        }
        .card-box {
          position: relative;
          background: url('/static/images/src/person/customer/Index/card_bg.png')
            no-repeat;
          background-size: 100%;
          border-radius: 0.2rem;
          padding: 0.32rem 0.48rem;
          overflow: hidden;
        }
        .hrwz {
          position: absolute;
          left: 0;
          bottom: 1rem;
          z-index: 11;
          width: 100%;
          color: red;
        }
      `}</style>
    </div>
  );
};

_Card.contextTypes = {
  $: PropTypes.object
};

export default observer(_Card);
