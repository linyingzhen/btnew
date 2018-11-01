/**
 * const prefixCls = 'style-395873';
 * const images = '/static/images/src/shop/jianlou/Detail';
 * @Author: czy0729
 * @Date: 2018-09-23 22:25:12
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-09-23 22:25:12
 * @Path m.benting.com.cn /src/shop/jianlou/Detail/_Row.js
 */
import React from 'react';
import { observer } from '@';
import { List, Flex } from '@components';
import { Avatar } from '@_';
import Utils from '@utils';

const _Row = props => {
  const { userId, faceImg, niname, createTime } = props;

  return (
    <List.Item thumb={<Avatar userId={userId} img={faceImg} />}>
      <Flex>
        <Flex.Item>
          <p className="t-30 l-44">{niname}</p>
          <p className="t-24 l-36 t-sub">
            {Utils.date('m-d H:i:s', createTime)}
          </p>
        </Flex.Item>
        <p className="t-30 l-44 t-danger">成功捡漏</p>
      </Flex>
    </List.Item>
  );
};

export default observer(_Row);
