/**
 * const prefixCls = 'style-616917';
 * const images = '/static/images/src/index/Nido/_Event';
 * @Author: czy0729
 * @Date: 2018-08-02 14:45:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-21 22:36:13
 * @Path m.benting.com.cn /src/index/Nido/_Event/_Middle.js
 */
import React from 'react';
import { Flex } from '@components';
import Const from '@const';
import Styles from '@styles';
import { images } from '../ds';

const prefixCls = 'style-616917';

const _Middle = () => (
  <Flex className={prefixCls}>
    {[
      {
        title: '精彩视频',
        desc: '精彩视频尽在本汀',
        icon: 'video',
        href: '/video'
      },
      {
        title: '本汀直播',
        desc: '直播有礼，乐开怀',
        icon: 'now',
        href: '/bbs/block?id=95',
        as: '/bbs/block/95'
      }
    ].map(item => (
      <Flex.Item
        key={item.title}
        className={`${prefixCls}__item`}
        href={item.href}
        as={item.as}
      >
        <Flex justify="center" align="start">
          <img
            className="img-icon"
            src={`${images}/${item.icon}${Const.__IMG_DPR__}.png`}
            alt=""
          />
          <div className="ml-8">
            <p className="t-34 l-48 t-title">{item.title}</p>
            <p className="t-24 l-34 t-sub mt-2">{item.desc}</p>
          </div>
        </Flex>
      </Flex.Item>
    ))}

    <style jsx global>{`
      .style-616917 {
        padding: 0.16rem 0;
      }
      .${prefixCls}__item {
        position: relative;
        padding: 0.6rem 0;
        margin-left: 0 !important;
        background: ${Styles.color_theme};
      }
    `}</style>
    <style jsx>{`
      .style-616917 {
      }
      .img-icon {
        width: 0.8rem;
        height: 0.8rem;
      }
    `}</style>
  </Flex>
);

export default _Middle;
