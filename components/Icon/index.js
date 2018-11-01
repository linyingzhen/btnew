/**
 * const prefixCls = 'style-367576';
 * const images = '/static/images/components/Icon';
 * @Author: czy0729
 * @Date: 2018-07-01 18:29:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-25 16:18:06
 * @Path m.benting.com.cn /components/Icon/index.js
 */
import React from 'react';
import classNames from 'classnames';

const prefixCls = 'c-icon';

const Icon = props => {
  const { type, color, className, ...otherProps } = props;

  if (color) {
    return (
      <React.Fragment>
        <svg
          className={classNames(
            'iconfont-color',
            `icon-color-${type}`,
            prefixCls,
            className
          )}
          aria-hidden="true"
          {...otherProps}
        >
          <use xlinkHref={`#icon-color-${type}`} />
        </svg>

        <style jsx>{`
          .c-icon {
          }
          .iconfont-color {
            width: 0.32rem;
            height: 0.32rem;
            vertical-align: top;
            fill: currentColor;
            overflow: hidden;
          }
        `}</style>
      </React.Fragment>
    );
  }

  return (
    <i
      className={classNames('iconfont', `icon-${type}`, prefixCls, className)}
      {...otherProps}
    >
      <style jsx>{`
        .c-icon {
        }
        .iconfont {
          display: inline-block;
          font-style: normal;
          line-height: 1;
          text-align: center;
          text-rendering: optimizeLegibility;
          text-transform: none;
          vertical-align: baseline;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </i>
  );
};

export default Icon;
