/**
 * const prefixCls = 'style-201187';
 * const images = '/static/images/src/index/Sign';
 * @Author: cwz0525
 * @Date: 2018-07-12 16:24:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-17 14:15:50
 * @Path m.benting.com.cn /src/person/wallet/Index/ds.js
 */
import Utils from '@utils';

export const images = Utils.cdn('/static/images/src/person/wallet/Index');
export const menuDS = [
  {
    label: '余额充值',
    icon: 'charge-fill',
    type: 'primary',
    onClick: Utils.goToPay
  },
  {
    label: '余额提现',
    icon: 'wallet-fill',
    href: '/person/wallet/withdraw',
    type: 'success'
  },
  {
    label: '兑换金币',
    icon: 'coin-circle-fill',
    href: '/person/wallet/coin/exchange',
    type: 'warning'
  }
];
export const listDS = [
  {
    label: '我的银行卡',
    icon: 'card-circle-fill',
    href: '/person/wallet/bank',
    type: 'primary'
  },
  {
    label: '资金记录',
    icon: 'transfer-square-fill',
    href: '/person/wallet/flow',
    type: 'success'
  },
  {
    label: '金币记录',
    icon: 'transfer-circle-fill',
    href: '/person/wallet/coin/flow',
    type: 'warning'
  }
];
