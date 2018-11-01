/**
 * const prefixCls = 'style-999485';
 * const images = '/static/images/src/bbs/topic/Index';
 * @Author: czy0729
 * @Date: 2018-08-03 10:17:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-03 14:43:56
 * @Path m.benting.com.cn /src/bbs/topic/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import Top from './_Top';
import TopicList from './_Topic';
import FixedTextarea from './_FixedTextarea';
import store from './store';

@injectV2(store)
@observer
export default class Detail extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  render() {
    return (
      <Layout title="话题详情">
        <Top />
        <TopicList className="mt-d" />
        <FixedTextarea />
      </Layout>
    );
  }
}
