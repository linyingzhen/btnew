/**
 * const prefixCls = 'style-155787';
 * const images = '/static/images/src/school/Article';
 * @Author: czy0729
 * @Date: 2018-09-07 16:47:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-07 18:20:15
 * @Path m.benting.com.cn /src/school/Article/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Link } from '@components';
import Styles from '@styles';

const prefixCls = 'style-155787';

const Nav = props => {
  const { data = [], activeIndex, className } = props;

  return (
    <Flex className={classNames(prefixCls, className)} wrap="wrap">
      {data.map((item, index) => (
        <Link
          key={item.label}
          className={classNames(`${prefixCls}__item t-c`, {
            [`${prefixCls}__item-active`]: activeIndex
              ? activeIndex === item.value
              : index === 0,
            't-sub': !(activeIndex ? activeIndex === item.value : index === 0)
          })}
          href={item.href}
          as={item.as}
          replace={item.replace}
        >
          {item.label}
        </Link>
      ))}

      <style jsx global>{`
        .style-155787 {
          padding: ${Styles.wind};
          background: ${Styles.color_theme};
        }
        .${prefixCls}__item {
          display: inline-block;
          width: 24%;
          padding: 0.12rem 0.16rem;
          margin-right: 1.33333%;
        }
        .${prefixCls}__item:nth-of-type(4n) {
          margin-right: 0;
        }
        .${prefixCls}__item:nth-of-type(n + 5) {
          margin-top: 0.16rem;
        }
        .${prefixCls}__item-active {
          color: #fff;
          background: ${Styles.color_main};
          border-radius: 0.04rem;
        }
      `}</style>
    </Flex>
  );
};

export default observer(Nav);
