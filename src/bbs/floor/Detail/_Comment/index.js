/**
 * const prefixCls = 'style-114762';
 * const images = '/static/images/src/bbs/floor/Detail/_Comment';
 * @Author: czy0729
 * @Date: 2018-09-04 17:23:22
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-09-04 17:23:22
 * @Path m.benting.com.cn /src/bbs/floor/Detail/_Comment/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { AffixTabs, ListView, Empty } from '@components';
import Row from './_Row';
import { tabsDS, tabsAllDS } from '../ds';

const prefixCls = 'style-114762';

const _Comment = (props, { $ }) => {
  const { className } = props;
  const { page } = $.getState('_affixTabs');
  const { userId } = $.getState('userInfo');
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
