/**
 * const prefixCls = 'style-385934';
 * const images = '/static/images/src/person/Index';
 * @Author: cwz0525
 * @Date: 2018-09-03 10:55:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 15:18:56
 * @Path m.benting.com.cn /src/person/Index/_Header.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'antd-mobile';
import { observer } from '@';
import { Header, Flex, Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const _Header = (props, { $ }) => {
  const {
    commentNum,
    replyNum,
    likeNum,
    systemNum,
    rewardNum,
    otherNum
  } = $.getState('messageCount');
  const hasNewMessage = !!(
    commentNum ||
    replyNum ||
    likeNum ||
    systemNum ||
    rewardNum ||
    otherNum
  );

  return (
    <Header
      show
      hideBack
      ft={
        <Flex>
          <Badge
            dot={hasNewMessage}
            style={{
              top: '-0.06rem',
              right: '-0.16rem',
              width: '0.2rem',
              height: '0.2rem',
              border: `0.02rem solid ${Styles.color_main}`
            }}
          >
            <Icon
              className="t-40 t-void"
              type="message2"
              onClick={() => Utils.router.push('/person/message')}
            />
          </Badge>
          <Icon
            className="t-40 t-void ml-32"
            type="setting"
            onClick={() => Utils.router.push('/person/setup')}
          />
        </Flex>
      }
      style={{
        background: Styles.color_main
      }}
    />
  );
};

_Header.contextTypes = {
  $: PropTypes.object
};

export default observer(_Header);
