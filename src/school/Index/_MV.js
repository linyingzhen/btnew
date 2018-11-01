/**
 * const prefixCls = 'style-283357';
 * const images = '/static/images/src/school/Index';
 * @Author: czy0729
 * @Date: 2018-09-06 18:12:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-06 18:34:09
 * @Path m.benting.com.cn /src/school/Index/_MV.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { VideoCarousel } from '@_';
import Utils from '@utils';
import { menuDS } from './ds';

const prefixCls = 'style-283357';

const _MV = (props, { $ }) => {
  const { className } = props;
  const data = $.getState('mv');
  const typeId = Utils.getValue(menuDS, 'MV');

  return (
    <VideoCarousel
      className={classNames(prefixCls, className)}
      title="MV"
      data={data}
      href={`/school/video?id=${typeId}`}
      as={`/school/video/${typeId}`}
    />
  );
};

_MV.contextTypes = {
  $: PropTypes.object
};

export default observer(_MV);
