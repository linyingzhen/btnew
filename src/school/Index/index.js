/**
 * const prefixCls = 'style-164627';
 * const images = '/static/images/src/school/Index';
 * @Author: czy0729
 * @Date: 2018-09-05 14:18:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-07 16:53:15
 * @Path m.benting.com.cn /src/school/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Lazy } from '@components';
import { Layout } from '@_';
import Best from './_Best';
import BestArticle from './_BestArticle';
import Carousel from './_Carousel';
import Combat from './_Combat';
import MV from './_MV';
import Movie from './_Movie';
import Product from './_Product';
import RealShow from './_RealShow';
import Tech from './_Tech';
import Nav from '../_/Nav';
import store from './store';
import { menuDS } from './ds';

const School = (props, { $ }) => (
  <Layout title="本汀垂钓学院">
    <Nav data={menuDS} />
    <Carousel />
    <Best className="mt-d" />
    <BestArticle />
    <Lazy height="10rem" onDidMount={$.fetch.lazy.tech}>
      <Tech className="mt-d" />
    </Lazy>
    <Lazy height="7rem" onDidMount={$.fetch.lazy.product}>
      <Product className="mt-d" />
    </Lazy>
    <Lazy height="7rem" onDidMount={$.fetch.lazy.combat}>
      <Combat className="mt-d" />
    </Lazy>
    <Lazy height="7rem" onDidMount={$.fetch.lazy.realShow}>
      <RealShow className="mt-d" />
    </Lazy>
    <Lazy height="7rem" onDidMount={$.fetch.lazy.mv}>
      <MV className="mt-d" />
    </Lazy>
    <Lazy height="7rem" onDidMount={$.fetch.lazy.movie}>
      <Movie className="mt-d" />
    </Lazy>
  </Layout>
);

School.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(School));
