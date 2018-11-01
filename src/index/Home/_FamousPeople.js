/**
 * const prefixCls = 'style-835107';
 * const images = '/static/images/src/index/Home';
 * @Author: czy0729
 * @Date: 2018-06-21 16:14:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-21 20:43:36
 * @Path bt_mb_new /src/index/Home/_FamousPeople.js
 */
import React from 'react';
import classNames from 'classnames';
import { Flex } from '@components';
import Const from '@const';
import Styles from '@styles';
import { images } from './ds';

const prefixCls = 'style-835107';

const _FamousPeople = ({ className }) => (
  <Flex
    className={classNames(prefixCls, className)}
    justify="center"
    href="/star"
  >
    <div>
      <p className="t-32 l-48 t-title">粉丝名人堂</p>
      <p className="t-24 l-34 t-sub">荣光 · 因您更耀眼！</p>
    </div>
    <img
      className="img-famous ml-54"
      src={`${images}/famous${Const.__IMG_DPR__}.png`}
      alt=""
    />

    <style jsx global>{`
      .style-835107 {
        padding: 0.38rem 0;
        background: ${Styles.color_theme};
      }
    `}</style>
    <style jsx>{`
      .style-835107 {
      }
      .img-famous {
        height: 0.6rem;
      }
    `}</style>
  </Flex>
);

export default _FamousPeople;
