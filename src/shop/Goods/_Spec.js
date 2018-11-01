/**
 * const prefixCls = 'style-123890';
 * const images = '/static/images/src/shop/Goods';
 * @Author: czy0729
 * @Date: 2018-09-30 14:07:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-30 15:34:34
 * @Path m.benting.com.cn /src/shop/Goods/_Spec.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import Styles from '@styles';

const prefixCls = 'style-123890';

const _Carousel = (props, { $ }) => {
  const { className } = props;
  const { index, size } = $.getState('_spec');
  const { minPrice, maxPrice } = $.getState('detail');

  return (
    <div className={classNames(prefixCls, className)}>
      {index !== '' ? (
        <p className="t-44 l-60 t-b ls-o1">¥ {size[index].price}</p>
      ) : (
        <p className="t-44 l-60 t-b ls-o1">
          ¥ {minPrice === maxPrice ? minPrice : `${minPrice} - ${maxPrice}`}
        </p>
      )}
      <p className="t-24 l-34 mt-56">规格</p>
      <div className="mt-8">
        {size.map((item, idx) => (
          <div
            key={item.sizeId}
            className={classNames('item t-30 l-42 ls-o1', {
              'item-active': index === idx
            })}
            onClick={() => $.page.toggleSpec(idx)}
          >
            {item.sizeName}
          </div>
        ))}
      </div>

      <style jsx>{`
        .style-123890 {
        }
        .item {
          display: inline-block;
          vertical-align: top;
          min-width: 1.12rem;
          padding: 0.2rem 0.12rem;
          margin: 0.16rem 0.16rem 0 0;
          text-align: center;
          border: 0.02rem solid ${Styles.color_border};
          transition: all 0.3s;
        }
        .item-active {
          border-color: ${Styles.color_main};
        }
      `}</style>
    </div>
  );
};

_Carousel.contextTypes = {
  $: PropTypes.object
};

export default observer(_Carousel);
