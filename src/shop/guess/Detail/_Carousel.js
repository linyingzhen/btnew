/**
 * const prefixCls = 'style-442334';
 * const images = '/static/images/src/shop/guess/Detail';
 * @Author: czy0729
 * @Date: 2018-09-25 17:26:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-26 16:30:35
 * @Path m.benting.com.cn /src/shop/guess/Detail/_Carousel.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Carousel, ImgView } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-442334';

const _Carousel = (props, { $ }) => {
  const { className } = props;
  const { show, index } = $.getState('_imgView');
  const { image = '' } = $.getState('detail');

  const data = String(image)
    .split(',')
    .filter(item => item !== '')
    .map(item => Utils.getAppImgUrl(item, 'scale'));

  return (
    <React.Fragment>
      <Carousel
        className={classNames(prefixCls, className, `${prefixCls}__carousel`)}
        height="4.8rem"
        data={data.map(item => ({
          src: item
        }))}
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

      <style jsx global>{`
        .style-442334 {
        }
        .${prefixCls}__carousel {
          display: inline-block;
          width: 4.8rem;
          height: 4.8rem;
          background-color: ${Styles.color_bg};
          border: 0.12rem solid ${Styles.color_theme};
          border-radius: 0.06rem;
          box-shadow: 0 0.08rem 0.26rem 0 rgba(20, 62, 109, 0.5);
          overflow: hidden;
        }
      `}</style>
    </React.Fragment>
  );
};

_Carousel.contextTypes = {
  $: PropTypes.object
};

export default observer(_Carousel);
