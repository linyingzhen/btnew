/**
 * const prefixCls = 'style-575817';
 * const images = '/static/images/src/video/Detail';
 * @Author: czy0729
 * @Date: 2018-07-22 16:03:40
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-07-22 16:03:40
 * @Path m.benting.com.cn /src/video/Detail/_Reward.js
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
