/**
 * const prefixCls = 'style-905346';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-05 18:31:06
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-05 18:31:54
 * @Path bt_mb_new \src\person\friends\Search\_Item.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { List, Flex, Button } from '@components';
import { Avatar } from '@_';

const _Item = (props, { $ }) => {
  const { userId, faceImg, niname, ccNum, fNum, ccState } = props;

  return (
    <List.Item>
      <Flex justify="between">
        <Flex>
          <Avatar userId={userId} img={faceImg} />
          <Flex>
            <Flex.Item>
              <p className="t-30 l-44 ml-sm">{niname}</p>
              <p className="t-24 ml-sm">
                关注：
                {ccNum} 粉丝：
                {fNum}
              </p>
            </Flex.Item>
          </Flex>
        </Flex>

        <Button
          type="primary"
          ghost
          inline
          size="xs"
          onClick={() => $.do.follow(userId)}
        >
          {ccState == 1 ? '取消关注' : '关注'}
        </Button>
      </Flex>
    </List.Item>
  );
};

_Item.contextTypes = {
  $: PropTypes.object
};

export default observer(_Item);
