/**
 * const prefixCls = 'style-116505';
 * const images = '/static/images/src/discovery/fish/Category';
 * @Author: czy0729
 * @Date: 2018-08-07 17:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-08 12:03:04
 * @Path m.benting.com.cn /src/discovery/fish/Category/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import RootList from './_RootList';
import List from './_List';
import store from './store';

@injectV2(store)
@observer
export default class Category extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  render() {
    const { $ } = this.context;
    const isRoot = !$.params.params.id;

    return (
      <Layout title="渔获有礼">
        {isRoot ? <RootList /> : <List />}
      </Layout>
    );
  }
}
