/**
 * const prefixCls = 'style-155380';
 * const images = '/static/images/src/event/cashback/Index';
 * @Author: czy0729
 * @Date: 2018-10-15 16:33:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-16 14:56:13
 * @Path m.benting.com.cn /src/event/cashback/Index/store.js
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
    userInfo: G.getState('userInfo'),

    // 活动信息
    eventDetail: {},

    // 个人活动进度
    progress: Const.__EMPTY__,

    // 服务器时间
    time: {}
  });

  fetch = {
    config: {
      static: ['userInfo'],
      update: ['eventDetail', 'progress', 'time']
    },

    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    // 活动信息
    eventDetail: () => {
      const { id } = this.params.params;

      return this.fetchThenSetState('get_event_detail', 'eventDetail', {
        tbId: id
      });
    },

    // 个人活动进度
    progress: () => {
      const { id } = this.params.params;

      return this.fetchThenSetState(
        'get_event_cash_back_progress',
        'progress',
        {
          perateId: id
        }
      );
    },

    // 服务器时间
    time: () => this.fetchThenSetState('get_time', 'time')
  };

  do = {
    join: async () => {
      const { id } = this.params.params;

      await Api.P('do_event_join', {
        perateId: id
      });

      Utils.light('报名成功');
      this.fetch.eventDetail();
      this.fetch.progress();
    }
  };
}
