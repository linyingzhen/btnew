/**
 * const prefixCls = 'style-970776';
 * const images = '/static/images/src/shop/guess/Index';
 * @Author: czy0729
 * @Date: 2018-09-25 12:09:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-15 11:33:01
 * @Path m.benting.com.cn /src/shop/guess/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { AffixTabs, Button } from '@components';
import { Layout } from '@_';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import List from './_List';
import store from './store';
import { images, tabsDS } from './ds';

const prefixCls = 'style-970776';

const Guess = (props, { $ }) => {
  const { page } = $.getState('_affixTabs');
  const coinList = $.getState('coinList');
  const scoreList = $.getState('scoreList');

  return (
    <Layout
      className={prefixCls}
      title="欢乐猜鱼"
      bd={null}
      ft={
        <Button
          size="sm"
          ghost
          inline
          radius
          onClick={() =>
            Utils.checkLogin(() => {
              if (page === 0) {
                Utils.router.push('/person/event/guess');
              } else {
                Utils.router.push('/person/event/guess?type=score');
              }
            })
          }
        >
          我的猜鱼
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
        <AffixTabs
          tabs={tabsDS}
          align="center"
          animated
          destroyInactiveTab={false}
          page={page}
          onTabClick={$.page.onTabClick}
        >
          <List
            className="mt-d"
            data={coinList}
            onEndReached={$.fetch.coinList}
          />
          <List
            className="mt-d"
            data={scoreList}
            onEndReached={$.fetch.scoreList}
          />
        </AffixTabs>
      </div>

      <style jsx global>{`
        .style-970776 {
          min-height: 100vh !important;
          background: linear-gradient(
            90deg,
            rgba(34, 236, 164, 1) 0%,
            rgba(0, 219, 166, 1) 100%
          );
        }
        .${prefixCls} .am-tabs-tab-bar-wrap {
          border-radius: 0.16rem;
          overflow: hidden;
        }
      `}</style>
      <style jsx>{`
        .style-970776 {
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

Guess.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Guess));
