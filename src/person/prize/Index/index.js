/**
 * const prefixCls = 'style-183231';
 * const images = '/static/images/src/person/prize/Index';
 * @Author: lyz0720
 * @Date: 2018-09-20 11:26:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 10:12:48
 * @Path bt_mb_new /src/person/prize/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { AffixTabs } from '@components';
import { Layout } from '@_';
import List from './_List';
import store from './store';
import { prizeTabs } from './ds';

const Prize = (props, { $ }) => {
  const { page } = $.getState('_affixTabs');
  const prizeList = $.getState('prizeList');
  const removePrizeList = $.getState('removePrizeList');

  return (
    <Layout title="优惠券">
      <AffixTabs
        tabs={prizeTabs}
        align="center"
        animated
        destroyInactiveTab={false}
        page={page}
        onTabClick={$.page.onTabClick}
      >
        <List
          className="mt-d"
          data={prizeList}
          onEndReached={$.fetch.prizeList}
        />
        <List
          className="mt-d"
          data={removePrizeList}
          onEndReached={$.fetch.removePrizeList}
        />
      </AffixTabs>
    </Layout>
  );
};

Prize.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Prize));
