/**
 * const prefixCls = 'style-941659';
 * const images = '/static/images/src/shop/Goods';
 * @Author: czy0729
 * @Date: 2018-09-30 11:00:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-01 10:00:55
 * @Path m.benting.com.cn /src/shop/Goods/store.js
 */
import React from 'react';
import { observable } from 'mobx';
import common from '@stores/commonV2';
import G from '@stores/g';
import UI from '@stores/ui';
import Menu from '@src/shop/_/Menu';

export default class Store extends common {
  @observable
  state = this.initState({
    _imgView: {
      show: false,
      index: 0
    },

    _spec: {
      index: '',
      spec: '',
      size: []
    },

    shopCategory: G.getState('shopCategory'),

    detail: {}
  });

  fetch = {
    config: {
      static: ['shopCategory'],
      one: ['detail']
    },

    shopCategory: async () => {
      const res = G.fetchShopCategory();

      this.setState(await res, 'shopCategory');

      return res;
    },

    detail: async () => {
      const { id } = this.params.params;

      const res = this.fetchThenSetState('get_recommend-details', 'detail', {
        gid: id
      });

      await res;
      this.page.computedSpec();

      return res;
    }
  };

  page = {
    showImgView: index =>
      this.setState(
        {
          show: true,
          index
        },
        '_imgView'
      ),

    hideImgView: () =>
      this.setState(
        {
          show: false
        },
        '_imgView'
      ),

    showMenu: async () => {
      const { _loaded } = this.getState('shopCategory');

      if (!_loaded) {
        await this.fetch.shopCategory();
      }

      UI.showMask({
        children: <Menu />
      });
    },

    computedSpec: () => {
      const { size = [] } = this.getState('detail');

      let _size = size;
      let spec = '';
      if (size.length > 1) {
        const prev = size[0].sizeName;
        let sameIndex = 0;

        const loop = (item, index) => {
          if (
            item.sizeName.charAt(sameIndex) === prev.charAt(sameIndex) &&
            size.length === index + 1 &&
            !/[a-zA-Z\d]/.test(item.sizeName.charAt(sameIndex))
          ) {
            sameIndex += 1;
          }
        };

        for (let i = 0; i < prev.length; i += 1) {
          size.forEach(loop);
        }

        _size = size.map(item => ({
          ...item,
          sizeName: item.sizeName.substring(sameIndex, item.length)
        }));
        spec = prev.substring(0, sameIndex);
      }

      this.setState(
        {
          spec,
          size: _size
        },
        '_spec'
      );
    },

    toggleSpec: newIndex => {
      const { index } = this.getState('_spec');

      this.setState(
        {
          index: index === newIndex ? '' : newIndex
        },
        '_spec'
      );
    }
  };
}
