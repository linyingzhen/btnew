/**
 * const prefixCls = 'style-202458';
 * const images = '/static/images/src/shop/jianlou/Index';
 * @Author: czy0729
 * @Date: 2018-09-23 21:41:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-23 21:53:04
 * @Path m.benting.com.cn /src/shop/jianlou/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Button } from '@components';
import { Layout } from '@_';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import List from './_List';
import store from './store';
import { images } from './ds';

const prefixCls = 'style-202458';

const Jianlou = (props, { $ }) => {
  const list = $.getState('list');

  return (
    <Layout
      className={prefixCls}
      title="金币捡漏"
      bd={null}
      ft={
        <Button
          type="danger"
          size="sm"
          ghost
          inline
          radius
          onClick={() =>
            Utils.checkLogin(() => Utils.router.push('/person/event/jianlou'))
          }
        >
          我的捡漏
        </Button>
      }
      headerStyle={{
        color: Styles.color_theme,
        background: 'transparent'
      }}
    >
      <div className="wrap-title t-c">
        <img className="img-title" src={`${images}/title.png`} alt="" />
      </div>
      <div className="wrap-list">
        <List className="mt-d" data={list} onEndReached={$.fetch.list} />
      </div>

      <style jsx global>{`
        .style-202458 {
          min-height: 100vh !important;
          background: linear-gradient(
            90deg,
            rgba(242, 153, 56, 1) 0%,
            rgba(238, 117, 47, 1) 100%
          );
        }
      `}</style>
      <style jsx>{`
        .style-202458 {
        }
        .wrap-title {
          padding: 0.4rem 0 0.64rem;
          background-repeat: no-repeat;
          background-image: url(${Const.__IMAGES__}/bg-block.png);
        }
        .img-title {
          width: 4.22rem;
          height: 1.18rem;
        }
        .wrap-list {
          padding-bottom: ${Styles.bottom};
          margin: 0 ${Styles.wind};
          background: ${Styles.color_theme};
          border-radius: 0.16rem;
          box-shadow: 0 0.12rem 0.16rem 0 rgba(121, 19, 19, 0.5);
          overflow: hidden;
        }
      `}</style>
    </Layout>
  );
};

Jianlou.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Jianlou));
