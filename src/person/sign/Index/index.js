/**
 * const prefixCls = 'style-178183';
 * const images = '/static/images/src/index/Sign';
 * @Author: cwz0525
 * @Date: 2018-07-02 10:00:49
 * @Last Modified by: cwz0525
 * @Last Modified time: 2018-08-31 09:34:36
 * @Path m.benting.com.cn /src/index/Sign/index.js
 */
import React from 'react';
import { observer, injectV2 } from '@';
import { Layout } from '@_';
import List from './_List';
import Main from './_Main';
import Header from './_Header';
import store from './store';

@injectV2(store)
@observer
export default class Sign extends React.Component {
  render() {
    return (
      <Layout title="每日签到" header={<Header />}>
        <Main />
        <List />
        <style jsx global>{`
          .style-000000 {
          }
          .t-title {
            color: #ccc !important;
            border: none !important;
          }
        `}</style>
      </Layout>
    );
  }
}
