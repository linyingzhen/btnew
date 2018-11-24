/**
 * const prefixCls = 'style-770874';
 * const images = '/static/images/src/event/car/Post/_Media';
 * @Author: czy0729
 * @Date: 2018-11-08 14:26:25
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-11-08 14:26:25
 * @Path bt_mb_new /src/event/car/Post/_Media/_Progress.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Progress } from 'antd-mobile';
import { observer } from '@';
import Utils from '@utils';

const prefixCls = 'style-770874';

const _Progress = (props, { $ }) => {
  const { className } = props;
  const { percent, size } = $.getState('_media');

  if (!percent) {
    return null;
  }

  return (
    <div className={classNames(prefixCls, className)}>
      <Progress percent={percent} position="normal" />
      <p className="t-28 t-sub t-c mt-16">
        <span>正在上传...</span>
        <span className="ml-xs">{percent}%</span>
        <span className="ml-xs">
          ({Utils.getMB(size * (percent / 100))}MB/{Utils.getMB(size)}MB)
        </span>
      </p>
    </div>
  );
};

_Progress.contextTypes = {
  $: PropTypes.object
};

export default observer(_Progress);
