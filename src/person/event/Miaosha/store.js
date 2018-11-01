/**
 * const prefixCls = 'style-151638';
 * const images = '/static/images/src/person/event/Auction';
 * @Author: czy0729
 * @Date: 2018-09-18 09:59:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-21 09:51:12
 * @Path m.benting.com.cn /src/person/event/Auction/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';

export default class Store extends common {
  @observable
  state = this.initState({
    list: Const.__EMPTY__
  });

  fetch = {
    config: {
      update: ['list']
    },

    list: refresh =>
      this.fetchListThenSetState(
        'get_shop_miaosha-my-record',
        'list',
        {
          _: {
            search: {
              state: 1,
              panicType: [1, 3],
              dataType: 2
            }
          }
        },
        refresh
      )
  };
}
