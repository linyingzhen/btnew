/**
 * const prefixCls = 'style-121341';
 * const images = '/static/images/src/video/Index';
 * @Author: czy0729
 * @Date: 2018-07-18 18:23:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-17 14:24:17
 * @Path m.benting.com.cn /src/video/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout, HeadMenu } from '@_';
import { bbsHeadMenuDS } from '@ds';
import Top from './_Top';
import VideoList from './_Video';
import store from './store';

@injectV2(store)
@observer
export default class Video extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  render() {
    return (
      <Layout title="视频" hide>
        <HeadMenu data={bbsHeadMenuDS} active="视频" />
        <Top />
        <VideoList className="mt-d" />
      </Layout>
    );
  }
}
