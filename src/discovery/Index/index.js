/**
 * const prefixCls = 'style-700432';
 * const images = '/static/images/src/discovery/Index';
 * @Author: czy0729
 * @Date: 2018-07-04 14:40:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-31 23:27:56
 * @Path m.benting.com.cn /src/discovery/Index/index.js
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import Header from './_Header';
import List from './_List';
import FixedTextarea from './_FixedTextarea';
import store from './store';

const Discovery = () => (
  <Layout title="发现" header={<Header />}>
    <List className="mt-d" />
    <FixedTextarea />
  </Layout>
);

export default injectV2(store)(Discovery);
