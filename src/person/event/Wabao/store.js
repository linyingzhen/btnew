/**
 * const prefixCls = 'style-818800';
 * const images = '/static/images/src/person/event/Wabao';
 * @Author: czy0729
 * @Date: 2018-09-28 15:55:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-28 15:58:36
 * @Path m.benting.com.cn /src/person/event/Wabao/store.js
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
      this.fetchListThenSetState('get_my_indiana_list', 'list', {}, refresh)
  };
}
