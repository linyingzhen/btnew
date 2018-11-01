/**
 * const prefixCls = 'style-121896';
 * const images = '/static/images/src/person/message/Index';
 * @Author: czy0729
 * @Date: 2018-10-05 20:45:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-06 00:05:09
 * @Path m.benting.com.cn /src/person/message/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'antd-mobile';
import { injectV2, observer } from '@';
import { AffixTabs } from '@components';
import { Layout } from '@_';
import Utils from '@utils';
import Styles from '@styles';
import List from './_List';
import Chat from './_Chat';
import store from './store';
import { tabsDS } from './ds';

const prefixCls = 'style-121896';

const Message = (props, { $ }) => {
  const { page } = $.getState('_affixTabs');
  const messageCount = $.getState('messageCount');
  const reply = $.getState('reply');
  const like = $.getState('like');
  const comment = $.getState('comment');
  const system = $.getState('system');

  // 有记录就标记红点
  const _tabsDS = Utils.deepCopy(tabsDS);
  if (messageCount._loaded) {
    _tabsDS.forEach((item, index) => {
      if (messageCount[item.numKey] != 0) {
        _tabsDS[index].title = (
          <p style={{ position: 'relative' }}>
            <span className="t-30">{item.title}</span>
            <Badge
              text={messageCount[item.numKey]}
              style={{
                ...Styles._badgeFill,
                position: 'absolute',
                top: '-0.32rem',
                transform: 'translateX(-0.04rem)'
              }}
            />
          </p>
        );
      }
    });
  }

  return (
    <Layout className={prefixCls} title="我的消息">
      <AffixTabs
        tabs={_tabsDS}
        page={page}
        animated
        onTabClick={$.page.onTabClick}
      >
        <List data={reply} onEndReached={$.fetch.reply} />
        <List data={like} onEndReached={$.fetch.like} />
        <Chat />
        <List data={comment} onEndReached={$.fetch.comment} />
        <List data={system} onEndReached={$.fetch.system} />
      </AffixTabs>
    </Layout>
  );
};

Message.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Message));
