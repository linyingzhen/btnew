/**
 * const prefixCls = 'style-154093';
 * const images = '/static/images/components/List';
 * @Author: czy0729
 * @Date: 2018-07-10 17:33:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-14 14:59:13
 * @Path m.benting.com.cn /components/List/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { List } from 'antd-mobile';
import Link from '../Link';

const prefixCls = 'c-list';

const _List = props => {
  const { className, ...other } = props;

  return (
    <>
      <List className={classNames(prefixCls, className)} {...other} />
    </>
  );
};

const _Item = props => {
  const {
    href,
    as,
    login,
    thumb,
    thumbPosition = 'center',
    wrap = true,
    arrow,
    extra,
    children,
    className,
    ...other
  } = props;

  if (href) {
    return (
      <>
        <div
          className={classNames(
            className,
            `${prefixCls}__item am-list-item am-list-item-middle`,
            {
              [`${prefixCls}__item_thumb-top`]: thumbPosition === 'top'
            }
          )}
          {...other}
        >
          {thumb && <div className="am-list-thumb">{thumb}</div>}
          <Link
            className={classNames('am-list-line', {
              'am-list-line-wrap': wrap
            })}
            href={href}
            as={as}
            login={login}
            flex
          >
            <div className={classNames('am-list-content', className)}>
              {children}
            </div>
            {extra && <div className="am-list-extra">{extra}</div>}
            {arrow && (
              <div className={`am-list-arrow am-list-arrow-${arrow}`} />
            )}
          </Link>
        </div>

        <style jsx global>{`
          .c-list {
          }
          .${prefixCls}__item_thumb-top .am-list-thumb {
            align-self: self-start;
            margin-top: 0.28rem;
          }
        `}</style>
      </>
    );
  }

  return (
    <List.Item
      className={classNames(
        `${prefixCls}__item am-list-item am-list-item-middle`,
        className,
        {
          [`${prefixCls}__item_thumb-top`]: thumbPosition === 'top'
        }
      )}
      thumb={thumb}
      wrap={wrap}
      arrow={arrow}
      extra={extra}
      {...other}
    >
      {children}

      <style jsx global>{`
        .c-list {
        }
        .${prefixCls}__item_thumb-top .am-list-thumb {
          align-self: self-start;
          margin-top: 0.28rem;
        }
      `}</style>
    </List.Item>
  );
};

// 待废弃
const _Link = props => {
  const { href, as, children, className, ...other } = props;

  return (
    <Link
      className="am-list-item am-list-item-middle"
      href={href}
      as={as}
      flex
      {...other}
    >
      <div className="am-list-line">
        <div className={classNames('am-list-content', className)}>
          {children}
        </div>
      </div>
    </Link>
  );
};

_List.Item = _Item;
_List.Item.Brief = List.Item.Brief;
_List.Link = _Link;

export default _List;
