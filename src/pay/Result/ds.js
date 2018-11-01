/**
 * const prefixCls = 'style-170673';
 * const images = '/static/images/src/pay/Result';
 * @Author: czy0729
 * @Date: 2018-09-21 18:01:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 15:02:23
 * @Path m.benting.com.cn /src/pay/Result/ds.js
 */
// 支付状态
export const payStateDS = [
  {
    label: '未支付',
    value: '0'
  },
  {
    label: '已支付',
    value: '1'
  },
  {
    label: '支付失败',
    value: '2'
  }
];

// 订单类型
export const orderTypeDS = [
  {
    label: '常规订单',
    value: '0'
  },
  {
    label: '一元夺宝',
    value: '1'
  },
  {
    label: '邮费',
    value: '2'
  },
  {
    label: '极速秒杀',
    value: '3'
  },
  {
    label: '购买VIP',
    value: '4'
  },
  {
    label: '现金红包',
    value: '5'
  },
  {
    label: '金币捡漏',
    value: '7'
  },
  {
    label: '金币秒杀',
    value: '8'
  },
  {
    label: '经销商订单',
    value: '10'
  },
  {
    label: '微信充值',
    value: '50'
  },
  {
    label: '支付宝充值',
    value: '51'
  },
  {
    label: '管理员(后台)充值',
    value: '53'
  },
  {
    label: '提现',
    value: '100'
  },
  {
    label: '奖品、礼品',
    value: '150'
  },
  {
    label: '积分挖宝',
    value: '200'
  },
  {
    label: '其他',
    value: '250'
  }
];

// 支付方式
export const payTypeDS = [
  {
    label: '在线支付',
    value: '0'
  },
  {
    label: '微信支付',
    value: '1'
  },
  {
    label: '余额支付', // 需要结合bt_order另一个字段data_type数据类型：1.灵动 2.本汀 来判断是什么余额
    value: '2'
  },
  {
    label: '支付宝支付',
    value: '3'
  },
  {
    label: '余额支付',
    value: '4'
  },
  {
    label: '金币支付',
    value: '10'
  },
  {
    label: '积分支付',
    value: '20'
  }
];
