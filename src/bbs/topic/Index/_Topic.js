/**
 * const prefixCls = 'style-925746';
 * const images = '/static/images/src/bbs/topic/Index';
 * @Author: czy0729
 * @Date: 2018-08-03 10:16:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-03 12:14:19
 * @Path m.benting.com.cn /src/bbs/topic/Index/_Topic.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { AffixTabs, ListView } from '@components';
import { TopicRow } from '@_';
import { tabsDS } from './ds';

const prefixCls = 'style-925746';

const _Topic = (props, { $ }) => {
  const { className } = props;
  const { page } = $.getState('_affixTabs');
  const data = $.getState('topic');

  return (
    <div className={classNames(prefixCls, className)}>
      <AffixTabs tabs={tabsDS} page={page} onTabClick={$.page.onTabClick}>
        <ListView
          data={data}
          renderRow={item => (
            <TopicRow
              threadId={item.threadId}
              title={item.title}
              content={item.content}
              contentImg={item.contentImg}
              userId={item.userId}
              faceImg={item.faceImg}
              niname={item.niname}
              likeAdd={item.likeAdd}
              replyNum={item.replyNum}
            />
          )}
          onEndReached={$.fetch.topic}
        />
      </AffixTabs>
    </div>
  );
};

_Topic.contextTypes = {
  $: PropTypes.object
};

export default observer(_Topic);
