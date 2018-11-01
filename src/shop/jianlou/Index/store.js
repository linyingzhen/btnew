/**
 * const prefixCls = 'style-148175';
 * const images = '/static/images/src/shop/jianlou/Index';
 * @Author: czy0729
 * @Date: 2018-09-23 21:48:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-23 21:53:56
 * @Path m.benting.com.cn /src/shop/jianlou/Index/store.js
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
        'get_shop_miaosha-list',
        'list',
        {
          _: {
            limit: Const.__LIMIT__,
            order: {
              beginTime: 'desc'
            },
            search: {
              dataType: 2,
              panicType: 2
            }
          }
        },
        refresh
      )
  };
}
