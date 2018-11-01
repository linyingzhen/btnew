/**
 * const prefixCls = 'style-287171';
 * const images = '/static/images/src/discovery/Detail';
 * @Author: czy0729
 * @Date: 2018-07-24 15:54:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-21 14:51:37
 * @Path m.benting.com.cn /src/discovery/Detail/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import Comment from './_Comment';
import Content from './_Content';
import FixedTextarea from './_FixedTextarea';
import Reward from './_Reward';
import RewardList from './_RewardList';
import store from './store';

@injectV2(store)
@observer
export default class Detail extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  render() {
    return (
      <Layout title="发现">
        <Content />
        <RewardList className="mt-d" />
        <Comment className="mt-d" />
        <FixedTextarea />
        <Reward />
      </Layout>
    );
  }
}
