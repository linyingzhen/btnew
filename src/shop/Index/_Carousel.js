/**
 * const prefixCls = 'style-295848';
 * const images = '/static/images/src/shop/Index';
 * @Author: czy0729
 * @Date: 2018-09-28 18:03:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-14 14:56:27
 * @Path m.benting.com.cn /src/shop/Index/_Carousel.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-295848';

const _Carousel = (props, { $ }) => {
  const { list } = $.getState('carousel');

  return (
    <div className={prefixCls}>
      <Carousel
        data={list.map(({ imgId, url }) => ({
          src: Utils.getAppImgUrl(imgId, 'scale'),
          href: url
        }))}
        height="40vw"
        ssr
      />

      <style jsx>{`
        .style-295848 {
          padding: ${Styles.wind};
          background: ${Styles.color_theme};
        }
      `}</style>
    </div>
  );
};

_Carousel.contextTypes = {
  $: PropTypes.object
};

export default _Carousel;
