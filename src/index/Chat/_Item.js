/**
 * const prefixCls = 'style-501567';
 * const images = '/static/images/src/index/Chat';
 * @Author: czy0729
 * @Date: 2018-10-21 17:42:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-21 19:54:13
 * @Path bt_mb_new /src/index/Chat/_Item.js
 */
import React from 'react';
import { observer } from '@';
import { Flex } from '@components';
import { Avatar } from '@_';
import Content from './_Content';

const prefixCls = 'style-501567';

const _Item = props => {
  const { userId, faceImg } = props;

  return (
    <Flex className={prefixCls} align="start">
      <Avatar userId={userId} img={faceImg} />
      <Flex className="ml-sm" direction="column" align="start">
        <Content {...props} />
      </Flex>

      <style jsx global>{`
        .style-501567 {
          padding-right: 1.24rem;
          margin-top: 0.24rem;
        }
        .${prefixCls} .am-flexbox {
          overflow-y: initial;
        }
      `}</style>
    </Flex>
  );
};

export default observer(_Item);
