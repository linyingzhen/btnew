/**
 * const prefixCls = 'style-358453';
 * const images = '/static/images/src/school/Index';
 * @Author: czy0729
 * @Date: 2018-09-06 18:13:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-06 18:33:49
 * @Path m.benting.com.cn /src/school/Index/_Movie.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { VideoCarousel } from '@_';
import Utils from '@utils';
import { menuDS } from './ds';

const prefixCls = 'style-358453';

const _Movie = (props, { $ }) => {
  const { className } = props;
  const data = $.getState('movie');
  const typeId = Utils.getValue(menuDS, '微电影');

  return (
    <VideoCarousel
      className={classNames(prefixCls, className)}
      title="微电影"
      data={data}
      href={`/school/video?id=${typeId}`}
      as={`/school/video/${typeId}`}
    />
  );
};

_Movie.contextTypes = {
  $: PropTypes.object
};

export default observer(_Movie);
