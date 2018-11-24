/**
 * const prefixCls = 'style-145528';
 * const images = '/static/images/src/event/car/Index';
 * @Author: czy0729
 * @Date: 2018-11-06 15:08:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-10 16:18:17
 * @Path bt_mb_new /src/event/car/Index/index.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import Head from '@src/bbs/Article/_Head';
import Header from './_Header';
import Content from './_Content';
import Vote from './_Vote';
import List from './_List';
import FixedTextarea from './_FixedTextarea';
import FixedBtn from './_FixedBtn';
import store from './store';

const Car = (props, { $ }) => {
  const { title, _loaded } = $.getState('detail');

  if (!_loaded) {
    return null;
  }

  return (
    <Layout title={title || '帖子详情'} header={<Header />}>
      <Head />
      <Content />
      <Vote />
      <List className="mt-d" />
      <FixedTextarea />
      <FixedBtn />
    </Layout>
  );
};

Car.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Car));
