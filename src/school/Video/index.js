/**
 * const prefixCls = 'style-457133';
 * const images = '/static/images/src/school/Video';
 * @Author: czy0729
 * @Date: 2018-09-06 11:51:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-07 18:25:40
 * @Path m.benting.com.cn /src/school/Video/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import Nav from '../_/Nav';
import List from './_List';
import store from './store';
import { menuDS } from '../Index/ds';

const Video = (props, { $ }) => (
  <Layout title="本汀垂钓学院 - 视频">
    <Nav data={menuDS} activeIndex={$.params.params.id} />
    <List className="mt-d" />
  </Layout>
);

Video.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Video));
