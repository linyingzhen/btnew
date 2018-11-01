/**
 * const prefixCls = 'style-225472';
 * const images = '/static/images/src/_/Layout';
 * @Author: czy0729
 * @Date: 2018-07-01 17:48:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-22 23:52:01
 * @Path m.benting.com.cn /src/_/Layout/ds.js
 */
// 滚动到底是否显示
export const fixedBottomMap = {
  '/nido': true,
  '/person': true
};
export const menuDS = [
  {
    icon: 'home-fill',
    label: '首页',
    href: '/nido', // 跳转地址
    includes: ['/nido'] // 包含什么path显示
  },
  {
    icon: 'discovery-fill',
    label: '发现',
    href: '/discovery',
    includes: ['/discovery']
  },
  {
    icon: 'bbs-fill',
    label: '社区',
    href: '/bbs',
    includes: ['/bbs', '/bbs/topic', '/video']
  },
  {
    icon: 'me-fill',
    label: '我的',
    href: '/person',
    includes: ['/person'],
    login: true
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
