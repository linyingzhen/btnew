/**
 * const prefixCls = 'style-172595';
 * const images = '/static/images/src/person/level/Index';
 * @Author: czy0729
 * @Date: 2018-10-25 18:35:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 23:39:28
 * @Path bt_mb_new /src/person/level/Index/_Score.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import FlowList from '@src/person/wallet/_/FlowList';

const prefixCls = 'style-172595';

const _Score = (props, { $ }) => {
  const { className } = props;
  const data = $.getState('integralList');

  return (
    <FlowList
      className={classNames(prefixCls, className)}
      section={$.section}
      data={data}
      type="score"
      onEndReached={$.fetch.integralRecordList}
    />
  );
};

_Score.contextTypes = {
  $: PropTypes.object
};

export default observer(_Score);
