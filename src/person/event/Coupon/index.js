/**
 * const prefixCls = 'style-157057';
 * const images = '/static/images/src/person/event/Coupon';
 * @Author: lyz0720
 * @Date: 2018-09-25 15:32:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 15:36:05
 * @Path bt_mb_new /src/person/event/Coupon/index.js
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

const prefixCls = 'style-157057';

const Coupon = (props, { $ }) => {
  const { page } = $.getState('_affixTabs');
  const lotteryList = $.getState('lotteryList');
  const viplotteryList = $.getState('viplotteryList');

  return (
    <Layout
      className={prefixCls}
      title="社区福利"
      bd={null}
      ft={
        <Button
          type="danger"
          size="sm"
          ghost
          inline
          radius
          onClick={() =>
            Utils.checkLogin(() => Utils.router.push('/person/prize'))
          }
        >
          我的优惠券
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
            data={lotteryList}
            onEndReached={$.fetch.lotteryList}
          />
          <List
            className="mt-d"
            data={viplotteryList}
            onEndReached={$.fetch.viplotteryList}
          />
        </AffixTabs>
      </div>

      <style jsx global>{`
        .style-157057 {
          min-height: 100vh !important;
          background: linear-gradient(
            90deg,
            rgba(255, 198, 0, 1) 0%,
            rgba(253, 110, 106, 1) 100%
          );
        }
      `}</style>
      <style jsx>{`
        .style-157057 {
        }
        .wrap-title {
          padding: 0.4rem 0 0.64rem;
          background-repeat: no-repeat;
          background-image: url(${Const.__IMAGES__}/bg-block.png);
        }
        .img-title {
          width: 2.9rem;
          height: 0.58rem;
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

Coupon.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Coupon));
