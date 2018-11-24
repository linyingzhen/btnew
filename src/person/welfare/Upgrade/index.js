/**
 * const prefixCls = 'style-111156';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-09 13:47:57
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-09 14:32:17
 * @Path bt_mb_new \src\person\welfare\Upgrade\index.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import Header from './_Header';
import Top from './_Top';
import Tabs from './_Tabs';
import Fixed from './_Fixed';
import store from './store';

const Upgrade = () => (
  <Layout title="升级尊享" header={<Header />}>
    <Top />
    <Tabs />
    <Fixed />
  </Layout>
);

Upgrade.contentTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Upgrade));
