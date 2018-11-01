/**
 * const prefixCls = 'style-100141';
 * const images = '/static/images/src/shop/auction/Detail';
 * @Author: czy0729
 * @Date: 2018-09-11 12:21:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-12 16:13:50
 * @Path m.benting.com.cn /src/shop/auction/Detail/index.js
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import Carousel from './_Carousel';
import Info from './_Info';
import Rule from './_Rule';
import Winner from './_Winner';
import Record from './_Record';
import Btn from './_Btn';
import PayConfirm from './_PayConfirm';
import store from './store';

const Detail = () => (
  <Layout title="竞拍详情">
    <Carousel />
    <Info />
    <Rule className="mt-d" />
    <Winner className="mt-d" />
    <Record className="mt-d" />
    <Btn />
    <PayConfirm />
  </Layout>
);

export default injectV2(store)(Detail);
