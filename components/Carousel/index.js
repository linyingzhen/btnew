/**
 * const prefixCls = 'style-127857';
 * const images = '/static/images/components/Carousel';
 * @Author: czy0729
 * @Date: 2018-06-24 18:14:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-26 14:45:55
 * @Path m.benting.com.cn /components/Carousel/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Carousel } from 'antd-mobile';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'c-carousel';
const urlLocation = (e, href) => {
  if (!href) {
    return;
  }

  e.stopPropagation();

  if (String(href).indexOf(Const.__WEB__) !== -1) {
    // 暂时只能对本域名而且结尾为数字的地址，做处理，并且都为?id=
    // #todo /id/postId 这类路由会误解释，需要处理
    const path = href.replace(Const.__WEB__, '');
    const reg = /\/\d+$/;
    const match = path.match(reg);

    if (match) {
      Utils.router.push(
        `${path.replace(reg, '')}?id=${match[0].replace('/', '')}`,
        path
      );
    } else {
      Utils.router.push(path);
    }
  } else {
    window.location = href;
  }
};

const _Carousel = props => {
  const {
    data,
    height,
    style,
    ssr = false,
    onImgClick = Function.prototype,
    className,
    ...other
  } = props;

  if (data.length === 0) {
    return (
      <div className={classNames(prefixCls, className)} style={{ height }} />
    );
  }

  if (data.length === 1) {
    return (
      <div
        className={classNames(prefixCls, className)}
        onClick={() => onImgClick(0)}
      >
        <div
          className="item"
          style={{
            height,
            backgroundImage: `url(${Utils.getAppImgUrl(
              data[0].src,
              'scale',
              true
            )})`,
            ...style
          }}
          onClick={e => urlLocation(e, data[0].href)}
        />

        <style jsx>{`
          .c-carousel {
          }
          .item {
            ${Styles._bg};
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      className={classNames(prefixCls, className)}
      style={
        ssr
          ? {
            backgroundImage: `url(${Utils.getAppImgUrl(
              data[0].src,
              'scale',
              true
            )})`
          }
          : undefined
      }
    >
      <Carousel
        infinite
        autoplay
        autoplayInterval={8000}
        style={{
          minHeight: height
        }}
        {...other}
      >
        {data.map((item, index) => (
          <div
            key={item.src}
            className="item"
            style={{
              height,
              backgroundImage: `url(${Utils.getAppImgUrl(
                item.src,
                'scale',
                true
              )})`,
              ...style
            }}
            onClick={e => {
              onImgClick(index);
              urlLocation(e, item.href);
            }}
          />
        ))}
      </Carousel>

      <style jsx global>{`
        .c-carousel {
          ${Styles._bg};
        }
        .${prefixCls} .slider-slide {
          ${Styles._bg};
          background-size: contain;
        }
        .${prefixCls} .am-carousel-wrap {
          margin-bottom: 0.08rem;
        }
        .${prefixCls} .am-carousel-wrap-dot > span {
          width: 0.16rem;
          height: 0.16rem;
          margin: 0 0.04rem;
          background: rgba(255, 255, 255, 0.32);
          border-radius: 50%;
          box-shadow: ${Styles.boxShadow};
        }
        .${prefixCls} .am-carousel-wrap-dot-active > span {
          background: rgba(255, 255, 255, 0.8);
        }
        .${prefixCls} .slider-decorator-0 {
          width: 90%;
        }
      `}</style>
      <style jsx>{`
        .c-carousel {
        }
        .item {
          ${Styles._bg};
        }
      `}</style>
    </div>
  );
};

const _CarouselOrigin = props => {
  const { height, className, children, ...other } = props;

  return (
    <>
      <Carousel
        className={classNames(`${prefixCls}__origin`, className)}
        infinite
        autoplay
        autoplayInterval={8000}
        style={{
          height
        }}
        {...other}
      >
        {children}
      </Carousel>

      <style jsx global>{`
        .c-carousel {
        }
        .${prefixCls}__origin {
          padding-bottom: ${Styles.bottom};
        }
        .${prefixCls}__origin .am-carousel-wrap-dot > span {
          width: 0.16rem;
          height: 0.16rem;
          margin: 0 0.08rem;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 50%;
        }
        .${prefixCls}__origin .am-carousel-wrap-dot-active > span {
          background: rgba(0, 0, 0, 0.8);
        }
        .${prefixCls}__origin .slider-decorator-0 {
          width: 90%;
        }
      `}</style>
    </>
  );
};

_Carousel.propTypes = {
  height: PropTypes.string
};
_Carousel.defaultProps = {
  height: '46vw'
};
_Carousel.Origin = _CarouselOrigin;

export default _Carousel;
