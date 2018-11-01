/**
 * const prefixCls = 'style-271905';
 * const images = '/static/images/src/bbs/Index';
 * @Author: czy0729
 * @Date: 2018-08-10 12:40:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-26 00:41:39
 * @Path m.benting.com.cn /src/bbs/Index/_Fish.js
 */
import React from 'react';
import classNames from 'classnames';
import { Img, Link } from '@components';
import { Header } from '@_';
import Styles from '@styles';
import { discoveryFishCategoryDS } from '@ds';
import { images } from '@src/discovery/fish/Category/ds';

const prefixCls = 'style-271905';

const _Fish = props => {
  const { className } = props;

  return (
    <div className={classNames(prefixCls, className)}>
      <Header title="鱼获有礼" href="/discovery/fish/category" />
      <div className="wrap tool-wrap-scroll">
        {discoveryFishCategoryDS.map(item => (
          <Link
            key={item.label}
            className={`${prefixCls}__item`}
            href={`/discovery/fish/category?id=${item.value}`}
            as={`/discovery/fish/category/${item.value}`}
          >
            <Img src={`${images}/${item.label}.jpg`} size="1.68rem" />
            <p className="t-24 l-32 mt-16 t-c">{item.label}</p>
          </Link>
        ))}
      </div>

      <style jsx global>{`
        .style-271905 {
        }
        .${prefixCls}__item {
          display: inline-block;
        }
        .${prefixCls}__item:not(:last-child) {
          margin-right: 0.16rem;
        }
      `}</style>
      <style jsx>{`
        .style-271905 {
          background: ${Styles.color_theme};
        }
        .wrap {
          padding: 0 ${Styles.wind} ${Styles.bottom};
        }
      `}</style>
    </div>
  );
};

export default _Fish;
