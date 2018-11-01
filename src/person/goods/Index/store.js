/**
 * const prefixCls = 'style-110680';
 * const images = '/static/images/src/person/goods/Index';
 * @Author: czy0729
 * @Date: 2018-10-24 17:13:01
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-10-24 17:13:01
 * @Path bt_mb_new /src/person/goods/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';

export default class Store extends common {
  @observable
  state = this.initState({
    myLotteryList: Const.__EMPTY__
  });

  fetch = {
    config: {
      update: ['myLotteryList']
    },

    myLotteryList: () =>
      this.fetchListThenSetState('get_bt-lottery_my-list', 'myLotteryList', {
        _: {
          limit: Const.__LIMIT__,
          order: {
            createTime: 'desc'
          }
        }
      })
  };
}
