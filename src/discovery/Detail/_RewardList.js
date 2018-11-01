/**
 * const prefixCls = 'style-493230';
 * const images = '/static/images/src/discovery/Detail';
 * @Author: czy0729
 * @Date: 2018-07-24 16:31:49
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-07-24 16:31:49
 * @Path m.benting.com.cn /src/discovery/Detail/_RewardList.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { RewardList } from '@_';

const prefixCls = 'style-493230';

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
