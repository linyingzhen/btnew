/**
 * const prefixCls = 'style-696755';
 * const images = '/static/images/src/person/publish/Index';
 * @Author: czy0729
 * @Date: 2018-07-31 18:36:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-13 18:05:13
 * @Path m.benting.com.cn /src/person/publish/Index/_List.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { ListView } from '@components';
import AffixTabs from '@components/AffixTabs/default';
import Row from './_Row';
import { tabsDS } from './ds';

const _List = (props, { $ }) => {
  const { page } = $.getState('_affixTabs');

  let data;
  let onEndReached;
  switch (tabsDS[page].title) {
    case '帖子':
      data = $.getState('bbs');
      onEndReached = $.fetch.bbs;
      break;

    case '视频':
      data = $.getState('video');
      onEndReached = $.fetch.video;
      break;

    default:
      data = $.getState('discovery');
      onEndReached = $.fetch.discovery;
      break;
  }

  if (!data.list || !data.list.length) {
    return null;
  }

  return (
    <AffixTabs tabs={tabsDS} page={page} onTabClick={$.page.onTabClick}>
      <ListView
        className="tool-list-split"
        data={data}
        renderRow={item => <Row {...item} />}
        onEndReached={onEndReached}
      />
    </AffixTabs>
  );
};

_List.contextTypes = {
  $: PropTypes.object
};

export default observer(_List);
