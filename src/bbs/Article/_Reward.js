/**
 * const prefixCls = 'style-241004';
 * const images = '/static/images/src/bbs/Article';
 * @Author: czy0729
 * @Date: 2018-07-17 17:37:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-17 17:38:38
 * @Path m.benting.com.cn /src/bbs/Article/_Reward.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Reward } from '@components';

const _Reward = (props, { $ }) => {
  const { show } = $.getState('_reward');

  return (
    <Reward
      show={show}
      onCancel={$.page.hideReward}
      onSuccess={$.do.reward}
    />
  );
};

_Reward.contextTypes = {
  $: PropTypes.object
};

export default observer(_Reward);
