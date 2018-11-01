/**
 * const prefixCls = 'style-538114';
 * const images = '/static/images/src/school/TechCategory';
 * @Author: czy0729
 * @Date: 2018-09-07 16:58:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-07 17:11:56
 * @Path m.benting.com.cn /src/school/TechCategory/store.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2 } from '@';
import { Layout } from '@_';
import Tech from './_Tech';
import store from './store';

const prefixCls = 'style-538114';

const TechCategory = () => (
  <Layout className={prefixCls} title="教学专题">
    <Tech />
  </Layout>
);

TechCategory.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(TechCategory);
