/**
 * const prefixCls = 'style-219834';
 * const images = '/static/images/src/_/Imgs';
 * @Author: czy0729
 * @Date: 2018-07-29 17:17:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 02:48:22
 * @Path m.benting.com.cn /src/_/Imgs/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { Flex, Img } from '@components';
import Const from '@const';
import Utils from '@utils';

const prefixCls = 'style-219834';

const Imgs = props => {
  const {
    data = [],
    max = 9,
    lazyload,
    animate,
    onImgClick = Function.prototype,
    className
  } = props;

  if (!data.length) {
    return null;
  }

  if (data.length === 1) {
    const _src = Utils.getAppImgUrl(data[0], 'scale');

    return (
      <div
        className={classNames(prefixCls, className)}
        style={{
          backgroundImage: `url(${_src})`
        }}
        onClick={() => onImgClick(0)}
      >
        <img src={_src} alt="" />

        <style jsx>{`
          .style-219834 {
            position: relative;
            background-size: contain;
            background-position: top left;
            background-repeat: no-repeat;
          }
          img {
            width: 100% !important;
            height: initial !important;
            max-width: 50vw;
            max-height: 100vw;
            visibility: hidden;
          }
        `}</style>
      </div>
    );
  }

  // 4张显示为2*2
  let _data = data;
  if (_data.length === 4) {
    _data =
      data.length >= max
        ? data
        : [
          data[0],
          data[1],
          `${Const.__IMG__}/placeholder.png`,
          data[2],
          data[3]
        ];
  }

  return (
    <Flex className={classNames(prefixCls, className)} wrap="wrap">
      {_data.filter((item, index) => index < max).map((item, index) => (
        <Img
          key={item}
          className={`${prefixCls}__img`}
          src={item}
          lazyload={lazyload}
          animate={animate}
          onClick={() => {
            // 2*2时，有一张假占位图，要排除
            if (data.length === 4) {
              if (index === 2) {
                return;
              }

              if (index < 2) {
                onImgClick(index);
              } else {
                onImgClick(index - 1);
              }
            } else {
              onImgClick(index);
            }
          }}
        >
          {Utils.isPoster(item) && (
            <img className="img-poster" src={`${Const.__IMG__}/play${Const.__IMG_DPR__}.png`} alt="" />
          )}
        </Img>
      ))}

      <style jsx global>{`
        .style-219834 {
        }
        .${prefixCls}__img {
          width: 31.77777% !important;
          height: auto;
          padding-bottom: 31.77777%;
          margin-top: 2.33333%;
          margin-right: 2.33333%;
          background-color: transparent;
        }
        .${prefixCls}__img:nth-of-type(1),
        .${prefixCls}__img:nth-of-type(2),
        .${prefixCls}__img:nth-of-type(3) {
          margin-top: 0 !important;
        }
        .${prefixCls}__img:nth-of-type(3n) {
          margin-right: 0 !important;
        }
      `}</style>
      <style jsx>{`
        .style-219834 {
        }
        .img-poster {
          position: absolute;
          top: 48%;
          left: 50%;
          width: 0.96rem !important;
          height: 0.96rem !important;
          transform: translate(-50%, -50%);
          opacity: 0.8;
        }
      `}</style>
    </Flex>
  );
};

export default Imgs;
