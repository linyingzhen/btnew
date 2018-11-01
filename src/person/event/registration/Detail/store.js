/**
 * const prefixCls = 'style-802372';
 * const images = '/static/images/src/person/event/registration/Detail';
 * @Author: czy0729
 * @Date: 2018-10-17 09:22:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-17 10:01:28
 * @Path m.benting.com.cn /src/person/event/registration/Detail/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';

export default class Store extends common {
  @observable
  state = this.initState({
    // 报名
    registrationDetail: {}
  });

  fetch = {
    config: {
      update: ['registrationDetail']
    },

    // 报名信息
    registrationDetail: async () => {
      const { id } = this.params.params;

      return this.fetchThenSetState(
        'get_registration_record-detail',
        'registrationDetail',
        {
          registration_id: id
        }
      );
    }
  };
}
