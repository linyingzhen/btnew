/**
 * const prefixCls = 'style-750325';
 * const images = '/static/images';
 * @Author: Jun
 * @Date: 2018-07-30 17:43:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-10 16:10:44
 * @Path m.benting.com.cn \src\person\Help\Index\ds.js
 */
import Utils from '@utils';

export const images = Utils.cdn('/static/images/src/person/Help');
export const categoryDS = [
  {
    label: '银行卡',
    href: '/person/help/search?id=1',
    as: '/person/help/search/1'
  },
  {
    label: '账号处罚',
    href: '/person/help/search?id=2',
    as: '/person/help/search/2'
  },
  {
    label: '优惠券',
    href: '/person/help/search?id=3',
    as: '/person/help/search/3'
  },
  {
    label: '活动问题',
    href: '/person/help/search?id=4',
    as: '/person/help/search/4'
  },
  {
    label: '等级积分',
    href: '/person/help/search?id=5',
    as: '/person/help/search/5'
  },
  {
    label: 'VIP问题',
    href: '/person/help/search?id=6',
    as: '/person/help/search/6'
  },
  {
    label: '联系客服',
    href: '/person/help/service'
  }
];
