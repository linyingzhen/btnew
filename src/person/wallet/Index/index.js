/**
 * const prefixCls = 'style-888122';
 * const images = '/static/images/src/index/Sign';
 * @Author: cwz0525
 * @Date: 2018-07-11 11:08:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-13 09:20:01
 * @Path m.benting.com.cn /src/person/wallet/Index/index.js
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import Styles from '@styles';
import ExchangeBtn from './_ExchangeBtn';
import Main from './_Main';
import Menu from './_Menu';
import List from './_List';
import store from './store';

const Wallet = () => (
  <Layout
    title="我的资产"
    bd={null}
    ft={<ExchangeBtn />}
    headerStyle={{
      color: Styles.color_theme,
      background: 'transparent'
    }}
  >
    <Main />
    <Menu />
    <List className="mt-d" />
  </Layout>
);

export default injectV2(store)(Wallet);
