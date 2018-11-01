/**
 * const prefixCls = 'style-213845';
 * const images = '/static/images/src/shop/jianlou/Detail';
 * @Author: czy0729
 * @Date: 2018-09-23 22:05:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-25 09:54:59
 * @Path m.benting.com.cn /src/shop/jianlou/Detail/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';

export default class Store extends common {
  @observable
  state = this.initState({
    _payConfirm: {
      show: false,
      amount: 0,
      addPrice: 0
    },

    _imgView: {
      show: false,
      index: 0
    },

    detail: {},

    record: Const.__EMPTY__
  });

  fetch = {
    config: {
      update: ['detail', 'record']
    },

    detail: () => {
      const { id } = this.params.params;

      return this.fetchThenSetState('get_shop_miaosha-detail', 'detail', {
        panicId: id
      });
    },

    record: refresh => {
      const { id } = this.params.params;

      return this.fetchListThenSetState(
        'get_shop_miaosha-record',
        'record',
        {
          _: {
            limit: Const.__LIMIT__,
            search: {
              panicId: id
            }
          }
        },
        refresh
      );
    }
  };

  do = {
    miaosha: async () => {
      const { panicId } = this.getState('detail');

      const { orderNo } = await Api.P('do_shop_miaosha', { panicId });

      this.page.hidePayConfirm();
      this.fetch.detail();
      this.fetch.record(true);

      Utils.router.push(
        `/pay/result?id=${orderNo}`,
        `/pay/result/${orderNo}`
      );
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

    // 显示消费确认框
    showPayConfirm: () =>
      this.setState(
        {
          show: true
        },
        '_payConfirm'
      ),

    // 隐藏消费确认框
    hidePayConfirm: () =>
      this.setState(
        {
          show: false
        },
        '_payConfirm'
      )
  };
}
