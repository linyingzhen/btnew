/**
 * const prefixCls = 'style-857030';
 * const images = '/static/images/src/video/Detail';
 * @Author: czy0729
 * @Date: 2018-07-22 16:19:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-22 16:22:01
 * @Path m.benting.com.cn /src/video/Detail/_RewardList.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { RewardList } from '@_';

const prefixCls = 'style-214801';

const _RewardList = (props, { $ }) => {
  const { className } = props;
  const reward = $.getState('reward');

  return (
    <RewardList
      className={classNames(prefixCls, className)}
      data={reward.list}
    />
  );
};

_RewardList.contextTypes = {
  $: PropTypes.object
};

export default observer(_RewardList);
