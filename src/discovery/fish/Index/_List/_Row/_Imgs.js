/**
 * const prefixCls = 'style-597457';
 * const images = '/static/images/src/discovery/fish/Index/_List/_Row';
 * @Author: czy0729
 * @Date: 2018-08-08 17:30:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-11 10:31:24
 * @Path m.benting.com.cn /src/discovery/fish/Index/_List/_Row/_Imgs.js
 */
import React from 'react';
import classNames from 'classnames';
import { Flex, Img } from '@components';
import Const from '@const';
import Utils from '@utils';

const prefixCls = 'style-597457';

const _Imgs = props => {
  const { data = [], max = 9, onImgClick, className } = props;

  if (data.length === 1) {
    const _src = Utils.getAppImgUrl(data[0].src, 'scale');

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
          .style-597457 {
            position: relative;
            background-size: contain;
            background-position: top left;
            background-repeat: no-repeat;
          }
          img {
            width: auto !important;
            height: initial !important;
            max-width: 57.5vw;
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
          { src: `${Const.__IMG__}/placeholder.png` },
          data[2],
          data[3]
        ];
  }

  return (
    <Flex className={classNames(prefixCls, className)} wrap="wrap">
      {_data.filter((item, index) => index < max).map((item, index) => (
        <Img
          key={item.src}
          className={`${prefixCls}__img`}
          src={item.src}
          transparent
          onClick={() => {
            // 2*2时，有一张假占位图，要排除
            if (data.length === 4) {
              if (index === 2) return;

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
          {Utils.isPoster(item.src) && (
            <img src={`${Const.__IMG__}/play${Const.__IMG_DPR__}.png`} alt="" />
          )}
        </Img>
      ))}

      <style jsx global>{`
        .style-597457 {
        }
        .${prefixCls}__img {
          width: 32.66666%;
          height: auto;
          padding-bottom: 32.66666%;
          margin-top: 1%;
          margin-right: 1%;
          background-color: transparent;
        }
        .${prefixCls}__img:nth-of-type(1) {
          margin-top: 0 !important;
        }
        .${prefixCls}__img:nth-of-type(2) {
          margin-top: 0 !important;
        }
        .${prefixCls}__img:nth-of-type(3) {
          margin-top: 0 !important;
        }
        .${prefixCls}__img:nth-of-type(3n) {
          margin-right: 0 !important;
        }
      `}</style>
      <style jsx>{`
        .style-597457 {
        }
        img {
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

export default _Imgs;
