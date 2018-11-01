/**
 * const prefixCls = 'style-131815';
 * const images = '/static/images/src/person/vip/Index';
 * @Author: czy0729
 * @Date: 2018-10-17 13:58:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-17 22:50:26
 * @Path m.benting.com.cn /src/person/vip/Index/__Menu.js
 */
import React from 'react';
import classNames from 'classnames';
import { Flex } from '@components';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import { images, menuDS } from './ds';

const prefixCls = 'style-131815';

const _Menu = props => {
  const { className } = props;

  return (
    <Flex className={classNames(prefixCls, className)}>
      {menuDS.map(item => (
        <Flex.Item
          key={item.title}
          className="t-c"
          onClick={() => Utils.light(item.desc)}
        >
          <img
            className="img-thumb"
            src={`${images}/${item.thumb}${Const.__IMG_DPR__}.png`}
            alt=""
          />
          <p className="t-24 l-34 mt-16">{item.title}</p>
        </Flex.Item>
      ))}

      <style jsx global>{`
        .style-131815 {
          padding: 0.24rem 0.56rem 0.48rem;
          background: ${Styles.color_theme};
        }
      `}</style>
      <style jsx>{`
        .style-131815 {
        }
        .img-thumb {
          width: 0.56rem;
          height: 0.56rem;
        }
      `}</style>
    </Flex>
  );
};

export default _Menu;
