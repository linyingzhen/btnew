/**
 * const prefixCls = 'style-907703';
 * const images = '/static/images';
 * @Author: cwz0525
 * @Date: 2018-08-28 09:26:11
 * @Last Modified by: cwz0525
 * @Last Modified time: 2018-08-28 09:32:14
 * @Path newProject \src\person\share\record\store.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import store from './store';

@injectV2(store)
@observer
export default class Record extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };
  render() {
    return <Layout title="邀请记录">我的邀请记录</Layout>;
  }
}
