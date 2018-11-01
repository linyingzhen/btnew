/**
 * const prefixCls = 'style-166964';
 * const images = '/static/images/src/school/Index';
 * @Author: czy0729
 * @Date: 2018-09-06 18:09:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-06 18:33:17
 * @Path m.benting.com.cn /src/school/Index/_Combat.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { VideoCarousel } from '@_';
import Utils from '@utils';
import { menuDS } from './ds';

const prefixCls = 'style-209308';

const _Combat = (props, { $ }) => {
  const { className } = props;
  const data = $.getState('combat');
  const typeId = Utils.getValue(menuDS, '钓鱼实战');

  return (
    <VideoCarousel
      className={classNames(prefixCls, className)}
      title="钓鱼实战"
      data={data}
      href={`/school/video?id=${typeId}`}
      as={`/school/video/${typeId}`}
    />
  );
};

_Combat.contextTypes = {
  $: PropTypes.object
};

export default observer(_Combat);
