/**
 * const prefixCls = 'style-162888';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-09 15:42:38
 * @Last Modified by:   lyz0720
 * @Last Modified time: 2018-11-09 15:42:38
 * @Path bt_mb_new \jsconfig.json
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import Header from './_Header';
import Top from './_Top';
import Tabs from './_Tabs';
import store from './store';

const Point = () => (
  <Layout title="超爽积分" header={<Header />}>
    <Top />
    <Tabs />
  </Layout>
);
Point.contentTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Point));
