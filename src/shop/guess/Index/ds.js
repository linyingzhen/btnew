/**
 * const prefixCls = 'style-138069';
 * const images = '/static/images/src/shop/guess/Index';
 * @Author: czy0729
 * @Date: 2018-09-25 14:54:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-15 11:33:37
 * @Path m.benting.com.cn /src/shop/guess/Index/ds.js
 */
import Utils from '@utils';

export const images = Utils.cdn('/static/images/src/shop/guess/Index');
export const tabsDS = [{ title: '金币' }, { title: '积分' }];
export const filter = {
  list: {
    endTime: 1,
    goods: 1,
    guessId: 1,
    image: 1,
    startTime: 1,
    totalNum: 1
  }
};
