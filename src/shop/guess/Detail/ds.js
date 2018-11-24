/**
 * const prefixCls = 'style-833902';
 * const images = '/static/images/src/shop/guess/Detail';
 * @Author: czy0729
 * @Date: 2018-09-26 15:36:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-15 11:38:37
 * @Path m.benting.com.cn /src/shop/guess/Detail/ds.js
 */
import Utils from '@utils';

export const images = Utils.cdn('/static/images/src/shop/guess/Detail');
export const guessTypeDS = [
  {
    label: '积分',
    value: '1'
  },
  {
    label: '金币',
    value: '2'
  }
];
export const dataTypeDS = [
  {
    label: '灵动积分',
    value: '1'
  },
  {
    label: '本汀积分',
    value: '2'
  }
];
export const filter = {
  detail: {
    dataType: 1,
    endTime: 1,
    guessType: 1,
    image: 1,
    key: 1,
    panUrl: 1,
    partNum: 1,
    perPrice: 1,
    rules: 1
  },
  list: {
    createTime: 1,
    face: 1,
    information: 1,
    nickName: 1,
    userId: 1,
    vip: 1
  }
};
