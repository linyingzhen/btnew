/**
 * const prefixCls = 'style-208898';
 * const images = '/static/images/src/person/event/Jianlou';
 * @Author: czy0729
 * @Date: 2018-09-25 10:37:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-25 10:47:03
 * @Path m.benting.com.cn /src/person/event/Jianlou/store.js
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
              dataType: 2,
              panicType: 2
            }
          }
        },
        refresh
      )
  };
}
