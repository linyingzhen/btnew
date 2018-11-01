/**
 * const prefixCls = 'style-193900';
 * const images = '/static/images/src/discovery/fish/Index';
 * @Author: czy0729
 * @Date: 2018-08-08 17:31:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-12 15:28:50
 * @Path m.benting.com.cn /src/discovery/fish/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import Header from './_Header';
import List from './_List';
import Rule from './_Rule';
import FixedTextarea from './_FixedTextarea';
import store from './store';
import { goodsDS } from '../Post/ds';

@injectV2(store)
@observer
export default class Fish extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  render() {
    const { $ } = this.context;
    const { id, gid } = $.params.params;

    let parItem;
    let subItem;
    if (id) {
      parItem = goodsDS.find(item => item.value === id);
    }
    if (gid && parItem) {
      subItem = parItem.children.find(item => item.value === gid);
    }

    let title = '渔获有礼';
    if (subItem) {
      title = `${subItem.label} - 渔获有礼`;
    } else if (parItem) {
      title = `${parItem.label} - 渔获有礼`;
    }

    return (
      <Layout title={title} header={<Header />}>
        <List />
        <Rule />
        <FixedTextarea />
      </Layout>
    );
  }
}
