/**
 * const prefixCls = 'style-567803';
 * const images = '/static/images/src/bbs/Article/_Competition';
 * @Author: czy0729
 * @Date: 2018-07-16 10:26:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-29 18:19:04
 * @Path m.benting.com.cn /src/bbs/Article/_Competition/_Award.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { List, Flex } from 'antd-mobile';
import { observer } from '@';
import { Empty, Icon } from '@components';
import { Header, Avatar } from '@_';
import Utils from '@utils';

const prefixCls = 'style-567803';

const _Award = (props, { $ }) => {
  const { className } = props;
  const { userId } = $.getState('userInfo');
  const { guessingData = {} } = $.getState('detail');
  const {
    competitionPlayers = [],
    competitionPump,
    competitionWinner
  } = guessingData;
  const competitionAward = $.getState('competitionAward');
  const { isMe } = $.getState('_competition');

  const playerMap = {};
  let jackPot = 0;
  competitionPlayers.forEach((item, index) => {
    playerMap[item.id] = {
      index: index + 1,
      name: item.name
    };
    if (item.id != competitionWinner) jackPot += item.amount;
  });
  jackPot = Math.ceil(jackPot * (1 - competitionPump));

  return (
    <div className={classNames(prefixCls, className)}>
      <Header
        title="中奖记录"
        desc={
          isMe
            ? `${competitionAward.pageinfo.recordtotal} 人次支持`
            : `${
              competitionAward.pageinfo.recordtotal
            } 人次瓜分掉 ${Utils.formatNumber(jackPot, 0)} ${
              $.competitionTypeLabel
            }`
        }
        extra={
          !!userId && (
            <Flex onClick={$.page.toggleCompetitionAward}>
              <span className="t-30 l-42 t-sub">{isMe ? '全部' : '我的'}</span>
              <Icon className="t-40 t-sub" type="right" />
            </Flex>
          )
        }
        isList
      />
      {competitionAward.list.length ? (
        <List>
          {competitionAward.list.map((item, index) => (
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
                <p className="t-24 t-r">
                  <span className="t-sub">返还</span>
                  <span className="t-sub ml-xs">
                    {Utils.formatNumber(item.amount, 0)}
                  </span>
                  <span className="t-sub ml-xs">+</span>
                  <span className="t-danger ml-xs">
                    {Utils.formatNumber(item.bonus - item.amount, 0)}
                  </span>
                  <span className="t-danger ml-xs">
                    {$.competitionTypeLabel}
                  </span>
                </p>
              </Flex>
            </List.Item>
          ))}
          {competitionAward._hasMore && (
            <List.Item onClick={$.fetch.competitionAward}>
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

_Award.contextTypes = {
  $: PropTypes.object
};

export default observer(_Award);
