/**
 * const prefixCls = 'style-157883';
 * const images = '/static/images/src/bbs/Article/_Competition';
 * @Author: czy0729
 * @Date: 2018-07-15 15:24:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-29 18:08:28
 * @Path m.benting.com.cn /src/bbs/Article/_Competition/_Record.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { List, Flex, Badge } from 'antd-mobile';
import { observer } from '@';
import { Empty, Icon } from '@components';
import { Header, Avatar } from '@_';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-157883';

const _Record = (props, { $ }) => {
  const { className } = props;
  const { userId } = $.getState('userInfo');
  const { guessingData = {} } = $.getState('detail');
  const { competitionPlayers = [] } = guessingData;
  const competitionRecord = $.getState('competitionRecord');
  const { isMe } = $.getState('_competition');

  const playerMap = {};
  let sumAmount = 0;
  competitionPlayers.forEach((item, index) => {
    playerMap[item.id] = {
      index: index + 1,
      name: item.name
    };
    sumAmount += item.amount;
  });

  return (
    <div className={classNames(prefixCls, className)}>
      <Header
        title="支持记录"
        desc={
          isMe
            ? `${competitionRecord.pageinfo.recordtotal} 人次支持 `
            : `${
              competitionRecord.pageinfo.recordtotal
            } 人次支持，共 ${Utils.formatNumber(sumAmount, 0)} ${
              $.competitionTypeLabel
            }`
        }
        extra={
          !!userId && (
            <Flex onClick={$.page.toggleCompetitionRecord}>
              <span className="t-30 l-42 t-sub">{isMe ? '全部' : '我的'}</span>
              <Icon className="t-40 t-sub" type="right" />
            </Flex>
          )
        }
        isList
      />
      {competitionRecord.list.length ? (
        <List>
          {competitionRecord.list.map((item, index) => (
            <List.Item
              /* eslint-disable-next-line */
              key={index}
              wrap
              thumb={<Avatar userId={item.user_id} img={item.avatar} />}
            >
              <Flex>
                <Flex.Item>
                  <p className="t-30 l-44">{item.name}</p>
                  <p className="t-24 l-36 t-sub">
                    {Utils.date('m-d H:i:s', item.created_at)}
                  </p>
                </Flex.Item>
                <div>
                  <Flex justify="end">
                    <Badge
                      text={playerMap[item.player_id].index}
                      style={{
                        backgroundColor: Styles.color_primary,
                        borderRadius: 2
                      }}
                    />
                    <span className="t-30 l-44 ml-sm">
                      {playerMap[item.player_id].name}
                    </span>
                  </Flex>
                  <p className="t-24 l-36 t-primary t-r mt-8">
                    <span>+{Utils.formatNumber(item.amount, 0)}</span>
                    <span className="ml-xs">{$.competitionTypeLabel}</span>
                  </p>
                </div>
              </Flex>
            </List.Item>
          ))}
          {competitionRecord._hasMore && (
            <List.Item onClick={$.fetch.competitionRecord}>
              <p className="t-30 l-44 t-sub t-c">点击加载更多</p>
            </List.Item>
          )}
        </List>
      ) : (
        <Empty>没有记录</Empty>
      )}
    </div>
  );
};

_Record.contextTypes = {
  $: PropTypes.object
};

export default observer(_Record);
