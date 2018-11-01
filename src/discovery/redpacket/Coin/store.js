/**
 * const prefixCls = 'style-151479';
 * const images = '/static/images/src/discovery/redpacket/Coin';
 * @Author: czy0729
 * @Date: 2018-10-22 23:57:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 18:28:55
 * @Path bt_mb_new /src/discovery/redpacket/Coin/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';

export default class Store extends common {
  @observable
  state = this.initState({
    _affixTabs: {
      page: 0
    },

    _payConfirm: {
      show: false,
      amount: 0,
      total: 0,
      title: ''
    },

    state: {
      redPriceType: 1,
      show: false
    }
  });

  do = {
    send: async () => {
      const { redPriceType } = this.getState();
      const { amount, total, title } = this.getState('_payConfirm');

      await Api.P('do_redpacket_send', {
        redPriceType,
        redType: 1,
        amount,
        total,
        title
      });

      Utils.light('发布成功');
      Utils.router.push('/discovery');
      this.page.hidePayConfirm();
    }
  };

  page = {
    // Tab点击
    onTabClick: (item, index) => {
      this.setState({ page: index }, '_affixTabs');

      const { page } = this.getState('_affixTabs');

      this.setState({
        redPriceType: page === 1 ? 2 : 1
      });
    },

    check: async values => {
      const { amount, total, title } = values;
      const { redPriceType } = this.getState();

      // 随机红包单个红包金币不得小于1
      if (redPriceType === 1 && amount / total < 1) {
        Utils.light('单个红包金币不可低于1个');
        return;
      }

      if (redPriceType === 2 && amount * total < 10) {
        Utils.light('红包总金币不可低于10个');
        return;
      }

      this.page.showPayConfirm(amount, total, title);
    },

    showPayConfirm: (amount, total, title) =>
      this.setState(
        {
          show: true,
          amount,
          total,
          title
        },
        '_payConfirm'
      ),

    hidePayConfirm: () =>
      this.setState(
        {
          amount: 0,
          type: '',
          show: false
        },
        '_payConfirm'
      )
  };
}
