/**
 * const prefixCls = 'style-111400';
 * const images = '/static/images/src/shop/Index';
 * @Author: czy0729
 * @Date: 2018-09-28 18:32:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-19 09:32:20
 * @Path m.benting.com.cn /src/shop/Index/_New.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Link, Img } from '@components';
import { Header } from '@_';
import Utils from '@utils';
import Styles from '@styles';
import { categoryDS } from './ds';

const prefixCls = 'style-111400';

const _New = (props, { $ }) => {
  const { className } = props;
  const { list } = $.getState('new');
  const id = Utils.getValue(categoryDS, '新品');

  return (
    <div className={classNames(prefixCls, className)}>
      <Header
        title="新品"
        line={false}
        linkExtra=""
        linkIcon="more-circle"
        href={`/shop/category?id=${id}`}
        as={`/shop/category/${id}`}
      />
      <div className="wrap tool-wrap-scroll">
        {list.map(({ gid, imgs, title, minPrice, maxPrice }) => (
          <Link
            key={gid}
            className={`${prefixCls}__item`}
            href={`/shop/goods?id=${gid}`}
            as={`/shop/goods/${gid}`}
          >
            <div className="img">
              <Img src={imgs} size="2.4rem" lazyload animate />
            </div>
            <div className="info">
              <p className="t-30 l-42 t-c1">{title}</p>
              <p className="t-22 l-32 t-c1 t-b mt-4">
                <span>¥</span>
                <span className="ml-xs">
                  {minPrice === maxPrice
                    ? minPrice
                    : `${minPrice} - ${maxPrice}`}
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>

      <style jsx global>{`
        .style-111400 {
        }
        .${prefixCls}__item:not(:first-child) {
          width: 2.88rem;
          margin-left: 0.32rem;
        }
      `}</style>
      <style jsx>{`
        .style-111400 {
          background: ${Styles.color_theme};
        }
        .wrap {
          min-height: 4.38rem;
          padding: 0 ${Styles.wind} ${Styles.bottom};
          background: ${Styles.color_theme};
        }
        .img {
          padding: 0.24rem;
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

_New.contextTypes = {
  $: PropTypes.object
};

export default observer(_New);
