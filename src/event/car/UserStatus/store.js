/**
 * const prefixCls = 'style-202675';
 * const images = '/static/images/src/event/car/UserStatus';
 * @Author: czy0729
 * @Date: 2018-11-09 16:16:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-21 11:29:48
 * @Path bt_mb_new /src/event/car/UserStatus/store.js.git
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import { tid } from '../ds';

export default class Store extends common {
  @observable
  state = this.initState({
    list: Const.__EMPTY__
  });

  fetch = {
    config: {
      update: ['list']
    },

    list: async refresh => {
      const { id = tid, uid } = this.params.params;

      return this.fetchListThenSetState(
        'get_event-car_sign-up-detail',
        'list',
        {
          _: {
            search: {
              tid: id,
              uid
            }
          }
        },
        refresh
      );
    }
  };
}
