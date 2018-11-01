/**
 * const prefixCls = 'style-209553';
 * const images = '/static/images/src/person/vip/Index';
 * @Author: czy0729
 * @Date: 2018-10-17 11:27:38
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-10-17 11:27:38
 * @Path m.benting.com.cn /src/person/vip/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import G from '@stores/g';

export default class store extends common {
  @observable
  state = this.initState({
    userInfo: G.toJS('userInfo')
  });

  fetch = {
    config: {
      static: ['userInfo']
    },

    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    }
  };
}
