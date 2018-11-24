/**
 * const prefixCls = 'style-185133';
 * const images = '/static/images/src/index/Nido';
 * @Author: czy0729
 * @Date: 2018-06-22 17:31:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-01 23:34:16
 * @Path m.benting.com.cn /src/index/Nido/_Carousel.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Carousel } from '@components';
import Utils from '@utils';

const prefixCls = 'style-185133';

const _Carousel = (props, { $ }) => {
  const { list } = $.getState('carousel');

  return (
    <div className={prefixCls}>
      <Carousel
        data={list.map(({ imgId, url }) => ({
          src: Utils.getAppImgUrl(imgId, 'scale'),
          href: url
        }))}
        height="42.6vw"
        ssr
      />

      <style jsx>{`
        .style-185133 {
          height: 42.6vw;
        }
      `}</style>
    </div>
  );
};

_Carousel.contextTypes = {
  $: PropTypes.object
};

export default observer(_Carousel);
