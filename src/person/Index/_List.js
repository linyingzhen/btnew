/**
 * const prefixCls = 'style-157025';
 * const images = '/static/images/src/index/VIP';
 * @Author: cwz0525
 * @Date: 2018-07-17 09:47:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-04 23:38:54
 * @Path m.benting.com.cn /src/person/Index/_List.js
 */
import React from 'react';
import classNames from 'classnames';
import { List, Flex, Icon } from '@components';
import Utils from '@utils';
import { listDS } from './ds';

const prefixCls = 'style-157025';

const _List = props => {
  const { className } = props;

  return (
    <div className={classNames(prefixCls, className)}>
      {listDS.map((item, index) => (
        <List
          /* eslint-disable-next-line */
          key={index}
          className={classNames({
            'mt-d': index > 0
          })}
        >
          {item.map(i => (
            <List.Item
              key={i.label}
              thumb={
                <Icon
                  className="t-32 t-sub"
                  type={i.type}
                  onClick={() => Utils.router.push(i.href)}
                />
              }
              href={i.href}
            >
              <Flex>
                <Flex.Item>
                  <p className="t-30 l-42">{i.label}</p>
                </Flex.Item>
                <Icon className="t-32 t-icon" type="right" />
              </Flex>
            </List.Item>
          ))}
        </List>
      ))}
    </div>
  );
};

export default _List;
