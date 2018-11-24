/**
 * const prefixCls = 'style-968605';
 * const images = '/static/images/src/person/friends/Index';
 * @Author: czy0729
 * @Date: 2018-10-23 15:33:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-14 16:45:33
 * @Path bt_mb_new /src/person/friends/Index/_Item.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { List, Flex, Button } from '@components';
import { Avatar } from '@_';
import Utils from '@utils';

const _Item = (props, { $ }) => {
  const { title, userId, concernUid, faceImg, niname, prefix } = props;

  const isTabFollow = title === '关注';
  let _userId;
  if (isTabFollow) {
    _userId = concernUid;
  } else {
    _userId = userId;
  }

  let textState;
  if (prefix === 2) {
    textState = '互相关注';
  } else if (prefix === 1) {
    textState = '取消关注';
  } else {
    textState = '关注TA';
  }

  return (
    <List.Item
      thumb={
        <Avatar
          userId={_userId}
          img={faceImg}
          style={{ margin: '0.24rem 0' }}
        />
      }
    >
      <Flex>
        <Flex.Item className="t-30 l-44">{niname}</Flex.Item>
        <Button
          type={textState === '互相关注' ? 'success' : undefined}
          ghost
          inline
          size="xs"
          style={{ minWidth: '1.14rem' }}
          onClick={() => {
            if (isTabFollow) {
              Utils.onConfirm('确定取消关注?', () =>
                $.do.toggle(_userId, false));
            } else {
              $.do.toggle(_userId, true);
            }
          }}
        >
          {textState}
        </Button>
        <Button
          className="ml-sm"
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
