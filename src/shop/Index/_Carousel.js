/**
 * const prefixCls = 'style-295848';
 * const images = '/static/images/src/shop/Index';
 * @Author: czy0729
 * @Date: 2018-09-28 18:03:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-17 16:10:43
 * @Path m.benting.com.cn /src/shop/Index/_Carousel.js
 */
import React from 'react';
import { Carousel } from '@components';
import Styles from '@styles';
import { images } from './ds';

const prefixCls = 'style-295848';

const _Carousel = () => (
  <div className={prefixCls}>
    <Carousel
      data={[
        {
          src: `${images}/thumb.jpg`
        }
      ]}
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

export default _Carousel;
