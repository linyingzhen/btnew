/**
 * const prefixCls = 'style-164777';
 * const images = '/static/images/src/index/Home';
 * @Author: czy0729
 * @Date: 2018-06-20 18:52:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-30 00:33:15
 * @Path m.benting.com.cn \src\index\Home\_Carousel.js
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
        src: Utils.getAppImgUrl(item.imgPath, 'scale'),
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
