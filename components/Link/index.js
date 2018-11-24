/**
 * const prefixCls = 'style-170053';
 * const images = '/static/images/components/Link';
 * @Author: czy0729
 * @Date: 2018-07-03 14:30:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-12 10:45:53
 * @Path m.benting.com.cn /components/Link/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NextLink from 'next/link';
import Utils from '@utils';

const prefixCls = 'c-link';

const Link = props => {
  const {
    href, // href
    as, // actual path (including the query) shows in the browser
    prefetch, // allows you to prefetch pages
    replace, // 是否替换路由
    block, // 是否块
    flex, // 是否flex布局
    login, // 是否需要登录
    className,
    children,
    ...other
  } = props;

  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}_block`]: block,
      [`${prefixCls}_flex`]: flex
    },
    className
  );

  // 页面需要登录
  let isNeedLogin = false;
  if (login && !Utils.checkLogin()) {
    isNeedLogin = true;
  }

  return (
    <React.Fragment>
      {href && !isNeedLogin ? (
        <NextLink href={href} as={as} prefetch={prefetch} replace={replace}>
          <a className={cls} {...other} onClick={Utils.router.setPush}>
            {children}
          </a>
        </NextLink>
      ) : (
        <a
          className={cls}
          onClick={() => {
            if (isNeedLogin) {
              Utils.checkLogin(() => Utils.router.push(href, as));
            } else {
              Utils.u();
            }
          }}
          {...other}
        >
          {children}
        </a>
      )}

      <style jsx global>{`
        .c-link {
          display: inline-block;
        }
        .${prefixCls}_block {
          display: block;
        }
        .${prefixCls}_flex {
          display: flex;
        }
      `}</style>
    </React.Fragment>
  );
};

Link.propTypes = {
  href: PropTypes.string,
  as: PropTypes.string,
  prefetch: PropTypes.bool,
  replace: PropTypes.bool,
  block: PropTypes.bool,
  flex: PropTypes.bool,
  login: PropTypes.bool
};

Link.defaultProps = {
  href: '',
  as: undefined,
  prefetch: false,
  replace: false,
  block: false,
  flex: false,
  login: false
};

export default Link;
