/**
 * const prefixCls = 'style-199610';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-01 17:09:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-01 23:14:26
 * @Path bt_mb_new \src\person\help\Nido\index.js.git
 */
import React from 'react';
import { Layout } from '@_';
import Styles from '@styles';
import Top from './_Top';
import Step from './_Step';
import Tip from './_Tip';

const Nido = () => (
  <Layout
    title="在线客服"
    headerStyle={{
      color: Styles.color_main,
      background: 'transparent'
    }}
  >
    <Top />
    <Step className="mt-d" />
    <Tip className="mt-d" />
  </Layout>
);

export default Nido;
