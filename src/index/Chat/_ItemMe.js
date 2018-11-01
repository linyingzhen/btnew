/**
 * const prefixCls = 'style-998717';
 * const images = '/static/images/src/index/Chat';
 * @Author: czy0729
 * @Date: 2018-10-21 17:36:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-21 19:54:12
 * @Path bt_mb_new /src/index/Chat/_ItemMe.js
 */
import React from 'react';
import { observer } from '@';
import { Flex } from '@components';
import { Avatar } from '@_';
import Content from './_Content';

const prefixCls = 'style-998717';

const _ItemMe = props => {
  const { userId, faceImg } = props;

  return (
    <Flex className={prefixCls} align="start" justify="end">
      <Flex className="mr-sm" direction="column" align="end" justify="start">
        <Content className="t-void" isMe {...props} />
      </Flex>
      <Avatar userId={userId} img={faceImg} />

      <style jsx global>{`
        .style-998717 {
          padding-left: 1.24rem;
          margin-top: 0.24rem;
        }
        .${prefixCls} .am-flexbox {
          overflow-y: initial;
        }
      `}</style>
    </Flex>
  );
};

export default observer(_ItemMe);
