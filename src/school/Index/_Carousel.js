/**
 * const prefixCls = 'style-139564';
 * const images = '/static/images/src/school/Index';
 * @Author: czy0729
 * @Date: 2018-09-05 15:50:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-29 11:26:37
 * @Path m.benting.com.cn /src/school/Index/_Carousel.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Carousel } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-139564';

const _Carousel = (props, { $ }) => {
  const { list } = $.getState('carousel');

  return (
    <div className={prefixCls}>
      <Carousel
        className={`${prefixCls}__carousel`}
        data={list.map(item => ({
          src: Utils.getAppImgUrl(item.imgPath, 'scale'),
          href: item.url
        }))}
        height="32vw"
      />

      <style jsx global>{`
        .style-139564 {
          padding: 0 0.32rem 0.32rem;
          background: ${Styles.color_theme};
        }
        .${prefixCls}__carousel {
          border-radius: 0.04rem;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

_Carousel.contextTypes = {
  $: PropTypes.object
};

export default observer(_Carousel);
