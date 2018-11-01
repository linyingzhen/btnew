/**
 * const prefixCls = 'style-148954';
 * const images = '/static/images/src/shop/guess/Detail';
 * @Author: czy0729
 * @Date: 2018-09-26 09:42:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-27 09:32:34
 * @Path m.benting.com.cn /src/shop/guess/Detail/_Row.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { List, Flex, Button } from '@components';
import { Avatar } from '@_';
import Utils from '@utils';

const _Row = (props, { $ }) => {
  const { userId, face, nickName, vip, createTime, information } = props;

  return (
    <List.Item thumb={<Avatar userId={userId} img={face} vip={vip} />}>
      <Flex>
        <Flex.Item>
          <p className="t-30 l-44">{nickName}</p>
          <p className="t-24 l-36 t-sub">
            {Utils.date('m-d H:i:s', createTime)}
          </p>
        </Flex.Item>
        <p className="t-30 l-44 t-primary t-b">{information}斤</p>
        {!$.isEnd && (
          <Button
            className="ml-sm"
            type="primary"
            size="sm"
            inline
            radius
            onClick={() => Utils.checkLogin(() => $.page.guess(information))}
          >
            跟猜
          </Button>
        )}
      </Flex>
    </List.Item>
  );
};

_Row.contextTypes = {
  $: PropTypes.object
};

export default observer(_Row);
