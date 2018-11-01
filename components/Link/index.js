/**
 * const prefixCls = 'style-170053';
 * const images = '/static/images/components/Link';
 * @Author: czy0729
 * @Date: 2018-07-03 14:30:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 00:01:03
 * @Path m.benting.com.cn /components/Link/index.js
 */
import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Utils from '@utils';

const _Link = props => {
  const {
    href,
    as,
    block,
    flex,
    login,
    prefetch,
    replace,
    className,
    children,
    ...other
  } = props;
  const cls = classNames(className, {
    inline: !(block || flex),
    block,
    flex
  });

  // 页面需要登录
  let isNeedLogin = false;
  if (login && !Utils.checkLogin()) {
    isNeedLogin = true;
  }

  return (
    <React.Fragment>
      {href && !isNeedLogin ? (
        <Link href={href} as={as} prefetch={prefetch} replace={replace}>
          <a className={cls} {...other} onClick={Utils.router.setPush}>
            {children}
          </a>
        </Link>
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

      <style jsx>{`
        .c-link {
        }
        .inline {
          display: inline-block;
        }
        .block {
          display: block;
        }
        .flex {
          display: flex;
        }
      `}</style>
    </React.Fragment>
  );
};

export default _Link;
