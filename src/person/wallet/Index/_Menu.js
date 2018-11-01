/**
 * const prefixCls = 'style-145388';
 * const images = '/static/images/src/index/Sign';
 * @Author: cwz0525
 * @Date: 2018-07-12 16:24:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-17 14:16:22
 * @Path m.benting.com.cn /src/person/wallet/Index/_Menu.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon, Link } from '@components';
import Styles from '@styles';
import { menuDS } from './ds';

const prefixCls = 'style-145388';

const _Menu = ({ className }) => (
  <Flex className={classNames(prefixCls, className)} justify="around">
    {menuDS.map(item => (
      <Link
        key={item.label}
        className="t-c"
        href={item.href}
        onClick={item.onClick}
      >
        <Icon className={`t-${item.type} t-52`} type={item.icon} />
        <p className="t-26 l-36 t-sub mt-28">{item.label}</p>
      </Link>
    ))}

    <style jsx global>{`
      .style-145388 {
        padding: 0.48rem ${Styles.wind};
        background: ${Styles.color_theme};
      }
    `}</style>
  </Flex>
);

export default observer(_Menu);
