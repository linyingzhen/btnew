/**
 * const prefixCls = 'style-191166';
 * const images = '/static/images/src/index/VIP';
 * @Author: cwz0525
 * @Date: 2018-07-16 18:33:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 18:17:01
 * @Path m.benting.com.cn /src/person/Index/_Menu.js
 */
import React from 'react';
import classNames from 'classnames';
import { Link, Icon } from '@components';
import Styles from '@styles';
import { menuDS } from './ds';

const prefixCls = 'style-191166';

const _Menu = props => {
  const { className } = props;

  return (
    <div className={classNames(prefixCls, className)}>
      {menuDS.map((item, index) => (
        <Link
          key={item.label}
          className={classNames(`${prefixCls}__item t-c`, {
            'mt-32': index > 3
          })}
          href={item.href}
        >
          <Icon
            className="t-64"
            type={item.type}
            style={{ color: item.color }}
          />
          <p className="t-24 l-34 t-sub mt-16">{item.label}</p>
        </Link>
      ))}

      <style jsx global>{`
        .style-191166 {
          padding: ${Styles.space} ${Styles.wind};
          background: ${Styles.color_theme};
        }
        .${prefixCls}__item {
          display: inline-block;
          width: 25%;
        }
      `}</style>
    </div>
  );
};

export default _Menu;
