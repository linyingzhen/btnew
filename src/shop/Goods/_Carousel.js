/**
 * const prefixCls = 'style-119515';
 * const images = '/static/images/src/shop/Goods';
 * @Author: czy0729
 * @Date: 2018-09-30 11:26:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-26 11:53:36
 * @Path m.benting.com.cn /src/shop/Goods/_Carousel.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Carousel, ImgView } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-295848';

const _Carousel = (props, { $ }) => {
  const { className } = props;
  const { show, index } = $.getState('_imgView');
  const { imglist = '' } = $.getState('detail');

  const data = String(imglist)
    .split(',')
    .filter(item => item !== '')
    .map(item => Utils.getAppImgUrl(item, 'scale'));

  return (
    <div className={classNames(prefixCls, className)}>
      <Carousel
        className={`${prefixCls}__carousel`}
        data={data.map(item => ({
          src: item
        }))}
        height="56.8vw"
        autoplay={false}
        onImgClick={$.page.showImgView}
      />
      {!!data.length && (
        <ImgView
          show={show}
          data={data}
          current={index}
          hideOrigin
          theme="light"
          onClose={$.page.hideImgView}
        />
      )}

      <style jsx global>{`
        .style-295848 {
          position: relative;
          padding-bottom: 100%;
          margin-bottom: 14vw;
          background: ${Styles.color_inner};
        }
        .${prefixCls}__carousel {
          ${Styles._absolute};
          width: 56.8vw;
        }
        .${prefixCls}__carousel .slider-decorator-0 {
          margin-bottom: -22vw;
        }
        .${prefixCls}__carousel .am-carousel-wrap-dot > span {
          width: 0.24rem !important;
          height: 0.24rem !important;
          margin: 0 0.06rem !important;
          border: 0.02rem solid ${Styles.color_main};
          border-radius: 50% !important;
        }
        .${prefixCls}__carousel .am-carousel-wrap-dot-active > span {
          background: ${Styles.color_main} !important;
        }
      `}</style>
    </div>
  );
};

_Carousel.contextTypes = {
  $: PropTypes.object
};

export default observer(_Carousel);
