/**
 * const prefixCls = 'style-390394';
 * const images = '/static/images/src/shop/auction/Detail';
 * @Author: czy0729
 * @Date: 2018-09-11 14:15:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-15 16:02:11
 * @Path m.benting.com.cn /src/shop/auction/Detail/ds.js
 */
import Utils from '@utils';

export const images = Utils.cdn('/static/images/src/shop/auction/Detail');
export const ruleDS = [
  '第一次出价将支付全部出价，后续出价仅需要补足到出价金额既本次出价与历史出价总额的差价。',
  '在时间完全结束时，出价最高者竞拍成功，获得竞拍物品；竞拍失败的用户在活动结束后金币全额返回到账户中',
  '每次竞拍加价数量不得少于加价幅度',
  '为了体现竞拍的公平性，使所有用户都用充分的时间拍下自己心仪的商品。若用户在结束时间倒计时最后1分钟内参与竞拍，竞拍结束时间将顺延一分钟让其他竞拍者有时间决定是否出价',
  '本活动最终解释权归本汀所有'
];
export const filter = {
  detail: {
    beginTime: 1,
    dataType: 1,
    endTime: 1,
    imglist: 1,
    imgs: 1,
    nowTime: 1,
    panicId: 1,
    panicType: 1,
    perNum: 1,
    property: 1,
    salePrice: 1,
    tag: 1,
    title: 1
  },
  record: {
    createTime: 1,
    faceImg: 1,
    niname: 1,
    userId: 1,
    vip: 1
  }
};
