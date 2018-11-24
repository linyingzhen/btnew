/**
 * const prefixCls = 'style-554087';
 * const images = '/static/images/src/account/Fans/Index';
 * @Author: czy0729
 * @Date: 2018-10-07 16:38:53
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-06 15:06:16
 * @Path m.benting.com.cn /src/account/Fans/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import G from '@stores/g';

export default class Store extends common {
  @observable
  state = this.initState({
    state: {
      toggleShow: 0
    },
    userInfo: G.getState('userInfo'),
    // 粉丝认证状态
    fansState: {},
    // 粉丝审核状态
    fans: {}
  });

  fetch = {
    config: {
      static: ['userInfo'],
      every: ['fans', 'fansState']
    },

    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },
    // 粉丝认证状态
    fansState: () => {
      this.fetchThenSetState('get_user_fans-state', 'fansState');
    },

    // 粉丝审核状态
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

      this.fetch.fans();
      this.setState(
        {
          toggleShow: 0
        },
        'state'
      );
    },
    showApple: () => {
      this.setState(
        {
          toggleShow: 1
        },
        'state'
      );
    }
  };
}
