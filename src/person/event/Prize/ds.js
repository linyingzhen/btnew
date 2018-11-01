/**
 * const prefixCls = 'style-163846';
 * const images = '/static/images/src/person/event/Prize';
 * @Author: czy0729
 * @Date: 2018-10-24 14:59:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 16:46:24
 * @Path bt_mb_new /src/person/event/Prize/ds.js
 */
export const orderTypeMap = {
  2: {
    label: '邮费', // 猜鱼之类
    storeKey: '/person/event/guess',
    needPostFee: true
  },
  3: {
    label: '极速秒杀',
    storeKey: '/person/event/miaosha',
    needPostFee: false
  },
  7: {
    label: '金币捡漏',
    storeKey: '/person/event/jianlou',
    needPostFee: false
  },
  11: {
    label: '金币踩楼',
    storeKey: '/person/event/floor',
    needPostFee: true
  },
  12: {
    label: '竞拍', // 金币不要 积分要 需要用payState额外判断
    storeKey: '/person/event/auction',
    needPostFee: true
  },
  200: {
    label: '积分挖宝',
    storeKey: '/person/event/wabao',
    needPostFee: true
  }
};
