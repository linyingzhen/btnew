/**
 * const prefixCls = 'style-549353';
 * const images = '/static/images/src/_/Header';
 * @Author: czy0729
 * @Date: 2018-06-24 16:35:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-29 11:39:07
 * @Path m.benting.com.cn /src/_/Header/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { Flex, Icon } from '@components';
import Styles from '@styles';

const prefixCls = 'style-549353';

const Header = props => {
  const {
    title,
    desc,
    href,
    as,
    extra,
    linkExtra = '更多',
    linkIcon = 'right',
    line = true,
    isList,
    className
  } = props;

  let right;
  if (extra) {
    right = extra;
  } else if (href) {
    right = (
      <Flex href={href} as={as}>
        <span className="t-30 l-48 t-sub">{linkExtra}</span>
        <Icon className="t-40 t-sub ml-xs" type={linkIcon} />
      </Flex>
    );
  }

  return (
    <Flex
      className={classNames(prefixCls, className, {
        [`${prefixCls}_line`]: line,
        [`${prefixCls}_is-list`]: isList
      })}
      justify="between"
      align="start"
    >
      <Flex.Item className={`${prefixCls}__title`}>
        <p className="p-title t-36 l-48 t-title">{title}</p>
        {desc && <p className="t-24 l-34 t-sub mt-8">{desc}</p>}
      </Flex.Item>
      {right}

      <style jsx global>{`
        .style-549353 {
          padding: 0.4rem ${Styles.wind};
          background: ${Styles.color_theme};
        }
        .${prefixCls}_line .p-title:before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          width: 0.06rem;
          height: 0.32rem;
          background: ${Styles.color_desc};
          transform: translateY(-50%);
        }
        .${prefixCls}_line p {
          padding-left: 0.22rem;
          font-weight: initial !important;
        }
        .${prefixCls}_is-list {
          padding-bottom: 0.16rem;
        }
      `}</style>
      <style jsx>{`
        .style-549353 {
        }
        .p-title {
          position: relative;
          font-weight: bold;
        }
      `}</style>
    </Flex>
  );
};

export default Header;
