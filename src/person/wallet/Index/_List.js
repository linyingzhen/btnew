/**
 * const prefixCls = 'style-685489';
 * const images = '/static/images/src/index/Sign';
 * @Author: cwz0525
 * @Date: 2018-07-12 16:24:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-12 18:45:16
 * @Path m.benting.com.cn /src/person/wallet/Index/_List.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { Icon, List } from '@components';
import { listDS } from './ds';

const prefixCls = 'style-685489';

const _List = ({ className }) => (
  <List className={classNames(prefixCls, className)}>
    {listDS.map(item => (
      <List.Item
        key={item.label}
        thumb={
          <Icon
            className={`t-${item.type} t-32`}
            type={item.icon}
            style={{
              minWidth: '0.32rem'
            }}
          />
        }
        arrow="horizontal"
        href={item.href}
      >
        <p className="t-30 l-42 t-title">{item.label}</p>
      </List.Item>
    ))}
  </List>
);

export default observer(_List);
