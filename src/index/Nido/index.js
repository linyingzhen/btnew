/**
 * const prefixCls = 'style-200074';
 * const images = '/static/images/src/index/Nido';
 * @Author: czy0729
 * @Date: 2018-06-24 17:59:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-22 18:42:35
 * @Path m.benting.com.cn /src/index/Nido/index.js
 */
import React from 'react';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import { Link, Icon } from '@components';
import BBS from './_BBS';
import Carousel from './_Carousel';
import Discovery from './_Discovery';
import Event from './_Event';
import Fish from './_Fish';
import Menu from './_Menu';
import Topic from './_Topic';
import store from './store';

const Nido = () => (
  <Layout
    title="灵动社区"
    titleThumb={
      <Icon
        className="mr-sm"
        type="lingdong"
        color
        style={{ width: '0.48rem', height: '0.48rem' }}
      />
    }
    hideBack
    ft={
      <Link className="t-30 l-42 t-b" href="/">
        返回官网
      </Link>
    }
  >
    <Carousel />
    <Menu />
    <Event className="mt-d" />
    <Topic className="mt-d" />
    <Fish className="mt-d" />
    <Discovery className="mt-d" />
    <BBS className="mt-d" />
  </Layout>
);

export default injectV2(store)(observer(Nido));
