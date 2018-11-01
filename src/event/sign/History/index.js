/**
 * const prefixCls = 'style-204487';
 * const images = '/static/images/src/event/sign/History';
 * @Author: czy0729
 * @Date: 2018-10-17 23:58:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-20 00:25:28
 * @Path m.benting.com.cn /src/event/sign/History/index.js
 */
import React from 'react';
import { injectV2 } from '@';
import { Layout } from '@_';
import Styles from '@styles';
import Calendar from './_Calendar';
import Today from './_Today';
import store from './store';

const _History = () => (
  <Layout
    title="历史签到"
    headerStyle={{
      color: Styles.color_void,
      background: Styles.color_main
    }}
  >
    <div className="top">
      <Calendar />
    </div>
    <Today className="mt-d" />

    <style jsx>{`
      .style-204487 {
      }
      .top {
        position: relative;
        padding: 0.4rem ${Styles.wind} 0;
      }
      .top:before {
        content: '';
        position: absolute;
        z-index: -1;
        top: 0;
        right: 0;
        left: 0;
        padding-bottom: 4rem;
        background: ${Styles.color_main};
      }
    `}</style>
  </Layout>
);

export default injectV2(store)(_History);
