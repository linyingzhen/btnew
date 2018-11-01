/**
 * const prefixCls = 'style-108766';
 * const images = '/static/images/src/discovery/Post';
 * @Author: czy0729
 * @Date: 2018-07-23 13:57:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 17:29:20
 * @Path m.benting.com.cn /src/discovery/Post/index.js
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import Const from '@const';
import Header from './_Header';
import Textarea from './_Textarea';
import Media from './_Media';
import store from './store';

const Post = () =>
  Const.__CLIENT__ && (
    <Layout title="发现" theme="fullTheme" header={<Header />}>
      <Textarea />
      <Media className="mt-24" />
    </Layout>
  );

export default injectV2(store)(Post);
