/**
 * const prefixCls = 'style-131196';
 * const images = '/static/images/src/event/cashback/Index';
 * @Author: czy0729
 * @Date: 2018-10-15 16:33:11
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-10-15 16:33:11
 * @Path m.benting.com.cn /src/event/cashback/Index/ds.js
 */
import Utils from '@utils';

export const images = Utils.cdn('/static/images/src/event/Cashback');
export const typeDS = [
  {
    label: '信息提交成功',
    value: '1'
  },
  {
    label: '信息审核通过',
    value: '2'
  },
  {
    label: '信息审核失败',
    value: '3'
  },
  {
    label: '重新提交信息成功',
    value: '4'
  },
  {
    label: '奖金发放成功',
    value: '5'
  },
  {
    label: '奖金发放失败',
    value: '6'
  },
  {
    label: '报名成功',
    value: '7'
  }
];
