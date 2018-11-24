/**
 * const prefixCls = 'style-200074';
 * const images = '/static/images/src/index/Nido';
 * @Author: czy0729
 * @Date: 2018-06-24 17:59:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-12 17:09:25
 * @Path m.benting.com.cn /src/index/Nido/index.js
 */
import React from 'react';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import { Flex, Link, Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import BBS from './_BBS';
import Carousel from './_Carousel';
import Discovery from './_Discovery';
import Event from './_Event';
import Fish from './_Fish';
import Menu from './_Menu';
import Prize from './_Prize';
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
      <Link className="t-c" href="/person/help/nido">
        <Icon className="t-40" type="ww" />
        <p className="t-20 l-34 t-c">客服</p>
      </Link>
    }
  >
    <Carousel />
    <Menu />
    <Event className="mt-d" />
    <Topic className="mt-d" />
    <Fish className="mt-d" />
    <Prize className="mt-d" />
    <Discovery className="mt-d" />
    <BBS className="mt-d" />
    <Flex
      justify="center"
      direction="column"
      onClick={() => Utils.router.push('/person/help/nido')}
      style={{
        position: 'fixed',
        right: Styles.wind,
        bottom: '1.2rem',
        width: '0.96rem',
        height: '0.96rem',
        background: 'rgba(0, 0, 0, 0.56)',
        borderRadius: '50%'
      }}
    >
      <Icon className="t-40 t-void" type="ww" />
      <p className="t-20 l-34 t-void t-c">客服</p>
    </Flex>
  </Layout>
);

export default injectV2(store)(observer(Nido));
