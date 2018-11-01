/**
 * const prefixCls = 'style-296193';
 * const images = '/static/images/src/shop/Category';
 * @Author: czy0729
 * @Date: 2018-09-29 17:20:29
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-01 14:44:38
 * @Path m.benting.com.cn /src/shop/Category/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import Header from './_Header';
import Searchbox from '../_/Searchbox';
import Top from './_Top';
import List from './_List';
import store from './store';

const prefixCls = 'style-296193';

const Category = (props, { $ }) => (
  <Layout
    className={prefixCls}
    title={$.typeName ? `${$.typeName} - 商城` : '商城'}
    header={<Header />}
  >
    <Searchbox />
    <Top className="mt-md" />
    <List />

    <style jsx global>{`
      .style-296193 {
        padding-top: 1.08rem;
      }
    `}</style>
  </Layout>
);

Category.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Category));
