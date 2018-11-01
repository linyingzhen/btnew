/**
 * const prefixCls = 'style-797345';
 * const images = '/static/images/src/person/help/Index';
 * @Author: Jun
 * @Date: 2018-07-27 16:55:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 14:40:06
 * @Path m.benting.com.cn /src/person/help/Index/index.js
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import Top from './_Top';
import Questions from './_Questions';
import Advise from './_Advise';
import Category from './_Category';
import store from './store';

const Help = () => (
  <Layout title="帮助中心">
    <Top />
    <Questions className="mt-d" />
    <Advise className="mt-d" />
    <Category className="mt-d" />
  </Layout>
);

export default injectV2(store)(Help);
