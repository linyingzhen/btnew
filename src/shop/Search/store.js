/**
 * const prefixCls = 'style-111467';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-01 11:22:44
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-01 14:15:23
 * @Path bt_mb_new \src\shop\Search\store.js.git
 */
import React from 'react';
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import G from '@stores/g';
import UI from '@stores/ui';
import Menu from '@src/shop/_/Menu';
import Utils from '@utils';

export default class Store extends common {
  @observable
  state = this.initState({
    state: {
      keywords: '',
      title: ''
    },
    shopCategory: G.getState('shopCategory'),
    goods: { ...Const.__EMPTY__, _loaded: true }
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
      static: ['shopCategory']
      // update: ['goods']
    },

    shopCategory: async () => {
      const res = G.fetchShopCategory();

      this.setState(await res, 'shopCategory');

      return res;
    },

    // 搜索
    goods: refresh => {
      const { keywords } = this.getState('state');
      window.console.log(keywords);

      this.fetchListThenSetState(
        'get_goods-list',
        'goods',
        {
          _: {
            limit: Const.__LIMIT__,
            search: {
              'title[~]': keywords,
              disable: 0
            }
          }
        },
        refresh
      );
    },
    search: () => {
      const { keywords } = this.getState('state');

      if (!keywords) {
        Utils.light('请输入要搜索的商品');
        return false;
      }
      this.fetch.goods(true);
      return true;
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
    },
    // 输入关键字
    keywordsChange: e => {
      const { value } = e.target;
      this.setState({ keywords: value }, 'state');
    }
  };
}
