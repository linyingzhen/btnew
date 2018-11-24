/**
 * const prefixCls = 'style-150204';
 * const images = '/static/images/src/event/sign/History';
 * @Author: czy0729
 * @Date: 2018-10-17 23:59:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-14 09:25:34
 * @Path m.benting.com.cn /src/event/sign/History/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import G from '@stores/g';
import { filter } from './ds';

export default class Store extends common {
  @observable
  state = this.initState({
    userInfo: G.getState('userInfo'),

    // 我的签到记录
    signRecord: Const.__EMPTY__
  });

  fetch = {
    config: {
      static: ['userInfo'],
      update: ['signRecord']
    },

    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    // 我的签到记录
    signRecord: query =>
      this.fetchThenSetState('get_sign_list', 'signRecord', {
        ...query,
        _filter: filter.signRecord
      })
  };

  do = {
    _sign: false,
    sign: async () => {
      if (this.do._sign) {
        return;
      }

      this.do._sign = true;

      await Api.P('do_sign');
      Utils.light('签到成功');

      await this.fetch.userInfo();
      this.do._sign = false;
    }
  };

  page = {
    change: num => this.fetch.signRecord({ num })
  };
}
