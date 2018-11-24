/**
 * const prefixCls = 'style-193549';
 * const images = '/static/images/src/video/Post';
 * @Author: czy0729
 * @Date: 2018-07-26 09:47:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-05 09:31:28
 * @Path m.benting.com.cn /src/video/Post/index.js
 */
import React from 'react';
import { injectV2, form, observer } from '@';
import { Layout } from '@_';
import Const from '@const';
import Header from './_Header';
import Upload from './_Upload';
import Form from './_Form';
import Tags from './_Tags';
import store from './store';

const Post = props => {
  if (!Const.__CLIENT__) {
    return null;
  }

  const { form, onSubmit } = props;

  return (
    <Layout
      title="发布视频"
      header={<Header form={form} onSubmit={onSubmit} />}
    >
      <Upload />
      <Form className="mt-d" form={form} />
      <Tags className="mt-d" />
    </Layout>
  );
};

export default injectV2(store)(form(observer(Post)));
