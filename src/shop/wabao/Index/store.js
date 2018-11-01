/**
 * const prefixCls = 'style-399056';
 * const images = '/static/images/src/shop/wabao/Index';
 * @Author: czy0729
 * @Date: 2018-09-27 16:36:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-27 16:50:05
 * @Path m.benting.com.cn /src/shop/wabao/Index/store.js
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
        'get_indiana_tabs_list',
        'list',
        {
          _: {
            limit: Const.__LIMIT__,
            order: {
              oncebuyId: 'desc'
            },
            search: {
              oncebuyType: 2
            }
          }
        },
        refresh
      )
  };
}
