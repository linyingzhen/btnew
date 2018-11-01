/**
 * const prefixCls = 'style-131834';
 * const images = '/static/images';
 * @Author: Jun
 * @Date: 2018-07-25 12:23:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 20:17:40
 * @Path m.benting.com.cn \src\points\Index\ds.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon, Link } from '@components';
import Styles from '@styles';

const prefixCls = 'style-131834';

const Item = props => {
  const { data = [], className } = props;

  return (
    <div className={classNames(prefixCls, className)}>
      {data.map(item => (
        <Link
          key={item.label}
          href={item.href}
          className={`${prefixCls}__item ${prefixCls}__${item.className}`}
          block
        >
          <Flex>
            <Icon
              className={`icon-${item.icon} ${prefixCls}__icon`}
              type={item.icon}
            />
            <Flex.Item className={`${prefixCls}__text`}>
              <h3>{item.label}</h3>
              <p>{item.text}</p>
            </Flex.Item>
            <Flex justify="center" className={`${prefixCls}__go`}>
              GO
            </Flex>
          </Flex>
        </Link>
      ))}

      <style jsx global>{`
        .style-131834 {
          padding: 0 ${Styles.wind_raw * 1.6}rem;
        }
        .${prefixCls}__item {
          padding: 0.4rem 0.48rem;
          border-radius: 1rem;
          margin-top: 0.48rem;
          transition: all 0.15s;
          transform: scale(1);
        }
        .${prefixCls}__item:active {
          transform: scale(0.95);
        }
        .${prefixCls}__icon {
          font-size: 0.8rem !important;
          color: #fff;
        }
        .${prefixCls}__shovel {
          background: linear-gradient(
            90deg,
            rgba(255, 150, 0, 1),
            rgba(255, 108, 0, 1)
          );
          box-shadow: 0 0.1rem 0.3rem rgba(255, 108, 0, 0.5);
        }
        .${prefixCls}__bag {
          background: linear-gradient(
            90deg,
            rgba(0, 195, 255, 1),
            rgba(71, 146, 255, 1)
          );
          box-shadow: 0 0.1rem 0.3rem rgba(71, 146, 255, 0.5);
        }
        .${prefixCls}__app {
          background: linear-gradient(
            90deg,
            rgba(0, 220, 103, 1),
            rgba(0, 184, 127, 1)
          );
          box-shadow: 0 0.1rem 0.3rem rgba(0, 184, 127, 0.5);
        }
        .${prefixCls}__text h3 {
          color: #fff;
          padding-bottom: 0.2rem;
        }
        .${prefixCls}__text p {
          color: #fff;
        }
        .${prefixCls}__go {
          width: 1rem;
          height: 1rem;
          background: #fff;
          border-radius: 50%;
          font-size: ${Styles.t_30};
          font-weight: bold;
        }
        .${prefixCls}__shovel .${prefixCls}__go {
          color: rgba(255, 108, 0, 1);
        }
        .${prefixCls}__bag .${prefixCls}__go {
          color: rgba(71, 146, 255, 1);
        }
        .${prefixCls}__app .${prefixCls}__go {
          color: rgba(0, 184, 127, 1);
        }
      `}</style>
    </div>
  );
};

export default observer(Item);
