/**
 * const prefixCls = 'style-469674';
 * const images = '/static/images/src/index/VIP';
 * @Author: cwz0525
 * @Date: 2018-07-19 16:25:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-17 10:04:47
 * @Path m.benting.com.cn /src/person/event/Index/ds.js
 */
import Utils from '@utils';

export const images = Utils.cdn('/static/images/src/person/event');
export const menuDS = [
  {
    label: '',
    child: [
      {
        label: '粉丝福利',
        thumb: 'liwu',
        href: '/person/event/cashback'
      },
      {
        label: '社区活动',
        thumb: 'qiqiu',
        href: '/person/event/registration'
      }
    ]
  },
  {
    label: '金币专区',
    child: [
      {
        label: '极速秒杀',
        thumb: 'yingbi-2',
        href: '/person/event/miaosha'
      },
      {
        label: '欢乐踩楼',
        thumb: 'louti',
        href: '/person/event/floor'
      },
      {
        label: '金币捡漏',
        thumb: 'yingbi',
        href: '/person/event/jianlou'
      },
      {
        label: '金币竞拍',
        thumb: 'chuizi',
        href: '/person/event/auction'
      },
      {
        label: '金币猜鱼',
        thumb: 'yu',
        href: '/person/event/guess'
      }
    ]
  },
  {
    label: '积分专区',
    child: [
      {
        label: '积分挖宝',
        thumb: 'baoxiang',
        href: '/person/event/wabao'
      },
      {
        label: '积分竞拍',
        thumb: 'chuizi',
        href: '/person/event/auction?type=score'
      },
      {
        label: '积分猜鱼',
        thumb: 'yu',
        href: '/person/event/guess?type=score'
      }
    ]
  }
];
