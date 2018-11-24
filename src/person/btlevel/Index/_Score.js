/**
 * const prefixCls = 'style-187067';
 * const images = '/static/images/src/person/btlevel/Index';
 * @Author: lyz0720
 * @Date: 2018-10-26 14:04:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-13 17:25:12
 * @Path bt_mb_new /src/person/btlevel/Index/_Score.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import List from '@src/person/level/_/FlowList';

const _Score = (props, { $ }) => {
  const data = $.getState('integralList');

  return (
    <List
      className="mt-d"
      section={$.section}
      data={data}
      type="score"
      onEndReached={$.fetch.integralList}
    />
  );
};

_Score.contextTypes = {
  $: PropTypes.object
};

export default observer(_Score);
