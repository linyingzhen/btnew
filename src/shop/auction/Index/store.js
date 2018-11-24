/**
 * const prefixCls = 'style-156611';
 * const images = '/static/images/src/shop/auction/Index';
 * @Author: czy0729
 * @Date: 2018-09-10 18:12:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-14 18:41:55
 * @Path m.benting.com.cn /src/shop/auction/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import Utils from '@utils';
import { filter } from './ds';

export default class Store extends common {
  @observable
  state = this.initState({
    _affixTabs: {
      page: 0
    },

    // 金币竞拍列表
    coinList: Const.__EMPTY__,

    // 积分竞拍列表
    scoreList: Const.__EMPTY__
  });

  fetch = {
    config: {
      update: ['coinList', 'scoreList']
    },

    // 金币竞拍列表
    coinList: refresh =>
      this.fetchListThenSetState(
        'get_auction_list',
        'coinList',
        {
          _: {
            limit: Const.__LIMIT__,
            order: {
              endTime: 'desc'
            },
            search: {
              auctionType: 1
            }
          },
          _filter: filter.list
        },
        refresh
      ),

    // 积分竞拍列表
    scoreList: refresh =>
      this.fetchListThenSetState(
        'get_auction_list',
        'scoreList',
        {
          _: {
            limit: Const.__LIMIT__,
            order: {
              endTime: 'desc'
            },
            search: {
              auctionType: 2
            }
          },
          _filter: filter.list
        },
        refresh
      ),

    // 服务器时间
    time: () => this.fetchThenSetState('get_time', 'time')
  };

  page = {
    // Tab点击
    onTabClick: (item, index) => {
      this.setState({ page: index }, '_affixTabs');

      Utils.scrollTo(0);
    }
  };

  storeInit() {
    const { id } = this.params.params;

    if (id == 1) {
      this.setState(
        {
          page: id
        },
        '_affixTabs'
      );
    }
  }
}
