/**
 * const prefixCls = 'style-170440';
 * const images = '/static/images/src/shop/Category';
 * @Author: czy0729
 * @Date: 2018-09-29 17:58:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-30 18:33:45
 * @Path m.benting.com.cn /src/shop/Category/_Row.js
 */
import React from 'react';
import { observer } from '@';
import { Link, Img } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-170440';

const _Block = props => {
  const { gid, imgs, title, minPrice, maxPrice } = props;

  return (
    <Link
      className={prefixCls}
      href={`/shop/goods?id=${gid}`}
      as={`/shop/goods/${gid}`}
    >
      <div className="img">
        <Img
          className={`${prefixCls}__img`}
          src={Utils.getAppImgUrl(imgs, 'scale')}
          size="2.4rem"
        />
      </div>
      <div className="info">
        <p className="t-30 l-42 t-c1">{title}</p>
        <p className="t-22 l-32 t-c1 t-b mt-4">
          <span>¥</span>
          <span className="ml-xs">
            {minPrice === maxPrice ? minPrice : `${minPrice} - ${maxPrice}`}
          </span>
        </p>
      </div>

      <style jsx global>{`
        .style-170440 {
          display: inline-block;
          vertical-align: top;
          width: 48%;
        }
        .${prefixCls}:nth-of-type(2n) {
          margin-left: 4%;
        }
        .${prefixCls}:nth-of-type(n + 3) {
          margin-top: 0.16rem;
        }
        .${prefixCls}__img {
          ${Styles._absolute};
        }
      `}</style>
      <style jsx>{`
        .style-170440 {
        }
        .img {
          position: relative;
          width: 100%;
          padding-bottom: 100%;
          background: ${Styles.color_inner};
        }
        .info {
          padding: 0.16rem;
        }
        p {
          white-space: initial;
        }
      `}</style>
    </Link>
  );
};

export default observer(_Block);
