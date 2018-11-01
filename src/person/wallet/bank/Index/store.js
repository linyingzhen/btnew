/**
 * const prefixCls = 'style-273195';
 * const images = '/static/images/src/person/wallet/bank/Index';
 * @Author: czy0729
 * @Date: 2018-09-13 16:08:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-13 17:33:16
 * @Path m.benting.com.cn /src/person/wallet/bank/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';

export default class Store extends common {
  @observable
  state = this.initState({
    bank: {}
  });

  fetch = {
    config: {
      update: ['bank']
    },

    bank: () => this.fetchThenSetState('get_user_bank_info', 'bank')
  };
}
