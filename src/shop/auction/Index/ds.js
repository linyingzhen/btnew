/**
 * const prefixCls = 'style-129711';
 * const images = '/static/images/src/shop/auction/Index';
 * @Author: czy0729
 * @Date: 2018-09-10 18:34:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-14 18:41:55
 * @Path m.benting.com.cn /src/shop/auction/Index/ds.js
 */
import Utils from '@utils';

export const images = Utils.cdn('/static/images/src/shop/auction/Index');
export const tabsDS = [{ title: '金币' }, { title: '积分' }];
export const showStateDS = [
  {
    label: '预告中',
    value: '1'
  },
  {
    label: '进行中',
    value: '2'
  },
  {
    label: '已结束',
    value: '3'
  }
];
export const auctionTypeDS = [
  {
    label: '金币',
    value: '1'
  },
  {
    label: '积分',
    value: '2'
  }
];
export const appTypeDS = [
  {
    label: '本汀积分',
    value: '1'
  },
  {
    label: '灵动积分',
    value: '2'
  }
];
export const filter = {
  list: {
    appType: 1,
    auctionId: 1,
    auctionType: 1,
    beginTime: 1,
    currentNum: 1,
    currentPrice: 1,
    endTime: 1,
    goodsImg: 1,
    nowTime: 1,
    showState: 1,
    title: 1
  }
};
