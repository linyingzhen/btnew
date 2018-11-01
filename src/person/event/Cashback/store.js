/**
 * const prefixCls = 'style-526119';
 * const images = '/static/images/src/person/event/Cashback';
 * @Author: czy0729
 * @Date: 2018-10-15 11:57:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-17 10:07:56
 * @Path m.benting.com.cn /src/person/event/Cashback/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';

export default class Store extends common {
  @observable
  state = this.initState({
    // 粉丝福利
    eventList: Const.__EMPTY__
  });

  fetch = {
    config: {
      update: ['eventList']
    },

    // 粉丝福利
    eventList: refresh =>
      this.fetchListThenSetState(
        'get_person-event_list',
        'eventList',
        {
          _: {
            limit: Const.__LIMIT__,
            order: {
              perateId: 'desc'
            }
          }
        },
        refresh
      )
  };
}
