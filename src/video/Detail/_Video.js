/**
 * const prefixCls = 'style-147877';
 * const images = '/static/images/src/video/Detail';
 * @Author: czy0729
 * @Date: 2018-07-19 17:06:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-31 09:55:49
 * @Path m.benting.com.cn /src/video/Detail/_Video.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Video } from '@components';

const prefixCls = 'style-147877';

const _Video = (props, { $ }) => {
  const { className } = props;
  const { fileinfo = {}, isOtherUrl, tit, otherUrl, _loaded } = $.getState(
    'detail'
  );

  if (!_loaded) {
    return (
      <div
        style={{
          height: '57.5vw',
          background: '#000'
        }}
      />
    );
  }

  if (isOtherUrl == 1) {
    return (
      <iframe
        className={classNames(prefixCls, className)}
        title={tit}
        src={otherUrl}
        allowFullScreen
        frameBorder="0"
        style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          height: '57.5vw'
        }}
      />
    );
  }

  return (
    <Video
      className={classNames(prefixCls, className)}
      src={fileinfo.path}
      poster={fileinfo.surface}
      fileSize={fileinfo.size}
      playSecond={fileinfo.play_time}
    />
  );
};

_Video.contextTypes = {
  $: PropTypes.object
};

export default observer(_Video);
