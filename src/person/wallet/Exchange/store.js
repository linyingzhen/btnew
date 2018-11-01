/**
 * const prefixCls = 'style-170362';
 * const images = '/static/images/src/person/wallet/Exchange';
 * @Author: czy0729
 * @Date: 2018-09-14 10:18:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-17 10:16:58
 * @Path m.benting.com.cn /src/person/wallet/Exchange/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';
import G from '@stores/g';

export default class Store extends common {
  @observable
  state = this.initState({
    state: {
      type: 1, // 0本汀->灵动 1灵动->本汀
      ipt: ''
    },

    walletInfo: G.toJS('walletInfo')
  });

  fetch = {
    config: {
      every: ['walletInfo']
    },

    walletInfo: async () => {
      const res = G.fetchWalletInfo();

      this.setState(await res, 'walletInfo');

      return res;
    }
  };

  do = {
    exchange: async () => {
      const { type, ipt = 0 } = this.getState();

      const amount = parseFloat(ipt);
      if (!amount) {
        Utils.light('划转金额必须大于0');
        return;
      }

      await Api.P('do_wallet_exchange', {
        type,
        amount
      });

      Utils.light('划转成功');
      this.fetch.walletInfo();
      this.setState({
        ipt: ''
      });
    }
  };

  page = {
    // 灵动本汀切换
    changeType: () => {
      const { type } = this.getState();

      this.setState({
        type: type === 1 ? 0 : 1,
        ipt: ''
      });
    },

    // 约束自然金额
    prev: '',
    moneyNatural: v => {
      if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
        if (v === '.') {
          return '0.';
        }

        if (!v) {
          return '';
        }

        return this.page.prev;
      }

      this.page.prev = v;

      return v;
    },

    // 输入框变化
    onIptChange: val => {
      const { amount = 0, btAmount = 0 } = this.getState('walletInfo');
      const { type } = this.getState();

      let max = 0;
      if (type === 0) {
        max = parseFloat(btAmount);
      } else {
        max = parseFloat(amount);
      }

      let _amount = this.page.moneyNatural(val);
      if (_amount > max) {
        _amount = max;
      }

      this.setState({
        ipt: _amount
      });
    },

    // 全部划转点击
    onAllClick: () => {
      const { amount = 0, btAmount = 0 } = this.getState('walletInfo');
      const { type } = this.getState();

      let max = 0;
      if (type === 0) {
        max = parseFloat(btAmount);
      } else {
        max = parseFloat(amount);
      }

      this.setState({
        ipt: max
      });
    }
  };
}
