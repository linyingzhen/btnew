/**
 * const prefixCls = 'style-190084';
 * const images = '/static/images/src/shop/Category';
 * @Author: czy0729
 * @Date: 2018-09-29 17:35:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-30 10:20:50
 * @Path m.benting.com.cn /src/shop/Category/store.js
 */
import React from 'react';
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import G from '@stores/g';
import UI from '@stores/ui';
import Menu from '@src/shop/_/Menu';

export default class Store extends common {
  @observable
  state = this.initState({
    shopCategory: G.getState('shopCategory'),
    goods: Const.__EMPTY__
  });

  computed = {
    typeName: () => {
      const { id } = this.params.params;
      const { _list } = this.getState('shopCategory');
      const { typeName } = _list.find(item => item.typeId == id) || {};

      return typeName;
    }
  };

  fetch = {
    config: {
      static: ['shopCategory'],
      one: ['goods']
    },

    shopCategory: async () => {
      const res = G.fetchShopCategory();

      this.setState(await res, 'shopCategory');

      return res;
    },

    goods: refresh => {
      const { id } = this.params.params;

      return this.fetchListThenSetState(
        'get_goods-list',
        'goods',
        {
          _: {
            limit: Const.__LIMIT__,
            search: {
              goodsType: id,
              disable: 0
            }
          }
        },
        refresh
      );
    }
  };

  page = {
    _defaultExpand: '',
    showMenu: async () => {
      const { id } = this.params.params;
      const { _loaded } = this.getState('shopCategory');

      if (!_loaded) {
        await this.fetch.shopCategory();
      }

      if (!this.page._defaultExpand) {
        const { _list } = this.getState('shopCategory');
        const { parId } = _list.find(item => item.typeId == id) || {};
        if (parId != 1) {
          const { typeId } = _list.find(item => item.typeId == parId) || {};

          this.page._defaultExpand = typeId;
        } else {
          this.page._defaultExpand = id;
        }
      }

      UI.showMask({
        children: (
          <Menu
            defaultExpand={this.page._defaultExpand}
            id={id}
            router="replace"
          />
        )
      });
    }
  };
}
