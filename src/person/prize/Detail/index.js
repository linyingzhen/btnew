/**
 * const prefixCls = 'style-101574';
 * const images = '/static/images/src/person/prize/Detail';
 * @Author: czy0729
 * @Date: 2018-10-25 11:15:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-07 11:09:40
 * @Path bt_mb_new /src/person/prize/Detail/index.js
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import Attention from './_Attention';
import Pack from './_Pack';
import Btn from './_Btn';
import store from './store';

const Detail = () => (
  <Layout title="优惠券详情">
    <Attention />
    <Pack className="mt-md" />
    <Btn />
  </Layout>
);

export default injectV2(store)(Detail);
