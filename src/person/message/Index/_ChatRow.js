/**
 * const prefixCls = 'style-123274';
 * const images = '/static/images/src/person/message/Index';
 * @Author: czy0729
 * @Date: 2018-10-05 23:00:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-21 18:50:26
 * @Path m.benting.com.cn /src/person/message/Index/_ChatRow.js
 */
import React from 'react';
import { Badge } from 'antd-mobile';
import { observer } from '@';
import { List, Flex } from '@components';
import { Avatar } from '@_';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';

const _Row = props => {
  const {
    toUserId,
    faceImg,
    niname,
    message,
    newNum,
    createTime
  } = props;

  let _message = {};
  let time;
  try {
    _message = JSON.parse(message);
    /* eslint-disable-next-line */
  } catch (ex) {}

  if (
    Utils.date('m-d', createTime) ===
    Utils.date('m-d', Utils.getTimestamp() / 1000)
  ) {
    time = Utils.date('H:i', createTime);
  } else {
    time = Utils.date('m-d', createTime);
  }

  return (
    <List.Item
      thumb={<Avatar userId={toUserId} img={faceImg || Const.__IMG_DEFAULT__} />}
      href={`/chat?id=${toUserId}`}
      as={`/chat/${toUserId}`}
    >
      <Flex align="start">
        <Flex.Item>
          <p className="t-30 l-44 t-main ls-o1">{niname}</p>
          <p className="t-24 l-36 t-sub t-c1 mt-8">
            {_message.id ? '[图片]' : _message.value}
          </p>
        </Flex.Item>
        <div>
          <p className="t-24 l-36 t-sub mt-8">{time}</p>
          {newNum > 0 && (
            <Badge
              className="pull-right mt-8"
              text={newNum}
              style={Styles._badgeFill}
            />
          )}
        </div>
      </Flex>
    </List.Item>
  );
};

export default observer(_Row);
