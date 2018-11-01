/**
 * const prefixCls = 'style-469674';
 * const images = '/static/images/src/index/VIP';
 * @Author: cwz0525
 * @Date: 2018-07-09 14:31:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-29 15:41:16
 * @Path m.benting.com.cn /src/person/Index/ds.js
 */
import Utils from '@utils';

export const images = Utils.cdn('/static/images/src/person/Index');
export const btLevelDS = [
  {
    label: '初始会员',
    value: '0'
  },
  {
    label: '一星会员',
    value: '1'
  },
  {
    label: '二星会员',
    value: '2'
  },
  {
    label: '三星会员',
    value: '3'
  },
  {
    label: '四星会员',
    value: '4'
  },
  {
    label: '五星会员',
    value: '5'
  },
  {
    label: '黄金会员',
    value: '6'
  },
  {
    label: '铂金会员',
    value: '7'
  },
  {
    label: '钻石会员',
    value: '8'
  },
  {
    label: '至尊会员',
    value: '9'
  }
];
export const fanAuthDS = [
  {
    label: '小咖',
    value: '1'
  },
  {
    label: '大咖',
    value: '2'
  }
];
export const menuDS = [
  {
    label: '活动中心',
    href: '/person/event',
    type: 'event-square-fill',
    color: '#ff6969'
  },
  {
    label: '我的好友',
    href: '/person/friends',
    type: 'friend-square-fill',
    color: '#35e2aa'
  },
  {
    label: '我的订单',
    href: '/person/order',
    type: 'order-square-fill',
    color: '#2e8eff'
  },
  {
    label: '粉丝认证',
    href: '/account/fans',
    type: 'team-square-fill',
    color: '#35e2aa'
  },
  {
    label: '我的发布',
    href: '/person/publish',
    type: 'publish-square-fill',
    color: '#ffab1f'
  },
  {
    label: '我的钱包',
    href: '/person/wallet',
    type: 'cash-square-fill',
    color: '#2e8eff'
  },
  {
    label: '我的优惠券',
    href: '/person/prize',
    type: 'sign-square-fill',
    color: '#ffab1f'
  },
  {
    label: '我的礼单',
    href: '/person/goods',
    type: 'gift-square-fill',
    color: '#ff6969'
  }
];
export const listDS = [
  [
    {
      label: '会员中心',
      href: '/person/vip',
      type: 'vip-fill'
    },
    {
      label: '我的收藏',
      href: '/person/favorites',
      type: 'favor-fill'
    },
    {
      label: '我的售后',
      href: '/person/customer',
      type: 'server-circle-fill'
    },
    {
      label: '地址管理',
      href: '/person/address',
      type: 'address-fill'
    },
    {
      label: '推广邀请',
      href: '/event/share',
      type: 'notice-fill'
    }
  ],
  [
    {
      label: '关于我们',
      href: '/person/about',
      type: 'information-circle-fill'
    },
    {
      label: '帮助反馈中心',
      href: '/person/help',
      type: 'question-square-fill'
    }
  ]
];
