/**
 * const prefixCls = 'style-100399';
 * const images = '/static/images/src/person/wallet/withdraw/Index';
 * @Author: czy0729
 * @Date: 2018-09-14 11:58:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-17 15:32:59
 * @Path m.benting.com.cn /src/person/wallet/withdraw/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';
import G from '@stores/g';

export default class Store extends common {
  @observable
  state = this.initState({
    // 银行卡信息
    bankInfo: {},

    // 账号余额
    walletInfo: G.toJS('walletInfo')
  });

  fetch = {
    config: {
      every: ['bankInfo', 'walletInfo']
    },

    // 银行信息
    bankInfo: () => this.fetchThenSetState('get_user_bank_info', 'bankInfo'),

    // 钱包信息
    walletInfo: async () => {
      const res = G.fetchWalletInfo();

      this.setState(await res, 'walletInfo');

      return res;
    }
  };

  do = {
    submit: async (values, form) => {
      const ipt = values.price;

      if ((ipt || 0) < 1) {
        Utils.light('提现金额不得小于一元');
        return;
      }

      await Api.P('do_bt_withdraw', {
        price: ipt
      });

      this.page.reset(form);
      this.fetch.walletInfo();
      Utils.router.push('/person/wallet/withdraw/success');
    }
  };

  page = {
    reset: form => form.resetFields(),

    // 全部划转点击
    onAllClick: form => {
      const { btAmount = 0 } = this.getState('walletInfo');

      form.setFieldsValue({
        price: btAmount
      });
    }
  };
}
