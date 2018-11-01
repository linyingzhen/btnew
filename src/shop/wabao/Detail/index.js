/**
 * const prefixCls = 'style-778967';
 * const images = '/static/images/src/shop/guess/Detail';
 * @Author: czy0729
 * @Date: 2018-09-25 15:53:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-28 15:12:50
 * @Path m.benting.com.cn /src/shop/guess/Detail/index.js
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import Styles from '@styles';
import Top from './_Top';
import Rule from './_Rule';
import Winner from './_Winner';
import Record from './_Record';
import PayConfirm from './_PayConfirm';
import store from './store';

const Detail = () => (
  <Layout
    title="积分挖宝"
    bd={null}
    headerStyle={{
      color: Styles.color_theme,
      background: 'transparent'
    }}
  >
    <Top />
    <Rule />
    <Winner className="mt-d" />
    <Record className="mt-d" />
    <PayConfirm />
  </Layout>
);

export default injectV2(store)(Detail);
