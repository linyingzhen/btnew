/**
 * const prefixCls = 'style-169198';
 * const images = '/static/images/src/person/order/Index';
 * @Author: lyz0720
 * @Date: 2018-10-23 10:15:08
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-10-25 00:21:08
 * @Path bt_mb_new /src/person/order/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';

export default class Store extends common {
  @observable
  state = this.initState({
    orders: Const.__EMPTY__
  });

  fetch = {
    config: {
      update: ['orders']
    },

    orders: () => this.fetchListThenSetState('get_consumer_list', 'orders')
  };
}
