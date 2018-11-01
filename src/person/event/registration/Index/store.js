/**
 * const prefixCls = 'style-199284';
 * const images = '/static/images/src/person/event/registration/Index';
 * @Author: czy0729
 * @Date: 2018-10-16 17:58:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-16 18:01:39
 * @Path m.benting.com.cn /src/person/event/registration/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';

export default class Store extends common {
  @observable
  state = this.initState({
    registration: Const.__EMPTY__
  });

  fetch = {
    config: {
      update: ['registration']
    },

    // 活动记录
    registration: refresh =>
      this.fetchListThenSetState(
        'get_registration_records',
        'registration',
        {},
        refresh
      )
  };

  do = {
    cancel: async id => {
      await Api.P('do_registration_cancel', {
        registration_id: id
      });

      Utils.light('取消报名成功');
      this.fetch.registration(true);
    }
  };
}
