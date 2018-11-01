/**
 * const prefixCls = 'style-105455';
 * const images = '/static/images/src/shop/auction/Detail';
 * @Author: czy0729
 * @Date: 2018-09-11 12:31:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-21 12:23:09
 * @Path m.benting.com.cn /src/shop/auction/Detail/_Carousel.js
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
    .map(item => Utils.getImgUrl(item));

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
