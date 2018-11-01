/**
 * const prefixCls = 'style-159922';
 * const images = '/static/images/src/points/Index';
 * @Author: Jun
 * @Date: 2018-07-25 12:23:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 10:36:30
 * @Path m.benting.com.cn /src/points/Index/index.js
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import store from './store';
import Item from './_Item';
import { menuDS } from './ds';

const Points = () => (
  <Layout title="积分中心" theme="fullTheme">
    <Item data={menuDS} className="points-items" />
  </Layout>
);

export default injectV2(store)(Points);
