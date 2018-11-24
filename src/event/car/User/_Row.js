/**
 * const prefixCls = 'style-358561';
 * const images = '/static/images/src/event/car/User';
 * @Author: czy0729
 * @Date: 2018-11-09 15:56:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-21 11:28:28
 * @Path bt_mb_new /src/event/car/User/_Row.js.git
 */
import React from 'react';
import { observer } from '@';
import { List, Flex, Link } from '@components';
import Utils from '@utils';

const _Row = ({ tid, uid, nickname, created_at: createdAt }) => (
  <List.Item>
    <Flex>
      <Flex.Item
        className="t-28 l-40"
        href={`/person/zone?id=${uid}`}
        as={`/person/zone/${uid}}`}
      >
        {nickname}
      </Flex.Item>
      <Flex.Item className="t-24 l-40 t-c t-sub">
        {Utils.date('Y-m-d', createdAt)}
      </Flex.Item>
      <Flex.Item className="t-r">
        <Link
          className="t-28 l-40 t-sub ml-sm"
          href={`/event/car/user_status?id=${tid}&uid=${uid}`}
          as={`/event/car/user_status/${tid}/${uid}`}
        >
          详情
        </Link>
      </Flex.Item>
    </Flex>
  </List.Item>
);

export default observer(_Row);
