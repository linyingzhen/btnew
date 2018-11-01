/**
 * const prefixCls = 'style-732813';
 * const images = '/static/images/src/video/Detail';
 * @Author: czy0729
 * @Date: 2018-07-22 20:03:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-17 16:20:51
 * @Path m.benting.com.cn /src/video/Detail/_Random.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { VideoCarousel } from '@_';

const prefixCls = 'style-732813';

const _Random = (props, { $ }) => {
  const { className } = props;
  const data = $.getState('random');

  return (
    <VideoCarousel
      className={classNames(prefixCls, className)}
      title="推荐视频"
      data={data}
    />
  );
};

_Random.contextTypes = {
  $: PropTypes.object
};

export default observer(_Random);
