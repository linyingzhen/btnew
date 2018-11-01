/**
 * const prefixCls = 'style-110612';
 * const images = '/static/images/components/Img';
 * @Author: czy0729
 * @Date: 2018-06-20 17:32:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 15:12:00
 * @Path m.benting.com.cn \components\Img\index.js
 */
import React from 'react';
import classNames from 'classnames';
import LazyLoad from 'react-lazyload';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import Animate from '../Animate/Wrap';

const prefixCls = 'c-img';

const Img = props => {
  const {
    src,
    size,
    circle,
    transparent,
    lazyload = true,
    animate = true,
    style,
    className,
    children,
    ...other
  } = props;

  // 历史遗留问题，灵动默认图替换为本汀默认图
  let _src = Utils.getAppImgUrl(src);
  if (_src.indexOf('591e5f9e2c2bc') !== -1) {
    _src = Const.__IMG_DEFAULT__;
  }

  const styleImg = {
    ...style,
    width: size,
    height: size,
    backgroundColor: transparent ? 'transparent' : Styles.color_inner,
    borderRadius: circle ? '50%' : undefined
  };

  // 全局维护一个Set，记录lazyload过的图片地址，仿真懒加载效果
  let _lazyload = lazyload;
  if (_lazyload && Const.__CLIENT__ && Const.imgLazyTemp.has(_src)) {
    _lazyload = false;
  }

  let imgEl;
  if (_lazyload) {
    if (Const.__CLIENT__) {
      Const.imgLazyTemp.add(_src);
    }

    const _imgEl = (
      <div>
        {children}
        <div
          className="img"
          style={{
            backgroundImage: `url(${_src})`,
            borderRadius: circle ? '50%' : undefined
          }}
        />

        <style jsx>{`
          .c-img {
          }
          .img {
            ${Styles._full};
            ${Styles._bg};
          }
        `}</style>
      </div>
    );

    imgEl = (
      <div
        className={classNames(prefixCls, className)}
        style={styleImg}
        {...other}
      >
        {animate ? <Animate>{_imgEl}</Animate> : _imgEl}
      </div>
    );
  } else {
    imgEl = (
      <div
        className={classNames(prefixCls, className)}
        style={{
          ...styleImg,
          backgroundImage: `url(${_src})`
        }}
        {...other}
      >
        {children}
      </div>
    );
  }

  return (
    <React.Fragment>
      {_lazyload ? (
        <LazyLoad
          height={size || '0.72rem'}
          throttle={160}
          offset={80}
          once
          placeholder={
            <div
              className={classNames(prefixCls, className)}
              style={{
                ...styleImg,
                backgroundColor: Styles.color_bg
              }}
            >
              {children}
            </div>
          }
        >
          {imgEl}
        </LazyLoad>
      ) : (
        imgEl
      )}

      <style jsx global>{`
        .c-img {
          display: inline-block;
          position: relative;
          vertical-align: top;
          ${Styles._bg};
          overflow: hidden;
        }
      `}</style>
    </React.Fragment>
  );
};

export default Img;
