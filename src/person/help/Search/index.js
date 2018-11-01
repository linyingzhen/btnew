/**
 * const prefixCls = 'style-174906';
 * const images = '/static/images/src/person/help/Search';
 * @Author: Jun
 * @Date: 2018-08-06 15:28:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 15:04:24
 * @Path m.benting.com.cn /src/person/help/Search/store.js
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import Top from './_Top';
import Questions from './_Questions';
import store from './store';

const Search = () => (
  <Layout title="帮助搜索">
    <Top />
    <Questions className="mt-d" />
  </Layout>
);

export default injectV2(store)(Search);
