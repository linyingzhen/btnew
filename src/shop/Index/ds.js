/**
 * const prefixCls = 'style-114425';
 * const images = '/static/images/src/shop/Index';
 * @Author: czy0729
 * @Date: 2018-09-28 18:10:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-19 09:33:07
 * @Path m.benting.com.cn /src/shop/Index/ds.js
 */
import Utils from '@utils';

export const images = Utils.cdn('/static/images/src/shop/Index');
export const categoryDS = [
  {
    label: '新品',
    value: '48'
  },
  {
    label: '鱼竿',
    value: '36'
  },
  {
    label: '鱼线',
    value: '37'
  },
  {
    label: '鱼漂',
    value: '40'
  },
  {
    label: '鱼饵',
    value: '38'
  },
  {
    label: '装备',
    value: '49'
  },
  {
    label: '配件',
    value: '50'
  },
  {
    label: '服饰',
    value: '51'
  }
];
export const filter = {
  carousel: {
    imgId: 1,
    url: 1
  },
  new: {
    gid: 1,
    imgs: 1,
    maxPrice: 1,
    minPrice: 1,
    title: 1
  }
};
