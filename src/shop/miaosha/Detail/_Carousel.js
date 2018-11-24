/**
 * const prefixCls = 'style-181146';
 * const images = '/static/images/src/shop/miaosha/Detail';
 * @Author: czy0729
 * @Date: 2018-11-02 18:22:31
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-11-02 18:22:31
 * @Path bt_mb_new /src/shop/miaosha/Detail/_Carousel.js.git
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
