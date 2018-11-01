/**
 * const prefixCls = 'style-129818';
 * const images = '/static/images/src/shop/wabao/Calculate';
 * @Author: czy0729
 * @Date: 2018-09-28 10:50:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-28 11:26:17
 * @Path m.benting.com.cn /src/shop/wabao/Calculate/store.js
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
      one: ['detail']
    },

    detail: async () => {
      const { id } = this.params.params;

      return this.fetchThenSetState('get_indiana_win_detail', 'detail', {
        oncebuyId: id
      });
    }
  };
}
