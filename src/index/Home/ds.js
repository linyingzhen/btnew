/**
 * const prefixCls = 'style-204082';
 * const images = '/static/images/src/index/Home';
 * @Author: czy0729
 * @Date: 2018-06-20 18:10:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-11 10:15:53
 * @Path m.benting.com.cn \src\index\Home\ds.js
 */
import Utils from '@utils';

export const images = Utils.cdn('/static/images/src/index/Home');
export const menuDS = [
  {
    icon: 'nido',
    label: '灵动社区',
    href: '/nido',
    prefetch: true,
    isHot: true
  },
  {
    icon: 'shop',
    label: '本汀商城',
    href: '/shop'
  },
  {
    icon: 'server',
    label: '售后中心',
    href: '/service'
  },
  {
    icon: 'safe',
    label: '防伪中心',
    href: '/auth'
  },
  {
    icon: 'book',
    label: '垂钓学院',
    href: '/school'
  }
];
export const footerDS = [
  {
    label: '意见反馈',
    icon: 'edit',
    href: '/person/feedback',
    login: true
  },
  {
    label: '疑问帮助',
    icon: 'question-circle',
    href: '/person/help'
  },
  {
    label: '商家加盟',
    icon: 'jiameng'
  },
  {
    label: '商家福利',
    icon: 'gift'
  }
];
export const filter = {
  carousel: {
    imgId: 1,
    url: 1
  },
  newGoods: {
    gid: 1,
    imgs: 1,
    title: 1
  },
  videos: {
    createTime: 1,
    fileinfo: {
      surface: 1,
      path: 1,
      play_time: 1,
      size: 1
    },
    tbId: 1,
    tit: 1,
    userName: 1
  },
  information: {
    createTime: 1,
    introCon: 1,
    postId: 1
  }
};
