/**
 * const prefixCls = 'style-123900';
 * const images = '/static/images/src/index/Sign';
 * @Author: cwz0525
 * @Date: 2018-07-02 15:00:02
 * @Last Modified by: cwz0525
 * @Last Modified time: 2018-08-31 09:40:51
 * @Path m.benting.com.cn /src/index/Sign/store.js
 */

import { observable } from 'mobx';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import common from '@stores/commonV2';
import G from '@stores/g';

export default class store extends common {
  @observable
  state = this.initState({
    userInfo: G.toJS('userInfo'),
    weekSign: Const.__EMPTY__,
    today: Const.__EMPTY__
  });

  fetch = {
    config: {
      update: ['userInfo', 'weekSign', 'todayList']
    },
    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');
      return res;
    },
    weekSign: () =>
      this.fetchThenSetState('get_sign_week-list', 'weekSign'),

    todayList: () =>
      this.fetchThenSetState('get_sign_today-top-list', 'today')
  };
  do = {
    sign: async () => {
      const res = Api.P('do_sign');
      const data = await res;

      Utils.light(`签到成功，+${data}积分`);
      this.fetch.userInfo();
      this.fetch.todayList();
      this.fetch.weekSign();
    },

    getPoint: async () => {
      const data = await Api.P('get_sign_week-point');
      Utils.light(`恭喜您领取到,${data}积分`);
    }
  };
}
