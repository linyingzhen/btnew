/**
 * const prefixCls = 'style-136091';
 * const images = '/static/images/src/school/Tech';
 * @Author: czy0729
 * @Date: 2018-09-06 12:06:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-06 16:03:04
 * @Path m.benting.com.cn /src/school/Tech/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import Header from './_Header';
import Detail from './_Detail';
import List from './_List';
import store from './store';

const Tech = (props, { $ }) => {
  const { name } = $.getState('detail');

  return (
    <Layout title={name || '教学专题'} header={<Header />}>
      <Detail />
      <List />
    </Layout>
  );
};

Tech.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Tech));
