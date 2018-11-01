/**
 * const prefixCls = 'style-890137';
 * const images = '/static/images/src/bbs/Article/_Comment';
 * @Author: czy0729
 * @Date: 2018-07-17 10:17:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-17 10:17:34
 * @Path m.benting.com.cn /src/bbs/Article/_Comment/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { AffixTabs, ListView, Empty } from '@components';
import Row from './_Row';
import { tabsDS, tabsAllDS } from '../ds';

const prefixCls = 'style-890137';

const _Comment = (props, { $ }) => {
  const { className } = props;
  const { page } = $.getState('_affixTabs');
  const { userId } = $.getState('userInfo');
  // const floorUserId = $.getState('detail').userId; // 楼主Id
  const comment = $.getState('comment');

  return (
    <div className={classNames(prefixCls, className)}>
      <AffixTabs
        tabs={userId ? tabsAllDS : tabsDS}
        page={page}
        onTabClick={$.page.onTabClick}
      >
        <ListView
          data={comment}
          renderRow={item => (
            // isHost={floorUserId == item.parUserId}
            <Row {...item} />
          )}
          renderEmpty={<Empty>来抢沙发吧...</Empty>}
          onEndReached={$.fetch.comment}
        />
      </AffixTabs>
    </div>
  );
};

_Comment.contextTypes = {
  $: PropTypes.object
};

export default observer(_Comment);
