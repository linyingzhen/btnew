/**
 * const prefixCls = 'style-164964';
 * const images = '/static/images/src/person/goods/Index';
 * @Author: lyz0720
 * @Date: 2018-10-23 17:35:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-13 17:48:14
 * @Path bt_mb_new /src/person/goods/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { ListView } from '@components';
import { Layout } from '@_';
import Styles from '@styles';
import Item from './_Item';
import store from './store';

const prefixCls = 'style-164964';

const Goods = (props, { $ }) => {
  const myLotteryList = $.getState('myLotteryList');

  return (
    <Layout title="我的礼单" className={prefixCls}>
      <div className="list mt-md">
        <ListView
          data={myLotteryList}
          renderRow={data => <Item {...data} />}
          onEndReached={$.fetch.myLotteryList}
        />
      </div>

      <style jsx global>{`
        .style-164964 {
        }
        .${prefixCls} .am-list-body {
          background: ${Styles.color_bg} !important;
        }
      `}</style>
      <style jsx>{`
        .styles-164964 {
        }
        .list {
          margin: 0 ${Styles.wind};
        }
      `}</style>
    </Layout>
  );
};

Goods.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store, { login: true })(observer(Goods));
