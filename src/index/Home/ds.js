/**
 * const prefixCls = 'style-204082';
 * const images = '/static/images/src/index/Home';
 * @Author: czy0729
 * @Date: 2018-06-20 18:10:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-29 00:10:12
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
