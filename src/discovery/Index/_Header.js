/**
 * const prefixCls = 'style-553336';
 * const images = '/static/images/src/discovery/Index';
 * @Author: czy0729
 * @Date: 2018-08-23 12:37:28
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-08-23 12:37:28
 * @Path m.benting.com.cn /src/discovery/Index/_Header.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'antd-mobile';
import { observer } from '@';
import { Header, Tabs, Button } from '@components';
import Utils from '@utils';
import G from '@stores/g';
import { tabsDS } from './ds';

const _Header = (props, { $ }) => {
  const { count, isRead } = G.getState('discoverySpecial');
  const { page } = $.getState('_affixTabs');

  const _tabsDS = Utils.deepCopy(tabsDS);
  if (!isRead && count) {
    const index = _tabsDS.findIndex(item => item.title === '精选');
    _tabsDS[index] = {
      title: <Badge dot>精选</Badge>
    };
  }

  return (
    <Header show style={{ height: '0.9rem' }}>
      <Tabs
        tabs={_tabsDS}
        page={page}
        extra={
          <Button
            type="primary"
            size="xs"
            inline
            ghost
            onClick={() =>
              Utils.checkLogin(() => Utils.router.push('/discovery/post'))
            }
          >
            发布
          </Button>
        }
        onTabClick={$.page.onTabClick}
      >
        <div />
      </Tabs>
    </Header>
  );
};

_Header.contextTypes = {
  $: PropTypes.object
};

export default observer(_Header);
