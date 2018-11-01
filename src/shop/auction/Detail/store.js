/**
 * const prefixCls = 'style-458576';
 * const images = '/static/images/src/shop/auction/Detail';
 * @Author: czy0729
 * @Date: 2018-09-11 12:21:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-29 17:27:24
 * @Path m.benting.com.cn /src/shop/auction/Detail/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import G from '@stores/g';

export default class Store extends common {
  @observable
  state = this.initState({
    state: {
      refreshing: false
    },

    _payConfirm: {
      show: false,
      amount: 0,
      addPrice: 0
    },

    _imgView: {
      show: false,
      index: 0
    },

    // 竞拍详情
    detail: {},

    // 竞拍记录
    record: Const.__EMPTY__
  });

  fetch = {
    config: {
      update: ['detail', 'record']
    },

    detail: async () => {
      const { id } = this.params.params;
      const res = this.fetchThenSetState('get_auction_detail', 'detail', {
        auctionId: id
      });

      // 设置最低amount
      const { currentPrice, addPrice } = await res;
      const min = parseInt(currentPrice) + parseInt(addPrice);
      this.setState({ amount: min }, '_payConfirm');

      return res;
    },

    record: refresh => {
      const { id } = this.params.params;

      return this.fetchListThenSetState(
        'get_auction_record-list',
        'record',
        {
          _: {
            limit: Const.__LIMIT__,
            order: {
              auctionTime: 'desc'
            },
            search: {
              auctionId: id
            }
          }
        },
        refresh
      );
    },

    // 刷新竞拍信息
    refresh: async () => {
      const { currentPrice } = this.getState('detail');

      this.setState({
        refreshing: true
      });

      const data = await this.fetch.detail();
      await this.fetch.record(true);

      setTimeout(() => {
        this.setState({
          refreshing: false
        });

        if (data.currentPrice !== currentPrice) {
          Utils.light('当前出价有变动');
        }
      }, 1000);
    }
  };

  do = {
    // 出价
    auction: async () => {
      const { id } = this.params.params;
      const { amount } = this.getState('_payConfirm');

      await Api.P('do_auction', {
        auctionId: id,
        auctionPrice: amount
      });

      this.page.hidePayConfirm();
      this.fetch.detail();
      this.fetch.record(true);
      Utils.light('出价成功');
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
      ),

    onStepperChange: amount =>
      this.setState(
        {
          amount
        },
        '_payConfirm'
      ),

    // 检查出价
    checkAdd: async () => {
      const { id } = this.params.params;
      const { amount } = this.getState('_payConfirm');

      const data = await Api.PP('get_auction_user-add', {
        auctionId: id,
        auctionPrice: amount
      });

      switch (parseInt(data.code)) {
        case 0:
          this.setState({ addPrice: data.data.price }, '_payConfirm');
          this.page.showPayConfirm();
          break;

        case 1:
          Utils.onConfirm('该操作需要登录，前往登录?', () => {
            G.setJump();
            Utils.router.push('/login');
          });
          break;

        case 306:
          G.clearState('tk', '');
          G.setCache();

          Utils.onConfirm('登录信息已过期，前往登录?', () => {
            G.setJump();
            Utils.router.push('/login');
          });
          break;

        default:
          Utils.light('当前出价有变动');
          this.fetch.detail();
          this.fetch.record(true);
          break;
      }
    },

    onEnd: () => {
      setTimeout(() => {
        this.fetch.detail();
        this.fetch.record(true);
      }, 2000);
    }
  };
}
