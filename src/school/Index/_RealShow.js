/**
 * const prefixCls = 'style-177679';
 * const images = '/static/images/src/school/Index';
 * @Author: czy0729
 * @Date: 2018-09-06 18:11:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-06 18:34:30
 * @Path m.benting.com.cn /src/school/Index/_RealShow.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { VideoCarousel } from '@_';
import Utils from '@utils';
import { menuDS } from './ds';

const prefixCls = 'style-177679';

const _RealShow = (props, { $ }) => {
  const { className } = props;
  const data = $.getState('realShow');
  const typeId = Utils.getValue(menuDS, '真人秀');

  return (
    <VideoCarousel
      className={classNames(prefixCls, className)}
      title="真人秀"
      data={data}
      href={`/school/video?id=${typeId}`}
      as={`/school/video/${typeId}`}
    />
  );
};

_RealShow.contextTypes = {
  $: PropTypes.object
};

export default observer(_RealShow);
