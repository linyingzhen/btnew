/**
 * const prefixCls = 'style-172380';
 * const images = '/static/images/src/event/car/Detail';
 * @Author: czy0729
 * @Date: 2018-11-09 12:05:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-09 12:07:11
 * @Path bt_mb_new /src/event/car/Detail/index.js.git
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import Comment from './_Comment';
import Content from './_Content';
import FixedTextarea from './_FixedTextarea';
import Reward from './_Reward';
import RewardList from './_RewardList';
import store from './store';

const Detail = () => (
  <Layout title="发现">
    <Content />
    <RewardList className="mt-d" />
    <Comment className="mt-d" />
    <FixedTextarea />
    <Reward />
  </Layout>
);

export default injectV2(store)(Detail);
