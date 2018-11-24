/**
 * const prefixCls = 'style-873390';
 * const images = '/static/images/src/person/order/Index';
 * @Author: lyz0720
 * @Date: 2018-10-23 13:46:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-13 17:50:00
 * @Path bt_mb_new /src/person/order/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { ListView } from '@components';
import { Layout } from '@_';
import BtnAdd from '@_/BtnAdd';
import Row from './_Row';
import store from './store';

const Order = (props, { $ }) => {
  const data = $.getState('orders');

  return (
    <Layout title="我的订单">
      <ListView
        className="tool-list-split mt-d"
        data={data}
        renderRow={item => <Row {...item} />}
        onEndReached={$.fetch.orders}
      />
      <BtnAdd href="/service" />
    </Layout>
  );
};

Order.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store, { login: true })(observer(Order));
