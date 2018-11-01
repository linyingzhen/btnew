/**
 * const prefixCls = 'style-888035';
 * const images = '/static/images/src/event/sign/Index';
 * @Author: czy0729
 * @Date: 2018-10-18 04:09:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-22 10:17:22
 * @Path m.benting.com.cn /src/event/sign/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import G from '@stores/g';

export default class Store extends common {
  @observable
  state = this.initState({
    _week: {
      isGet: false
    },

    _rule: {
      show: false
    },

    userInfo: G.getState('userInfo'),

    // 本周签到记录
    weekSign: Const.__EMPTY__,

    // 今天前十
    today: Const.__EMPTY__
  });

  fetch = {
    config: {
      static: ['userInfo'],
      one: ['today'],
      update: ['weekSign']
    },

    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    // 本周签到记录
    weekSign: () => this.fetchThenSetState('get_sign_week-list', 'weekSign'),

    // 今天前十
    today: () => this.fetchThenSetState('get_sign_today-top-list', 'today')
  };

  do = {
    _sign: false,
    sign: async () => {
      if (this.do._sign) {
        return;
      }
      this.do._sign = true;

      const data = await Api.P('do_sign');
      Utils.light(`签到成功，+${data}积分`);

      const { list } = this.getState('today');
      if (list.length < 10) {
        await this.fetch.today();
      }
      await this.fetch.weekSign();
      await this.fetch.userInfo();

      this.do._sign = false;
    },

    // 领取满签积分
    getWeekPoint: async () => {
      const data = await Api.P('get_sign_week-point');

      this.setState(
        {
          isGet: true
        },
        '_week'
      );
      Utils.light(`恭喜您获得${data}积分`);
    }
  };

  page = {
    showRule: () =>
      this.setState(
        {
          show: true
        },
        '_rule'
      ),

    hideRule: () =>
      this.setState(
        {
          show: false
        },
        '_rule'
      )
  };
}
