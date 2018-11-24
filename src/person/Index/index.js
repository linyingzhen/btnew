/**
 * const prefixCls = 'style-177288';
 * const images = '/static/images/src/person/Index';
 * @Author: cwz0525
 * @Date: 2018-07-16 12:05:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-13 15:04:11
 * @Path m.benting.com.cn /src/person/Index/index.js
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import Header from './_Header';
import List from './_List';
import Menu from './_Menu';
import Top from './_Top';
import store from './store';

const Person = () => (
  <Layout title="个人中心" header={<Header />}>
    <Top />
    <Menu className="mt-d" />
    <List className="mt-d" />
  </Layout>
);

export default injectV2(store, { login: true })(Person);
