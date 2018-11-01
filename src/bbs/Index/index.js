/**
 * const prefixCls = 'style-150495';
 * const images = '/static/images/src/bbs/Index';
 * @Author: czy0729
 * @Date: 2018-07-10 09:47:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-04 12:00:49
 * @Path m.benting.com.cn /src/bbs/Index/index.js
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout, HeadMenu } from '@_';
import { bbsHeadMenuDS } from '@ds';
import Top from './_Top';
import Fish from './_Fish';
import Post from './_Post';
import store from './store';

const BBS = () => (
  <Layout title="社区" hide>
    <HeadMenu data={bbsHeadMenuDS} active="社区" />
    <Top />
    <Fish className="mt-d" />
    <Post className="mt-d" />
  </Layout>
);

export default injectV2(store)(BBS);
