/**
 * const prefixCls = 'style-125976';
 * const images = '/static/images/src/person/feedback/Index';
 * @Author: czy0729
 * @Date: 2018-09-10 10:22:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-10 16:18:15
 * @Path m.benting.com.cn /src/person/feedback/Index/index.js
 */
import React from 'react';
import { injectV2 } from '@';
import { Icon } from '@components';
import { Layout } from '@_';
import Utils from '@utils';
import Styles from '@styles';
import List from './_List';
import store from './store';

const prefixCls = 'style-125976';

const Feedback = () => (
  <Layout title="我的反馈">
    <List className="mt-d" />
    <Icon
      className={`${prefixCls}__icon-plus t-56 t-void tool-animate-scale`}
      type="plus"
      onClick={() => Utils.router.push('/person/feedback/post')}
    />

    <style jsx global>{`
      .style-125976 {
      }
      .${prefixCls}__icon-plus {
        position: fixed;
        right: ${Styles.wind};
        bottom: ${Styles.wind};
        width: 1.16rem;
        height: 1.16rem;
        line-height: 1.16rem !important;
        background: ${Styles.color_primary};
        border-radius: 50%;
        box-shadow: 0 0.08rem 0.16rem -0.04rem rgba(0, 0, 0, 0.2),
          0 0.04rem 0.4rem 0 rgba(0, 0, 0, 0.12),
          0 0.16rem 0.2rem 0 rgba(0, 0, 0, 0.14);
      }
    `}</style>
  </Layout>
);

export default injectV2(store)(Feedback);
