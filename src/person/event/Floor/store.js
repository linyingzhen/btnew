/**
 * const prefixCls = 'style-144443';
 * const images = '/static/images/src/person/event/Floor';
 * @Author: czy0729
 * @Date: 2018-09-27 14:22:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-27 14:28:27
 * @Path m.benting.com.cn /src/person/event/Floor/store.js
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
      this.fetchListThenSetState('get_my_floor_list', 'list', {}, refresh)
  };
}
