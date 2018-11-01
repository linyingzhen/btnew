/**
 * const prefixCls = 'style-884654';
 * const images = '/static/images/src/pay/Result';
 * @Author: czy0729
 * @Date: 2018-09-21 17:52:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-21 17:55:35
 * @Path m.benting.com.cn /src/pay/Result/index.js
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import Info from './_Info';
import store from './store';

const Detail = () => (
  <Layout title="支付结果">
    <Info />
  </Layout>
);

export default injectV2(store)(Detail);
