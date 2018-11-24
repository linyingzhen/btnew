/**
 * const prefixCls = 'style-105455';
 * const images = '/static/images/src/shop/auction/Detail';
 * @Author: czy0729
 * @Date: 2018-09-11 12:31:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-02 18:20:41
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
  const { goodsImg = '' } = $.getState('detail');

  const data = String(goodsImg)
    .split(',')
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
          theme="light"
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
