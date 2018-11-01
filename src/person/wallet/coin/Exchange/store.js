/**
 * const prefixCls = 'style-191959';
 * const images = '/static/images/src/person/wallet/coin/Exchange';
 * @Author: czy0729
 * @Date: 2018-09-14 16:25:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 23:37:24
 * @Path m.benting.com.cn /src/person/wallet/coin/Exchange/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';
import G from '@stores/g';

export default class Store extends common {
  @observable
  state = this.initState({
    _payConfirm: {
      show: false,
      amount: 0,
      form: null
    },

    // 账号余额
    walletInfo: G.toJS('walletInfo')
  });

  fetch = {
    config: {
      every: ['walletInfo']
    },

    // 钱包信息
    walletInfo: async () => {
      const res = G.fetchWalletInfo();

      this.setState(await res, 'walletInfo');

      return res;
    }
  };

  do = {
    exchange: async () => {
      const { amount } = this.getState('_payConfirm');

      await Api.P('do_wallet_buy-coin', {
        amount
      });

      Utils.light('兑换成功');
      this.page.reset();
      this.fetch.walletInfo();
    }
  };

  page = {
    reset: () => {
      const { form } = this.getState('_payConfirm');

      if (form) {
        form.resetFields();
      }

      this.page.hidePayConfirm();
    },

    // 显示消费确认框
    showPayConfirm: (values, form) =>
      this.setState(
        {
          show: true,
          amount: parseFloat(values.price) / 10,
          form
        },
        '_payConfirm'
      ),

    // 隐藏消费确认框
    hidePayConfirm: () =>
      this.setState(
        {
          show: false,
          amount: 0,
          form: null
        },
        '_payConfirm'
      )
  };
}
