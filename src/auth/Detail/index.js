/**
 * const prefixCls = 'style-906882';
 * const images = '/static/images/src/auth/Detail';
 * @Author: czy0729
 * @Date: 2018-08-13 17:39:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-03 11:39:14
 * @Path m.benting.com.cn /src/auth/Detail/index.js
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import Info from './_Info';
import Log from './_Log';
import store from './store';

const Detail = () => (
  <Layout title="防伪详情">
    <Info />
    <Log className="mt-d" />
  </Layout>
);

export default injectV2(store)(Detail);
