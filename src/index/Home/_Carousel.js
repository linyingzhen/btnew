/**
 * const prefixCls = 'style-142824';
 * const images = '/static/images/src/index/Home';
 * @Author: czy0729
 * @Date: 2018-06-20 18:52:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-01 20:24:13
 * @Path bt_mb_new /src/index/Home/_Carousel.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Carousel } from '@components';
import Utils from '@utils';

const _Carousel = (props, { $ }) => {
  const { list } = $.getState('carousel');

  return (
    <Carousel
      data={list.map(item => ({
        src: Utils.getAppImgUrl(item.imgId, 'scale'),
        href: item.url
      }))}
      height="42.6vw"
      ssr
    />
  );
};

_Carousel.contextTypes = {
  $: PropTypes.object
};

export default observer(_Carousel);
