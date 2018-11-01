/**
 * const prefixCls = 'style-157347';
 * const images = '/static/images/src/person/message/Index';
 * @Author: czy0729
 * @Date: 2018-10-05 22:59:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-05 23:05:56
 * @Path m.benting.com.cn /src/person/message/Index/_Chat.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { ListView } from '@components';
import ChatRow from './_ChatRow';

const _Chat = (props, { $ }) => {
  const privateMessage = $.getState('privateMessage');

  return (
    <ListView
      data={privateMessage}
      renderRow={item => <ChatRow {...item} />}
      onEndReached={$.fetch.privateMessage}
    />
  );
};

_Chat.contextTypes = {
  $: PropTypes.object
};

export default observer(_Chat);
