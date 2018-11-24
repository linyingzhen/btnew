/**
 * const prefixCls = 'style-225472';
 * const images = '/static/images/src/_/Layout';
 * @Author: czy0729
 * @Date: 2018-07-01 17:48:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-16 17:00:15
 * @Path m.benting.com.cn /src/_/Layout/ds.js
 */
import React from 'react';
import { Icon } from '@components';
import Const from '@const';

// 滚动到底是否显示
export const fixedBottomMap = {
  '/': true,
  '/nido': true,
  '/nido/': true,
  '/person': true,
  '/person/': true
};
export const menuDS = [
  {
    icon: (
      <img
        src={`${Const.__IMG__}/icon-logo-gray${Const.__IMG_DPR__}.png`}
        alt=""
        style={{ width: '0.3rem', height: '0.44rem' }}
      />
    ),
    iconActive: (
      <img
        src={`${Const.__IMG__}/icon-logo${Const.__IMG_DPR__}.png`}
        alt=""
        style={{ width: '0.3rem', height: '0.44rem' }}
      />
    ),
    label: '本汀',
    href: '/', // 跳转地址
    includes: ['/'] // 包含什么path显示
  },
  {
    icon: <Icon className="t-44 t-icon" type="lingdong" />,
    iconActive: (
      <Icon
        type="lingdong"
        color
        style={{ width: '0.44rem', height: '0.44rem' }}
      />
    ),
    label: '灵动',
    href: '/nido',
    includes: ['/nido']
  },
  {
    icon: <Icon className="t-44 t-icon" type="discovery-fill" />,
    iconActive: <Icon className="t-44 t-primary" type="discovery-fill" />,
    label: '发现',
    href: '/discovery',
    includes: ['/discovery']
  },
  {
    icon: <Icon className="t-44 t-icon" type="bbs-fill" />,
    iconActive: <Icon className="t-44 t-primary" type="bbs-fill" />,
    label: '社区',
    href: '/bbs',
    includes: ['/bbs', '/bbs/topic', '/video']
  },
  {
    icon: <Icon className="t-44 t-icon" type="me-fill" />,
    iconActive: <Icon className="t-44 t-primary" type="me-fill" />,
    label: '我的',
    href: '/person',
    includes: ['/person']
  }
];
export const centerMenuDS = [
  {
    icon: 'discovery',
    label: '发现',
    href: '/discovery/post'
  },
  {
    icon: 'bbs',
    label: '帖子',
    href: '/bbs/post'
  },
  {
    icon: 'video',
    label: '视频',
    href: '/video/post'
  },
  {
    icon: 'fish',
    label: '渔获有礼',
    href: '/discovery/fish/post'
  },
  {
    icon: 'redpacket-coin',
    label: '金币红包',
    href: '/discovery/redpacket/coin'
  },
  {
    icon: 'redpacket',
    label: '现金红包',
    href: '/discovery/redpacket/cash'
  }
];
