/**
 * const prefixCls = 'style-968605';
 * const images = '/static/images/src/person/friends/Index';
 * @Author: czy0729
 * @Date: 2018-10-23 15:33:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 15:52:27
 * @Path bt_mb_new /src/person/friends/Index/_Item.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { List, Flex, Button } from '@components';
import { Avatar } from '@_';
import Utils from '@utils';

const _Item = props => {
  const { title, userId, concernUid, faceImg, niname } = props;

  let _userId;
  if (title === '关注') {
    _userId = concernUid;
  } else {
    _userId = userId;
  }

  return (
    <List.Item>
      <Flex justify="between">
        <Flex>
          <Avatar userId={_userId} img={faceImg} />
          <p className="t-30 l-44 ml-sm">{niname}</p>
        </Flex>
        <Button
          type="primary"
          ghost
          inline
          size="xs"
          onClick={() =>
            Utils.router.push(`/chat?id=${_userId}`, `/chat/${_userId}`)
          }
        >
          私聊
        </Button>
      </Flex>
    </List.Item>
  );
};

_Item.contextTypes = {
  $: PropTypes.object
};

export default observer(_Item);
