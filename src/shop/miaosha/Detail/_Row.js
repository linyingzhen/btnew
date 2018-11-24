/**
 * const prefixCls = 'style-480231';
 * const images = '/static/images/src/shop/auction/Detail';
 * @Author: czy0729
 * @Date: 2018-09-11 17:05:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-14 18:16:58
 * @Path m.benting.com.cn /src/shop/auction/Detail/_Row.js
 */
import React from 'react';
import { observer } from '@';
import { List, Flex } from '@components';
import { Avatar } from '@_';
import Utils from '@utils';

const _Row = props => {
  const { userId, faceImg, niname, vip, createTime } = props;

  return (
    <List.Item thumb={<Avatar userId={userId} img={faceImg} vip={vip} />}>
      <Flex>
        <Flex.Item>
          <p className="t-30 l-44">{niname}</p>
          <p className="t-24 l-36 t-sub">
            {Utils.date('m-d H:i:s', createTime)}
          </p>
        </Flex.Item>
        <p className="t-30 l-44 t-danger">成功秒杀</p>
      </Flex>
    </List.Item>
  );
};

export default observer(_Row);
