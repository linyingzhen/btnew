/**
 * const prefixCls = 'style-977531';
 * const images = '/static/images/src/event/Index';
 * @Author: czy0729
 * @Date: 2018-10-07 09:23:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-07 11:58:49
 * @Path m.benting.com.cn /src/event/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import G from '@stores/g';

export default class Store extends common {
  @observable
  state = this.initState({
    userInfo: G.getState('userInfo'),

    fansAuth: {},

    event: Const.__EMPTY__
  });

  fetch = {
    config: {
      static: ['userInfo'],
      one: ['event'],
      update: ['fansAuth']
    },

    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    fansAuth: () => this.fetchThenSetState('get_user_fans-state', 'fansAuth'),

    event: () => this.fetchThenSetState('get_event_list', 'event')
  };
}
