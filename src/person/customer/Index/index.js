/**
 * const prefixCls = 'style-223361';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-10-22 18:18:31
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-10-22 18:24:37
 * @Path bt_mb_new \src\person\customer\Index\index.js.git
 */

import React from 'react';
import PropTypes from 'prop-types';
import { observer, injectV2 } from '@';
import { Layout } from '@_';
import { Icon } from '@components';
import Card from './_Card';
import Utils from '@utils';
import Styles from '@styles';
import store from './store';

const prefixCls = 'style-223361';

const Customer = () => (
  <Layout title="我的售后卡" bd={null} theme="fullTheme">
    <h1 className="t-40 ml-32">我的售后卡</h1>
    <p className="t-30 p-w t-sub">
      售后卡可以免费配节，使用需找到原购买店铺客服提供售后工单号。
    </p>
    <Card />
    <Icon
      className={`${prefixCls}__icon-plus t-56 t-void tool-animate-scale`}
      type="plus"
      onClick={() => Utils.router.push('/service')}
    />
    <style jsx global>{`
      .style-223361 {
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

Customer.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Customer));
