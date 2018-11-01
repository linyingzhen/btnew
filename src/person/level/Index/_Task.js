/**
 * const prefixCls = 'style-192846';
 * const images = '/static/images/src/person/level/Index';
 * @Author: czy0729
 * @Date: 2018-10-25 17:20:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-26 17:07:23
 * @Path bt_mb_new /src/person/level/Index/_Task.js
 */
import React from 'react';
import classNames from 'classnames';
import { List, Flex, Button, Icon } from '@components';
import { Header } from '@_';
import Utils from '@utils';
import { taskDS } from './ds';

const prefixCls = 'style-192846';

const _Task = ({ className }) => (
  <div className={classNames(prefixCls, className)}>
    <Header
      title="任务中心"
      line={false}
    />
    <List>
      {taskDS.map(item => (
        <List.Item
          key={item.label}
          thumb={
            <Flex
              className={`${prefixCls}__flex`}
              justify="center"
              style={item.style}
            >
              <Icon className="t-44 t-void" type={item.icon} />
            </Flex>
          }
        >
          <Flex>
            <Flex.Item>
              <p className="t-32 l-44 t-b">{item.label}</p>
              <p className="t-26 l-36 t-sub mt-4">{item.desc}</p>
            </Flex.Item>
            <Button
              className="ml-sm"
              type="primary"
              size="sm"
              ghost
              inline
              radius
              style={{
                width: '1.32rem'
              }}
              onClick={() => Utils.router.push(item.href)}
            >
              {item.btn}
            </Button>
          </Flex>
        </List.Item>
      ))}
    </List>

    <style jsx global>{`
      .style-192846 {
      }
      .${prefixCls}__flex {
        width: 0.8rem;
        height: 0.8rem;
        margin: 0.32rem 0;
        border-radius: 50%;
      }
    `}</style>
  </div>
);

export default _Task;
