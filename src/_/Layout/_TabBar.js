/**
 * const prefixCls = 'style-332723';
 * const images = '/static/images/src/_/Layout';
 * @Author: czy0729
 * @Date: 2018-06-20 17:21:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 02:48:39
 * @Path m.benting.com.cn \src\_\Layout\_TabBar.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Icon, Link, Flex } from '@components';
import Styles from '@styles';
import BtnCenter from './_BtnCenter';
import { menuDS } from './ds';

const prefixCls = 'style-332723';
const allPaths = [];
menuDS.forEach(item => item.includes.forEach(i => allPaths.push(i)));

const _TabBar = (props, { pathname }) => {
  const hidden = !allPaths.includes(pathname);

  if (hidden) {
    return null;
  }

  return (
    <div className={prefixCls}>
      <Flex justify="around">
        {menuDS.map(item => {
          const isCurrent = item.includes.includes(pathname);

          return (
            <Link
              key={item.label}
              className={`${prefixCls}__item t-c`}
              href={item.href}
              login={item.login}
            >
              <Icon
                className={classNames('t-48', {
                  't-icon': !isCurrent,
                  't-primary': isCurrent
                })}
                type={item.icon}
              />
              <p
                className={classNames('t-22 l-32 t-c mt-4', {
                  't-sub': !isCurrent,
                  't-primary': isCurrent
                })}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </Flex>
      <BtnCenter className={`${prefixCls}__btn-center`} />

      <style jsx global>{`
        .style-332723 {
          position: fixed;
          z-index: ${Styles.z_tabbar};
          bottom: 0;
          width: 100%;
          padding: 0.06rem 0 0.04rem;
          background: ${Styles.color_tab_bar};
          border-top: ${Styles.border};
          transform: translateZ(0);
        }
        .${prefixCls}__item:nth-of-type(3) {
          margin-left: 20%;
        }
        .${prefixCls}__btn-center {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate3d(-50%, 0, 0);
        }
      `}</style>
    </div>
  );
};

_TabBar.contextTypes = {
  pathname: PropTypes.string
};

export default observer(_TabBar);
