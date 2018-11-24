/**
 * const prefixCls = 'style-319484';
 * const images = '/static/images/src/shop/Index';
 * @Author: czy0729
 * @Date: 2018-09-28 17:53:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-19 09:34:29
 * @Path m.benting.com.cn /src/shop/Index/store.js
 */
import React from 'react';
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import Utils from '@utils';
import G from '@stores/g';
import UI from '@stores/ui';
import Menu from '@src/shop/_/Menu';
import { filter, categoryDS } from './ds';

export default class Store extends common {
  config = {
    cache: ['carousel', 'new', 'yugan']
  };

  @observable
  state = this.initState({
    shopCategory: G.getState('shopCategory'),
    carousel: Const.__EMPTY__,
    new: Const.__EMPTY__,
    yugan: Const.__EMPTY__,
    yuxian: Const.__EMPTY__,
    yupiao: Const.__EMPTY__,
    yuer: Const.__EMPTY__,
    zhuangbei: Const.__EMPTY__,
    peijian: Const.__EMPTY__,
    fushi: Const.__EMPTY__
  });

  fetch = {
    config: {
      one: ['shopCategory', 'carousel', 'new', 'yugan']
    },

    // 商城分类
    shopCategory: async () => {
      const res = G.fetchShopCategory();

      this.setState(await res, 'shopCategory');

      return res;
    },

    carousel: () =>
      this.fetchThenSetState('get_carousel_list', 'carousel', {
        imgType: 42,
        _filter: filter.carousel
      }),

    // 新品
    new: () =>
      this.fetchThenSetState('get_goods-list', 'new', {
        _: {
          limit: 4,
          search: {
            goodsType: Utils.getValue(categoryDS, '新品'),
            disable: 0
          }
        },
        _filter: filter.new
      }),

    // 鱼竿
    yugan: () =>
      this.fetchThenSetState('get_goods-list', 'yugan', {
        _: {
          limit: 4,
          search: {
            goodsType: Utils.getValue(categoryDS, '鱼竿'),
            disable: 0
          }
        }
      }),

    // 鱼线
    yuxian: () =>
      this.fetchThenSetState('get_goods-list', 'yuxian', {
        _: {
          limit: 4,
          search: {
            goodsType: Utils.getValue(categoryDS, '鱼线'),
            disable: 0
          }
        }
      }),

    // 鱼漂
    yupiao: () =>
      this.fetchThenSetState('get_goods-list', 'yupiao', {
        _: {
          limit: 4,
          search: {
            goodsType: Utils.getValue(categoryDS, '鱼漂'),
            disable: 0
          }
        }
      }),

    // 鱼饵
    yuer: () =>
      this.fetchThenSetState('get_goods-list', 'yuer', {
        _: {
          limit: 4,
          search: {
            goodsType: Utils.getValue(categoryDS, '鱼饵'),
            disable: 0
          }
        }
      }),

    // 装备
    zhuangbei: () =>
      this.fetchThenSetState('get_goods-list', 'zhuangbei', {
        _: {
          limit: 4,
          search: {
            goodsType: Utils.getValue(categoryDS, '装备'),
            disable: 0
          }
        }
      }),

    // 配件
    peijian: () =>
      this.fetchThenSetState('get_goods-list', 'peijian', {
        _: {
          limit: 4,
          search: {
            goodsType: Utils.getValue(categoryDS, '配件'),
            disable: 0
          }
        }
      }),

    // 服饰
    fushi: () =>
      this.fetchThenSetState('get_goods-list', 'fushi', {
        _: {
          limit: 4,
          search: {
            goodsType: Utils.getValue(categoryDS, '服饰'),
            disable: 0
          }
        }
      }),

    lazy: {
      yuxian: () => {
        const { _loaded } = this.getState('yuxian');

        if (!_loaded) {
          this.fetch.yuxian();
        }
      },

      yupiao: () => {
        const { _loaded } = this.getState('yupiao');

        if (!_loaded) {
          this.fetch.yupiao();
        }
      },

      yuer: () => {
        const { _loaded } = this.getState('yuer');

        if (!_loaded) {
          this.fetch.yuer();
        }
      },

      zhuangbei: () => {
        const { _loaded } = this.getState('zhuangbei');

        if (!_loaded) {
          this.fetch.zhuangbei();
        }
      },

      peijian: () => {
        const { _loaded } = this.getState('peijian');

        if (!_loaded) {
          this.fetch.peijian();
        }
      },

      fushi: () => {
        const { _loaded } = this.getState('fushi');

        if (!_loaded) {
          this.fetch.fushi();
        }
      }
    }
  };

  page = {
    showMenu: async () => {
      const { _loaded } = this.getState('shopCategory');

      if (!_loaded) {
        await this.fetch.shopCategory();
      }

      UI.showMask({
        children: <Menu />
      });
    }
  };
}
