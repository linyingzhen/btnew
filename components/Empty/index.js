/**
 * const prefixCls = 'style-525486';
 * const images = '/static/images';
 * @Author: czy0729
 * @Date: 2018-06-21 22:54:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-22 17:32:10
 * @Path m.benting.com.cn /components/Empty/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { Flex } from '@components';
import Const from '@const';

const prefixCls = 'c-empty';

const Empty = props => {
  const { className, children = '暂无数据' } = props;

  return (
    <Flex className={classNames(prefixCls, className)} direction="column">
      <img src={`${Const.__IMAGES__}/logo-line.png`} alt="" />
      <p className="t-28 mt-16">{children}</p>

      <style jsx global>{`
        .c-empty {
          padding-top: 0.76rem;
          min-height: 50vw;
        }
      `}</style>
      <style jsx>{`
        .c-empty {
        }
        img {
          height: 1.99rem;
        }
        p {
          color: #757575;
        }
      `}</style>
    </Flex>
  );
};

export default Empty;
