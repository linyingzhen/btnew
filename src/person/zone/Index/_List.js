/**
 * const prefixCls = 'style-925860';
 * const images = '/static/images/src/person/zone/Index';
 * @Author: czy0729
 * @Date: 2018-07-30 09:29:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-12 11:13:32
 * @Path m.benting.com.cn /src/person/zone/Index/_List.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { ListView } from '@components';
import AffixTabs from '@components/AffixTabs/default';
import Utils from '@utils';
import Row from './_Row';
import { tabsDS } from './ds';

const _List = (props, { $ }) => {
  const { page } = $.getState('_affixTabs');
  const discovery = $.getState('discovery');
  const bbs = $.getState('bbs');
  const video = $.getState('video');

  let data;
  let onEndReached;
  switch (tabsDS[page].title) {
    case '帖子':
      data = bbs;
      onEndReached = $.fetch.bbs;
      break;

    case '视频':
      data = video;
      onEndReached = $.fetch.video;
      break;

    default:
      data = discovery;
      onEndReached = $.fetch.discovery;
      break;
  }

  const _tabsDS = Utils.deepCopy(tabsDS);
  _tabsDS.forEach((item, index) => {
    switch (item.title) {
      case '帖子':
        _tabsDS[index].title = (
          <p>
            <span className="t-30">{item.title}</span>
            {bbs.pageinfo.recordtotal != 0 && (
              <span className="t-20 ml-xs">{bbs.pageinfo.recordtotal}</span>
            )}
          </p>
        );
        break;

      case '视频':
        _tabsDS[index].title = (
          <p>
            <span className="t-30">{item.title}</span>
            {video.pageinfo.recordtotal != 0 && (
              <span className="t-20 ml-xs">{video.pageinfo.recordtotal}</span>
            )}
          </p>
        );
        break;

      default:
        _tabsDS[index].title = (
          <p>
            <span className="t-30">{item.title}</span>
            {discovery.pageinfo.recordtotal != 0 && (
              <span className="t-20 ml-xs">
                {discovery.pageinfo.recordtotal}
              </span>
            )}
          </p>
        );
        break;
    }
  });

  return (
    <AffixTabs tabs={_tabsDS} page={page} onTabClick={$.page.onTabClick}>
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
