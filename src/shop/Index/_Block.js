/**
 * const prefixCls = 'style-126124';
 * const images = '/static/images/src/shop/Index';
 * @Author: czy0729
 * @Date: 2018-09-29 10:14:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-26 00:49:41
 * @Path m.benting.com.cn /src/shop/Index/_Block.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { Link, Img } from '@components';
import { Header } from '@_';
import Styles from '@styles';

const prefixCls = 'style-126124';

const _Block = props => {
  const { className, title, data, href, as } = props;

  return (
    <div className={classNames(prefixCls, className)}>
      <Header
        title={title}
        line={false}
        linkExtra=""
        linkIcon="more-circle"
        href={href}
        as={as}
      />
      <div className="wrap">
        {data.list.map(item => (
          <Link
            key={item.gid}
            className={`${prefixCls}__item`}
            href={`/shop/goods?id=${item.gid}`}
            as={`/shop/goods/${item.gid}`}
          >
            <div className="img">
              <Img
                className={`${prefixCls}__img`}
                src={item.imgs}
                size="2.4rem"
                lazyload
                animate
              />
            </div>
            <div className="info">
              <p className="t-30 l-42 t-c1">{item.title}</p>
              <p className="t-22 l-32 t-c1 t-b mt-4">
                <span>¥</span>
                <span className="ml-xs">
                  {item.minPrice === item.maxPrice
                    ? item.minPrice
                    : `${item.minPrice} - ${item.maxPrice}`}
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>

      <style jsx global>{`
        .style-126124 {
        }
        .${prefixCls}__item {
          display: inline-block;
          vertical-align: top;
          width: 48%;
        }
        .${prefixCls}__item:nth-of-type(2n) {
          margin-left: 4%;
        }
        .${prefixCls}__item:nth-of-type(n + 3) {
          margin-top: 0.16rem;
        }
        .${prefixCls}__img {
          ${Styles._absolute};
        }
      `}</style>
      <style jsx>{`
        .style-126124 {
          background: ${Styles.color_theme};
        }
        .wrap {
          min-height: 4.38rem;
          padding: 0 ${Styles.wind} ${Styles.bottom};
          background: ${Styles.color_theme};
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
    </div>
  );
};

export default observer(_Block);
