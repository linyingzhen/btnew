/**
 * const prefixCls = 'style-223361';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-10-22 18:18:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-13 18:08:10
 * @Path bt_mb_new \src\person\customer\Index\index.js.git
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import BtnAdd from '@_/BtnAdd';
import Card from './_Card';
import store from './store';

const Customer = () => (
  <Layout title="我的售后卡" bd={null} theme="fullTheme">
    <h1 className="t-40 ml-32">我的售后卡</h1>
    <p className="t-30 p-w t-sub">
      售后卡可以免费配节，使用需找到原购买店铺客服提供售后工单号。
    </p>
    <Card />
    <BtnAdd href="/service" />
  </Layout>
);

export default injectV2(store, { login: true })(Customer);
