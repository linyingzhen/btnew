/**
 * const prefixCls = 'style-732843';
 * const images = '/static/images/src/person/prize/Info';
 * @Author: czy0729
 * @Date: 2018-10-25 14:33:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-07 11:16:07
 * @Path bt_mb_new /src/person/prize/Info/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';
import G from '@stores/g';

export default class Store extends common {
  @observable
  state = this.initState({
    userInfo: G.getState('userInfo'),

    bank: {},

    detail: {}
  });

  fetch = {
    config: {
      static: ['userInfo'],
      every: ['bank', 'detail']
    },

    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    bank: () => this.fetchThenSetState('get_user_bank_info', 'bank'),

    detail: () => {
      const { id } = this.params.params;

      return this.fetchThenSetState('get_my-prize_detail', 'detail', {
        recordId: id
      });
    }
  };

  do = {
    submit: async values => {
      const { id } = this.params.params;

      await Api.P('do_lottery_submit-coupon-cashback-info', {
        recordId: id,
        ...values
      });

      Utils.light('提交信息成功');
      this.fetch.detail();
    }
  };
}
