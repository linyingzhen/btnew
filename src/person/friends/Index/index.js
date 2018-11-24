/**
 * const prefixCls = 'style-138448';
 * const images = '/static/images/src/person/friends/Index';
 * @Author: czy0729
 * @Date: 2018-10-23 15:31:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-13 17:49:33
 * @Path bt_mb_new /src/person/friends/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import { ListView, Icon } from '@components';
import AffixTabs from '@components/AffixTabs/default';
import Item from './_Item';
import store from './store';
import Utils from '@utils';
import { tabs } from './ds';

const Index = (props, { $ }) => {
  const { page } = $.getState('_affixTabs');
  const { title } = tabs[page];

  let data;
  let onEndReached;
  if (title === '关注') {
    data = $.getState('follows');
    onEndReached = $.fetch.follows;
  } else {
    data = $.getState('fans');
    onEndReached = $.fetch.fans;
  }

  return (
    <Layout
      title="我的好友"
      ft={
        <Icon
          className="t-34"
          type="search"
          onClick={() =>
            Utils.checkLogin(() => Utils.router.push('/person/friends/search'))
          }
        />
      }
    >
      <AffixTabs tabs={tabs} page={page} onTabClick={$.page.onTabClick}>
        <ListView
          data={data}
          renderRow={item => <Item title={title} {...item} />}
          onEndReached={onEndReached}
        />
      </AffixTabs>
    </Layout>
  );
};

Index.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store, { login: true })(observer(Index));
