/**
 * const prefixCls = 'style-418566';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-10-26 14:04:34
 * @Last Modified by:   lyz0720
 * @Last Modified time: 2018-10-26 14:04:34
 * @Path bt_mb_new \src\person\btlevel\Index\_Score.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import List from '../../level/_/FlowList';

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
