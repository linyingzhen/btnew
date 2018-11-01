/**
 * const prefixCls = 'style-211857';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-10-26 09:59:45
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-10-26 10:09:50
 * @Path bt_mb_new \src\person\level\Index\index.js.git
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import Header from './_Header';
import Top from './_Top';
import Tabs from './_Tabs';
import store from './store';

const BtLevel = () => (
  <Layout title="本汀等级" header={<Header />}>
    <Top />
    <Tabs />
  </Layout>
);

export default injectV2(store)(BtLevel);
