/**
 * const prefixCls = 'style-214355';
 * const images = '/static/images/src/person/help/Service';
 * @Author: czy0729
 * @Date: 2018-09-08 11:44:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 14:21:18
 * @Path m.benting.com.cn /src/person/help/Service/index.js
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import Styles from '@styles';
import Top from './_Top';
import Step from './_Step';
import Tip from './_Tip';
import store from './store';

const Service = () => (
  <Layout
    title="在线客服"
    headerStyle={{
      color: Styles.color_theme,
      background: Styles.color_main
    }}
  >
    <Top />
    <Step className="mt-d" />
    <Tip className="mt-d" />
  </Layout>
);

export default injectV2(store)(Service);
