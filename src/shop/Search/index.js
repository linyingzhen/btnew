/**
 * const prefixCls = 'style-658027';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-01 11:20:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-01 23:26:18
 * @Path bt_mb_new \src\shop\Search\index.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import Header from './_Header';
import Top from './_Top';
import List from './_List';
import SearchBar from './_SerachBar';
import store from './store';

const prefixCls = 'style-658027';

const Search = (props, { $ }) => (
  <Layout
    className={prefixCls}
    title={$.typeName ? `${$.typeName} - 商城` : '商城'}
    header={<Header />}
  >
    <SearchBar />
    <Top />
    <List />

    <style jsx global>{`
      .style-658027 {
        padding-top: 1.08rem;
      }
    `}</style>
  </Layout>
);

Search.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Search));
