/**
 * const prefixCls = 'style-115712';
 * const images = '/static/images/src/video/Detail';
 * @Author: czy0729
 * @Date: 2018-07-19 16:56:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 17:43:41
 * @Path m.benting.com.cn /src/video/Detail/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2 } from '@';
import { Layout } from '@_';
import Comment from './_Comment';
import FixedTextarea from './_FixedTextarea';
import Random from './_Random';
import Reward from './_Reward';
import RewardList from './_RewardList';
import Video from './_Video';
import VideoDetail from './_Detail';
import store from './store';

const Detail = () => (
  <Layout title="视频">
    <Video />
    <VideoDetail />
    <Random className="mt-d" />
    <RewardList className="mt-d" />
    <Comment className="mt-d" />
    <FixedTextarea />
    <Reward />
  </Layout>
);

Detail.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(Detail);
