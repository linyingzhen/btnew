/**
 * const prefixCls = 'style-835813';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-08 17:30:28
 * @Last Modified by:   lyz0720
 * @Last Modified time: 2018-11-08 17:30:28
 * @Path bt_mb_new \src\person\welfare\Birthday\index.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import Header from './_Header';
import Top from './_Top';
import Tabs from './_Tabs';
import store from './store';

const Birthday = () => (
  <Layout title="生日尊享" header={<Header />}>
    <Top />
    <Tabs />
  </Layout>
);
Birthday.contentTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Birthday));
