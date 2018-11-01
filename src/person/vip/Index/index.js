/**
 * const prefixCls = 'style-598269';
 * const images = '/static/images/src/index/VIP';
 * @Author: cwz0525
 * @Date: 2018-07-09 11:27:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-17 17:54:12
 * @Path m.benting.com.cn /src/index/VIP/index.js
 */
import React from 'react';
import { observer, injectV2 } from '@';
import { Layout } from '@_';
import Styles from '@styles';
import Top from './_Top';
import Menu from './_Menu';
import List from './_List';
import store from './store';

const Vip = () => (
  <Layout
    title="会员中心"
    headerStyle={{
      background: Styles.color_main,
      color: Styles.color_void
    }}
  >
    <Top />
    <Menu />
    <List className="mt-d" />
  </Layout>
);

export default injectV2(store)(observer(Vip));
