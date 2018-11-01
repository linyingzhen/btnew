/**
 * const prefixCls = 'style-141551';
 * const images = '/static/images/src/discovery/Fish/Category';
 * @Author: czy0729
 * @Date: 2018-08-07 16:13:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-09 12:11:34
 * @Path m.benting.com.cn /src/discovery/Fish/Category/store.js
 */
import { observable } from 'mobx';
import Const from '@const';
import common from '@stores/commonV2';

export default class Store extends common {
  @observable
  state = this.initState({
    // 分类讨论数
    count: {},

    // 分类商品列表
    goods: Const.__EMPTY__
  });

  fetch = {
    config: {
      one: ['goods']
    },

    // 分类讨论数
    count: () =>
      this.fetchThenSetState('get_discovery-fish_category-count', 'count'),

    // 分类商品列表
    goods: refresh => {
      const { id } = this.params.params;

      if (!id) {
        return null;
      }

      return this.fetchListThenSetState(
        'get_shop_only-goods-list',
        'goods',
        {
          _: {
            limit: Const.__LIMIT__,
            search: {
              goodsType: id
            }
          }
        },
        refresh,
        undefined,
        'goodsList'
      );
    }
  };
}
