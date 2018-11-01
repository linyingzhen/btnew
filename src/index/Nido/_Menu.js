/**
 * const prefixCls = 'style-419025';
 * const images = '/static/images/src/index/Nido';
 * @Author: czy0729
 * @Date: 2018-06-22 18:27:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-26 13:44:17
 * @Path m.benting.com.cn /src/index/Nido/_Menu.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, Icon } from '@components';
import Styles from '@styles';
import { menuDS } from './ds';

const prefixCls = 'style-419025';

const _Menu = (props, { $ }) => {
  const { className } = props;
  const { signCount = '-' } = $.getState('userInfo');

  return (
    <div className={classNames(prefixCls, className)}>
      {menuDS.map(item => (
        <Link
          key={item.label}
          className={`${prefixCls}__item t-c`}
          href={item.href}
          login={item.login}
        >
          <Icon
            type={item.icon}
            color
            style={{
              width: '0.56rem',
              height: '0.56rem'
            }}
          />
          <p className="t-24 l-34 t-sub mt-16">{item.label}</p>
          {item.label === '每日签到' && (
            <p className="p-sign-count t-void t-c">{signCount}</p>
          )}
        </Link>
      ))}

      <style jsx global>{`
        .style-419025 {
          padding: ${Styles.space} ${Styles.wind};
          background: ${Styles.color_theme};
        }
        .${prefixCls}__item {
          display: inline-block;
          position: relative;
          width: 25%;
        }
        .${prefixCls}__item:nth-of-type(n + 5) {
          margin-top: 0.42rem;
        }
      `}</style>
      <style jsx>{`
        .style-419025 {
        }
        .p-sign-count {
          position: absolute;
          top: 0.23rem;
          left: 0;
          right: 0;
          font-size: 0.14rem;
        }
      `}</style>
    </div>
  );
};

_Menu.contextTypes = {
  $: PropTypes.object
};

export default _Menu;
