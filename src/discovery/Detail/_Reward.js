/**
 * const prefixCls = 'style-207012';
 * const images = '/static/images/src/discovery/Detail';
 * @Author: czy0729
 * @Date: 2018-07-24 16:31:20
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-07-24 16:31:20
 * @Path m.benting.com.cn /src/discovery/Detail/_Reward.js
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
