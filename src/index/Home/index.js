/**
 * const prefixCls = 'style-106564';
 * const images = '/static/images/src/index/Home';
 * @Author: czy0729
 * @Date: 2018-06-20 11:16:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-12 14:46:17
 * @Path m.benting.com.cn /src/index/Home/index.js
 */
import React from 'react';
import { injectV2, observer } from '@';
import { Flex, Icon } from '@components';
import { Layout } from '@_';
import Utils from '@utils';
import Styles from '@styles';
import Car from './_Car';
import Carousel from './_Carousel';
import FamousPeople from './_FamousPeople';
import Footer from './_Footer';
import Header from './_Header';
import Information from './_Information';
import Menu from './_Menu';
import NewGoods from './_NewGoods';
import Notice from './_Notice';
import Video from './_Video';
import store from './store';

const Home = () => (
  <Layout title="本汀官网" header={<Header />} style={{ paddingBottom: 0 }}>
    <Carousel />
    <Menu />
    <Notice className="mt-d" />
    <Car className="mt-d" />
    <NewGoods className="mt-d" />
    <FamousPeople className="mt-d" />
    <Video className="mt-d" />
    <Information className="mt-d" />
    <Footer />
    <Flex
      justify="center"
      direction="column"
      onClick={() => Utils.router.push('/person/help/service')}
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

export default injectV2(store)(observer(Home));
