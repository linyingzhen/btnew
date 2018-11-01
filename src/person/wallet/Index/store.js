/**
 * const prefixCls = 'style-245094';
 * const images = '/static/images/src/index/Sign';
 * @Author: cwz0525
 * @Date: 2018-07-11 11:28:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-17 10:17:04
 * @Path m.benting.com.cn /src/person/Wallet/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import G from '@stores/g';

export default class store extends common {
  @observable
  state = this.initState({
    userInfo: G.toJS('userInfo'),
    walletInfo: G.toJS('walletInfo')
  });

  fetch = {
    config: {
      static: ['userInfo'],
      every: ['walletInfo']
    },

    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    walletInfo: async () => {
      const res = G.fetchWalletInfo();

      this.setState(await res, 'walletInfo');

      return res;
    }
  };
}
