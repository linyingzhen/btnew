/**
 * const prefixCls = 'style-841273';
 * const images = '/static/images/src/school/Index';
 * @Author: czy0729
 * @Date: 2018-09-05 14:26:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-07 18:20:59
 * @Path m.benting.com.cn /src/school/Index/ds.js
 */
import Utils from '@utils';

export const images = Utils.cdn('/static/images/src/school');
export const menuDS = [
  {
    label: '学院推荐',
    value: '',
    type: 'home',
    href: '/school',
    replace: true
  },
  {
    label: '教学专题',
    value: '',
    type: 'tech',
    href: '/school/tech_category'
  },
  {
    label: '本汀产品',
    value: '31',
    type: 'video',
    href: '/school/video?id=31',
    as: '/school/video/31',
    replace: true
  },
  {
    label: '钓鱼实战',
    value: '32',
    type: 'video',
    href: '/school/video?id=32',
    as: '/school/video/32',
    replace: true
  },
  {
    label: '真人秀',
    value: '33',
    type: 'video',
    href: '/school/video?id=33',
    as: '/school/video/33',
    replace: true
  },
  {
    label: '资讯类',
    value: '',
    type: 'article',
    href: '/school/article'
  },
  {
    label: 'MV',
    value: '34',
    type: 'video',
    href: '/school/video?id=34',
    as: '/school/video/34',
    replace: true
  },
  {
    label: '微电影',
    value: '35',
    type: 'video',
    href: '/school/video?id=35',
    as: '/school/video/35',
    replace: true
  }
];
export const articleBlockDS = [
  {
    label: '推荐阅读',
    value: [98, 99, 100, 101]
  },
  {
    label: '基础教学',
    value: '98'
  },
  {
    label: '实战分享',
    value: '99'
  },
  {
    label: '赛事指南',
    value: '100'
  },
  {
    label: '实战论文',
    value: '101'
  }
];
