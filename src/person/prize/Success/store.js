/**
 * const prefixCls = 'style-261122';
 * const images = '/static/images/src/person/prize/Success';
 * @Author: czy0729
 * @Date: 2018-11-07 11:41:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-07 11:42:03
 * @Path bt_mb_new /src/person/prize/Success/store.js.git
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';

export default class Store extends common {
  @observable
  state = this.initState({
    detail: {}
  });

  fetch = {
    config: {
      every: ['detail']
    },

    detail: () => {
      const { id } = this.params.params;

      return this.fetchThenSetState('get_my-prize_detail', 'detail', {
        recordId: id
      });
    }
  };
}
