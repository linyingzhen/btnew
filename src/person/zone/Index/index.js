/**
 * const prefixCls = 'style-112849';
 * const images = '/static/images/src/person/zone/Index';
 * @Author: czy0729
 * @Date: 2018-07-27 10:17:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-31 11:44:43
 * @Path m.benting.com.cn /src/person/zone/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import Header from './_Header';
import UserInfo from './_UserInfo';
import List from './_List';
import store from './store';

@injectV2(store)
@observer
export default class Zone extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  render() {
    return (
      <Layout title="空间" header={<Header />}>
        <UserInfo />
        <List />
      </Layout>
    );
  }
}
