/**
 * const prefixCls = 'style-554087';
 * const images = '/static/images/src/account/Fans/Index';
 * @Author: czy0729
 * @Date: 2018-10-07 16:38:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-08 09:34:03
 * @Path m.benting.com.cn /src/account/Fans/Index/store.js
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

    // 粉丝认证状态
    fans: {}
  });

  fetch = {
    config: {
      static: ['userInfo'],
      every: ['fans']
    },

    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    // 粉丝认证状态
    fans: () => this.fetchThenSetState('get_fans-prove_list', 'fans')
  };

  do = {
    submit: async values => {
      const fans = this.getState('fans');
      const _values = { ...values };
      delete _values.ww;

      await Api.P(
        fans.orderNo ? 'do_fans-prove_update' : 'do_fans-prove_add',
        _values
      );

      Utils.router.push('/account/fans/success');
      this.fetch.fans();
    }
  };
}
