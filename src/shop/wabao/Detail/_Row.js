/**
 * const prefixCls = 'style-110150';
 * const images = '/static/images/src/shop/wabao/Detail';
 * @Author: czy0729
 * @Date: 2018-09-27 19:08:46
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-09-27 19:08:46
 * @Path m.benting.com.cn /src/shop/wabao/Detail/_Row.js
 */
import React from 'react';
import { observer } from '@';
import { List, Flex } from '@components';
import { Avatar } from '@_';
import Utils from '@utils';

const _Row = props => {
  const { userId, niname, faceImg, vip, createTime, buypernum } = props;

  return (
    <List.Item thumb={<Avatar userId={userId} img={faceImg} vip={vip} />}>
      <Flex>
        <Flex.Item>
          <p className="t-30 l-44">{niname}</p>
          <p className="t-24 l-36 t-sub">
            {Utils.date('m-d H:i:s', createTime)}
          </p>
        </Flex.Item>
        <p className="t-24 l-32 t-sub">
          <span>参与</span>
          <span className="t-primary ml-xs mr-xs">{buypernum}</span>
          <span>人次</span>
        </p>
      </Flex>
    </List.Item>
  );
};

export default observer(_Row);
