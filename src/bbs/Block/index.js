/**
 * const prefixCls = 'style-314252';
 * const images = '/static/images/src/bbs/Block';
 * @Author: czy0729
 * @Date: 2018-10-21 22:03:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-21 22:31:14
 * @Path bt_mb_new /src/bbs/Block/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import Top from './_Top';
import Post from './_Post';
import store from './store';
import { forumMap } from './ds';

const Block = (props, { $ }) => (
  <Layout title={`${forumMap[$.params.params.id]}专区`}>
    <Top />
    <Post className="mt-d" />
  </Layout>
);

Block.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Block));
