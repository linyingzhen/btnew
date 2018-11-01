/**
 * const prefixCls = 'style-145313';
 * const images = '/static/images';
 * @Author: Jun
 * @Date: 2018-08-02 15:09:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 14:51:56
 * @Path m.benting.com.cn \src\person\help\Detail\store.js
 */

import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import Content from './_Content';
import Bottom from './_Bottom';
import store from './store';

const Detail = () => (
  <Layout title="帮助详情" theme="fullTheme">
    <Content />
    <Bottom className="mt-lg" />
  </Layout>
);

export default injectV2(store)(Detail);
