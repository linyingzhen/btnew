/**
 * const prefixCls = 'style-687483';
 * const images = '/static/images/src/index/Home';
 * @Author: czy0729
 * @Date: 2018-06-21 09:45:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-06 14:31:52
 * @Path m.benting.com.cn \src\index\Home\_Menu.js
 */
import React from 'react';
import classNames from 'classnames';
import { Badge } from 'antd-mobile';
import { Flex, Icon } from '@components';
import Styles from '@styles';
import { menuDS } from './ds';

const prefixCls = 'style-687483';

const _Menu = props => {
  const { className } = props;

  return (
    <Flex className={classNames(prefixCls, className)}>
      {menuDS.map(item => (
        <Flex.Item
          key={item.label}
          className={`${prefixCls}__item`}
          href={item.href}
          prefetch={item.prefetch}
        >
          <Icon className="t-56" type={item.icon} />
          <p className="t-22 l-32 mt-16">{item.label}</p>
          {item.isHot && (
            <Badge
              className={`${prefixCls}__badge`}
              text="活动"
              style={{
                ...Styles._badgeFill,
                height: '0.32rem',
                lineHeight: '0.28rem',
                border: '0.02rem solid #fff',
                borderRadius: '0.16rem'
              }}
            />
          )}
        </Flex.Item>
      ))}

      <style jsx global>{`
        .style-687483 {
          padding: 0.4rem 0.48rem;
          background: ${Styles.color_theme};
        }
        .${prefixCls}__badge {
          position: absolute;
          top: -0.08rem;
          left: 50%;
          margin-left: 0.32rem;
          transform: translateX(-50%);
        }
        .${prefixCls}__item {
          position: relative;
          text-align: center;
        }
      `}</style>
    </Flex>
  );
};

export default _Menu;
