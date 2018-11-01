/**
 * const prefixCls = 'style-148449';
 * const images = '/static/images/src/shop/Goods';
 * @Author: czy0729
 * @Date: 2018-09-30 10:53:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-30 18:08:45
 * @Path m.benting.com.cn /src/shop/Goods/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import { Flex } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import Header from '../Category/_Header';
import Carousel from './_Carousel';
import Spec from './_Spec';
import store from './store';

const prefixCls = 'style-148449';

const Goods = (props, { $ }) => {
  const { spec } = $.getState('_spec');
  const { title } = $.getState('detail');

  return (
    <Layout
      className={prefixCls}
      title="商城"
      theme="fullTheme"
      header={<Header />}
    >
      <div className="top">
        <p className="t-40 l-56 t-b">{title}</p>
        {spec && <p className="t-30 l-42 ls-o1 mt-12">{spec}</p>}
        <Carousel className="mt-40" />
        <Spec className="mt-16" />
        <Flex className="mt-64" onClick={Utils.u}>
          <Flex.Item className={`${prefixCls}__btn-item t-c`}>
            加入购物车
          </Flex.Item>
          <Flex.Item className={`${prefixCls}__btn-item t-c`}>
            立即购买
          </Flex.Item>
        </Flex>
      </div>

      <style jsx global>{`
        .style-148449 {
          padding-top: 1.08rem;
        }
        .${prefixCls}__btn-item {
          padding: 0.32rem 0;
          margin-left: 0 !important;
          color: ${Styles.color_void};
          background: ${Styles.color_main};
          border: 0.02rem solid ${Styles.color_main};
        }
        .${prefixCls}__btn-item:nth-of-type(2) {
          color: ${Styles.color_main};
          background: ${Styles.color_void};
        }
      `}</style>
      <style jsx>{`
        .style-148449 {
        }
        .top {
          padding: 0.48rem 0.72rem 1.28rem;
          background: ${Styles.color_theme};
        }
      `}</style>
    </Layout>
  );
};

Goods.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Goods));
