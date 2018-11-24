/**
 * const prefixCls = 'style-899387';
 * const images = '/static/images/src/person/publish/Index';
 * @Author: czy0729
 * @Date: 2018-07-31 18:29:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-13 17:52:20
 * @Path m.benting.com.cn /src/person/publish/Index/index.js
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import List from './_List';
import store from './store';

const Publish = () => (
  <Layout title="我的发布">
    <List />
  </Layout>
);

export default injectV2(store, { login: true })(Publish);
