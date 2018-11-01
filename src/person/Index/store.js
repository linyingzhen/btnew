/**
 * const prefixCls = 'style-554348';
 * const images = '/static/images/src/person/Index';
 * @Author: cwz0525
 * @Date: 2018-07-16 12:12:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-31 11:37:32
 * @Path m.benting.com.cn /src/person/Index/store.js
 */
import { observable } from 'mobx';
import Const from '@const';
import common from '@stores/commonV2';
import G from '@stores/g';

export default class store extends common {
  @observable
  state = this.initState({
    // 提醒数
    messageCount: G.getState('messageCount'),

    // 用户信息
    userInfo: G.toJS('userInfo'),

    // 获取发现,帖子,关注,粉丝...数量
    count: Const.__EMPTY__
  });

  fetch = {
    config: {
      static: ['messageCount', 'userInfo'],
      one: ['count']
    },

    // 提醒数
    messageCount: async () => {
      const res = G.fetchMessageCount();

      this.setState(await res, 'messageCount');

      return res;
    },

    // 用户信息
    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    // 获取发现,帖子,关注,粉丝...数量
    count: () => this.fetchThenSetState('get_person_center_count', 'count')
  };
}
