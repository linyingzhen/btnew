/**
 * const prefixCls = 'style-903220';
 * const images = '/static/images/components/Flex';
 * @Author: czy0729
 * @Date: 2018-07-11 11:40:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-29 00:09:31
 * @Path m.benting.com.cn /components/Flex/index.js
 */
import React from 'react';
import classNames from 'classnames';
import Link from '../Link';

const prefixCls = 'am-flexbox';

const Flex = props => {
  const {
    direction,
    wrap,
    justify,
    align = 'center',
    alignContent,
    href,
    as,
    login,
    prefetch,
    className,
    children,
    style,
    ...restProps
  } = props;

  const wrapCls = classNames(prefixCls, className, {
    [`${prefixCls}-dir-row`]: direction === 'row',
    [`${prefixCls}-dir-row-reverse`]: direction === 'row-reverse',
    [`${prefixCls}-dir-column`]: direction === 'column',
    [`${prefixCls}-dir-column-reverse`]: direction === 'column-reverse',

    [`${prefixCls}-nowrap`]: wrap === 'nowrap',
    [`${prefixCls}-wrap`]: wrap === 'wrap',
    [`${prefixCls}-wrap-reverse`]: wrap === 'wrap-reverse',

    [`${prefixCls}-justify-start`]: justify === 'start',
    [`${prefixCls}-justify-end`]: justify === 'end',
    [`${prefixCls}-justify-center`]: justify === 'center',
    [`${prefixCls}-justify-between`]: justify === 'between',
    [`${prefixCls}-justify-around`]: justify === 'around',

    [`${prefixCls}-align-start`]: align === 'start',
    [`${prefixCls}-align-center`]: align === 'center',
    [`${prefixCls}-align-end`]: align === 'end',
    [`${prefixCls}-align-baseline`]: align === 'baseline',
    [`${prefixCls}-align-stretch`]: align === 'stretch',

    [`${prefixCls}-align-content-start`]: alignContent === 'start',
    [`${prefixCls}-align-content-end`]: alignContent === 'end',
    [`${prefixCls}-align-content-center`]: alignContent === 'center',
    [`${prefixCls}-align-content-between`]: alignContent === 'between',
    [`${prefixCls}-align-content-around`]: alignContent === 'around',
    [`${prefixCls}-align-content-stretch`]: alignContent === 'stretch'
  });

  if (href) {
    return (
      <Link
        className={wrapCls}
        href={href}
        as={as}
        login={login}
        prefetch={prefetch}
        flex
        style={style}
        {...restProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <div className={wrapCls} style={style} {...restProps}>
      {children}
    </div>
  );
};

Flex.Item = props => {
  const {
    href,
    as,
    login,
    prefetch,
    children,
    className,
    style,
    ...restProps
  } = props;
  const wrapCls = classNames(`${prefixCls}-item`, className);

  if (href) {
    return (
      <Link
        className={wrapCls}
        href={href}
        as={as}
        login={login}
        prefetch={prefetch}
        style={style}
        block
        {...restProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <div className={wrapCls} style={style} {...restProps}>
      {children}
    </div>
  );
};

export default Flex;
