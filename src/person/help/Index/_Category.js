/**
 * const prefixCls = 'style-173167';
 * const images = '/static/images/src/person/help/Index';
 * @Author: Jun
 * @Date: 2018-07-30 17:44:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 11:20:09
 * @Path m.benting.com.cn /src/person/help/Index/_Category.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Link } from '@components';
import { Header } from '@_';
import Const from '@const';
import Styles from '@styles';
import { images, categoryDS } from './ds';

const prefixCls = 'style-173167';

const Category = ({ className }) => (
  <div className={classNames(prefixCls, className)}>
    <Header title="问题分类" />
    <Flex wrap="wrap">
      {categoryDS.map(item => (
        <Link
          key={item.label}
          className={`${prefixCls}__item t-c`}
          href={item.href}
          as={item.as}
        >
          <img
            className="img-icon"
            src={`${images}/${item.label}${Const.__IMG_DPR__}.png`}
            alt=""
          />
          <p className="p-30 l-42 mt-16">{item.label}</p>
        </Link>
      ))}
    </Flex>

    <style jsx global>{`
      .style-173167 {
      }
      .${prefixCls}__item {
        width: 25%;
        padding-bottom: 0.4rem;
      }
    `}</style>
    <style jsx>{`
      .style-173167 {
        background: ${Styles.color_theme};
      }
      .img-icon {
        width: 0.48rem;
        height: 0.48rem;
      }
    `}</style>
  </div>
);

export default observer(Category);
