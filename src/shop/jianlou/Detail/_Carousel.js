/**
 * const prefixCls = 'style-192718';
 * const images = '/static/images/src/shop/jianlou/Detail';
 * @Author: czy0729
 * @Date: 2018-09-23 22:06:58
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-09-23 22:06:58
 * @Path m.benting.com.cn /src/shop/jianlou/Detail/_Carousel.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Carousel, ImgView } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const _Carousel = (props, { $ }) => {
  const { show, index } = $.getState('_imgView');
  const { imgs = '', imglist = '' } = $.getState('detail');

  const imgArr = [imgs, ...imglist.split(',')];
  const data = imgArr
    .filter(item => item !== '')
    .map(item => Utils.getAppImgUrl(item, 'scale'));

  return (
    <>
      <Carousel
        data={data.map(item => ({
          src: item
        }))}
        height="96vw"
        style={{
          backgroundColor: Styles.color_theme
        }}
        onImgClick={$.page.showImgView}
      />
      {!!data.length && (
        <ImgView
          show={show}
          data={data}
          current={index}
          hideOrigin
          onClose={$.page.hideImgView}
        />
      )}
    </>
  );
};

_Carousel.contextTypes = {
  $: PropTypes.object
};

export default observer(_Carousel);
