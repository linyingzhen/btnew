/**
 * const prefixCls = 'style-127857';
 * const images = '/static/images/components/Carousel';
 * @Author: czy0729
 * @Date: 2018-06-24 18:14:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-12 10:17:14
 * @Path m.benting.com.cn /components/Carousel/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Carousel as AMCarousel } from 'antd-mobile';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'c-carousel';
const urlLocation = (e, href) => {
  if (!href) {
    return;
  }

  e.stopPropagation();

  // 181029 旧域名全部换成本站域名
  const _href = String(href)
    .replace(Const.__WEB_BT__, Const.__WEB__)
    .replace(Const.__WEB_NIDO__, Const.__WEB__);

  if (_href.indexOf(Const.__WEB__) !== -1) {
    // 暂时只能对本域名而且结尾为数字的地址，做处理，并且都为?id=
    // #todo /id/postId 这类路由会误解释，需要处理
    const path = _href.replace(Const.__WEB__, '');
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
    Utils.onConfirm('即将跳出本站，确定?', () => (window.location = href));
  }
};

class Carousel extends React.Component {
  static propTypes = {
    data: PropTypes.array, // 轮播数据 Array<{ src: String }>
    height: PropTypes.string, // 轮播高度
    ssr: PropTypes.bool, // 是否把轮播背景设置为第一个图
    onImgClick: PropTypes.func // 图片点击回调
  };

  static defaultProps = {
    data: [],
    height: '46vw',
    ssr: false,
    onImgClick: Function.prototype
  };

  state = {
    didMount: false
  };

  componentDidMount() {
    // 暂时解决SSR hydrate问题
    this.setState({
      didMount: true
    });
  }

  render() {
    const {
      data,
      height,
      ssr,
      onImgClick,
      style,
      className,
      ...other
    } = this.props;
    const { didMount } = this.state;
    const cls = classNames(prefixCls, className);

    if (!didMount || data.length === 0) {
      return <div className={cls} style={{ height }} />;
    }

    if (data.length === 1) {
      const { src, href } = data[0] || {};

      return (
        <div className={cls} onClick={() => onImgClick(0)}>
          <div
            className="bg"
            style={{
              height,
              backgroundImage: `url(${Utils.getAppImgUrl(src, 'scale', true)})`,
              ...style
            }}
            onClick={e => urlLocation(e, href)}
          />
        </div>
      );
    }

    let ssrStyle;
    if (ssr) {
      ssrStyle = {
        backgroundImage: `url(${Utils.getAppImgUrl(
          (data[0] || {}).src,
          'scale',
          true
        )})`
      };
    }

    return (
      <div className={cls} style={ssrStyle}>
        <AMCarousel
          infinite
          autoplay
          autoplayInterval={8000}
          style={{
            minHeight: height,
            ...style
          }}
          {...other}
        >
          {data.map(({ src, href }, index) => (
            <div
              key={src}
              className="bg"
              style={{
                height,
                backgroundImage: `url(${Utils.getAppImgUrl(
                  src,
                  'scale',
                  true
                )})`,
                ...style
              }}
              onClick={e => {
                onImgClick(index);
                urlLocation(e, href);
              }}
            />
          ))}
        </AMCarousel>

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
      </div>
    );
  }
}

const prefixClsOrigin = `${prefixCls}__orgin`;

const Origin = props => {
  const { height, className, children, ...other } = props;

  return (
    <>
      <AMCarousel
        className={classNames(prefixClsOrigin, className)}
        infinite
        autoplay
        autoplayInterval={8000}
        style={{
          height
        }}
        {...other}
      >
        {children}
      </AMCarousel>

      <style jsx global>{`
        .c-carousel__origin {
          padding-bottom: ${Styles.bottom};
        }
        .${prefixClsOrigin} .am-carousel-wrap-dot > span {
          width: 0.16rem;
          height: 0.16rem;
          margin: 0 0.08rem;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 50%;
        }
        .${prefixClsOrigin} .am-carousel-wrap-dot-active > span {
          background: rgba(0, 0, 0, 0.8);
        }
        .${prefixClsOrigin} .slider-decorator-0 {
          width: 90%;
        }
      `}</style>
    </>
  );
};

Carousel.Origin = Origin;

export default Carousel;
