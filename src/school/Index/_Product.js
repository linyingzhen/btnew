/**
 * const prefixCls = 'style-209308';
 * const images = '/static/images/src/school/Index';
 * @Author: czy0729
 * @Date: 2018-09-06 17:57:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-06 18:32:17
 * @Path m.benting.com.cn /src/school/Index/_Product.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { VideoCarousel } from '@_';
import Utils from '@utils';
import { menuDS } from './ds';

const prefixCls = 'style-209308';

const _Product = (props, { $ }) => {
  const { className } = props;
  const data = $.getState('product');
  const typeId = Utils.getValue(menuDS, '本汀产品');

  return (
    <VideoCarousel
      className={classNames(prefixCls, className)}
      title="本汀产品"
      data={data}
      href={`/school/video?id=${typeId}`}
      as={`/school/video/${typeId}`}
    />
  );
};

_Product.contextTypes = {
  $: PropTypes.object
};

export default observer(_Product);
