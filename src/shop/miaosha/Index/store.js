/**
 * const prefixCls = 'style-116602';
 * const images = '/static/images/src/shop/miaosha/Index';
 * @Author: czy0729
 * @Date: 2018-09-20 15:17:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-14 10:51:46
 * @Path m.benting.com.cn /src/shop/miaosha/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import { filter } from './ds';

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
              dataType: [1, 2],
              panicType: [1, 3]
            }
          },
          _filter: filter.list
        },
        refresh
      )
  };
}
