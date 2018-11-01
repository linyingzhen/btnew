/**
 * const prefixCls = 'style-103610';
 * const images = '/static/images/src/bbs/Article';
 * @Author: czy0729
 * @Date: 2018-07-11 16:49:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-10 18:19:57
 * @Path m.benting.com.cn /src/bbs/Article/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Lazy } from '@components';
import { Layout } from '@_';
import Const from '@const';
import BaiduCambrian from './_BaiduCambrian';
import BaiduPushImg from './_BaiduPushImg';
import Comment from './_Comment';
import Competition from './_Competition';
import Content from './_Content';
import Egg from './_Egg';
import FixedTextarea from './_FixedTextarea';
import Head from './_Head';
import Header from './_Header';
import Reward from './_Reward';
import RewardList from './_RewardList';
import Vote from './_Vote';
import store from './store';

const Article = (props, { $ }) => {
  const { title, _loaded } = $.getState('detail');

  return (
    <Layout title={title || '帖子详情'} header={<Header />}>
      <Head />
      <Content />
      {_loaded && (
        <Lazy onDidMount={$.fetch.lazy.reward}>
          <RewardList className="mt-d" />
        </Lazy>
      )}
      {_loaded && <Competition className="mt-d" />}
      {_loaded && (
        <Lazy onDidMount={$.fetch.lazy.comment}>
          <Comment className="mt-d" />
        </Lazy>
      )}

      {/* 不在页面内 */}
      {_loaded && ($.isVote ? <Vote /> : <FixedTextarea />)}
      <Reward />
      <Egg />
      {Const.__CLIENT__ && <BaiduPushImg />}
      {Const.__SERVER__ && <BaiduCambrian />}
    </Layout>
  );
};

Article.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Article));
