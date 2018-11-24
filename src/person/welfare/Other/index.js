/**
 * const prefixCls = 'style-197571';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-12 14:16:33
 * @Last Modified by:   lyz0720
 * @Last Modified time: 2018-11-12 14:16:33
 * @Path bt_mb_new \src\person\welfare\Other\index.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import Header from './_Header';
import Top from './_Top';
import Content from './_Content';
import store from './store';

const Other = () => (
  <Layout title="其他特权" header={<Header />}>
    <Top />
    <Content />
  </Layout>
);
Other.contentTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Other));
