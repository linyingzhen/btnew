/**
 * const prefixCls = 'style-112648';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-10-31 13:51:42
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-10-31 14:32:57
 * @Path bt_mb_new \src\person\favorites\Index\_List.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { AffixTabs, ListView } from '@components';
import Row from './_Row';
import { orderTabs } from './ds';

const _List = (props, { $ }) => {
  const { page } = $.getState('_affixTabs');

  let data;
  let onEndReached;
  switch (orderTabs[page].title) {
    case '帖子':
      data = $.getState('favorites');
      onEndReached = $.fetch.favorite;
      break;

    case '视频':
      data = $.getState('videos');
      onEndReached = $.fetch.video;
      break;

    default:
      break;
  }

  return (
    <AffixTabs tabs={orderTabs} page={page} onTabClick={$.page.onTabClick}>
      <ListView
        className="tool-list-split"
        data={data}
        renderRow={item => <Row {...item} />}
        renderEmpty
        onEndReached={onEndReached}
      />
    </AffixTabs>
  );
};

_List.contextTypes = {
  $: PropTypes.object
};

export default observer(_List);
