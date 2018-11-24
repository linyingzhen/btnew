/**
 * const prefixCls = 'style-348943';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-10-31 11:32:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-13 18:07:04
 * @Path bt_mb_new \src\person\favorites\Index\index.js.git
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import List from './_List';
import store from './store';

const Favorites = () => (
  <Layout title="我的收藏">
    <List />
  </Layout>
);

export default injectV2(store, { login: true })(Favorites);
