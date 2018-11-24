/**
 * const prefixCls = 'style-170281';
 * const images = '/static/images/src/person/level/Index';
 * @Author: czy0729
 * @Date: 2018-10-25 16:19:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-13 17:21:41
 * @Path bt_mb_new /src/person/level/Index/index.js
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import Header from './_Header';
import Top from './_Top';
import Tabs from './_Tabs';
import store from './store';

const Level = () => (
  <Layout title="灵动等级" header={<Header />}>
    <Top />
    <Tabs />
  </Layout>
);

export default injectV2(store, { login: true })(Level);
