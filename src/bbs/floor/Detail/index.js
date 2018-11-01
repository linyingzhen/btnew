/**
 * const prefixCls = 'style-151221';
 * const images = '/static/images/src/bbs/floor/Detail';
 * @Author: czy0729
 * @Date: 2018-09-04 17:31:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-04 18:43:56
 * @Path m.benting.com.cn /src/bbs/floor/Detail/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Lazy } from '@components';
import { Layout } from '@_';
import Comment from './_Comment';
import Content from './_Content';
import Winner from './_Winner';
import FixedTextarea from './_FixedTextarea';
import Head from './_Head';
import Header from './_Header';
import store from './store';

const Detail = (props, { $ }) => {
  const { title, _loaded } = $.getState('detail');

  return (
    <Layout title={title || '帖子详情'} header={<Header />}>
      <Head />
      <Content />
      <Winner className="mt-d" />
      {_loaded && (
        <Lazy onDidMount={$.fetch.lazy.comment}>
          <Comment className="mt-d" />
        </Lazy>
      )}
      <FixedTextarea />
    </Layout>
  );
};

Detail.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Detail));
