/**
 * const prefixCls = 'style-427942';
 * const images = '/static/images/src/shop/guess/Index';
 * @Author: czy0729
 * @Date: 2018-09-25 12:38:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-15 11:32:56
 * @Path m.benting.com.cn /src/shop/guess/Index/store.js
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

    // 金币列表
    coinList: Const.__EMPTY__,

    // 积分列表
    scoreList: Const.__EMPTY__
  });

  fetch = {
    config: {
      update: ['coinList', 'scoreList']
    },

    // 金币列表
    coinList: refresh =>
      this.fetchListThenSetState(
        'get_new_guess-everday_list',
        'coinList',
        {
          _: {
            limit: Const.__LIMIT__,
            order: {
              createTime: 'desc'
            },
            search: {
              guessType: 2
            }
          },
          _filter: filter.list
        },
        refresh
      ),

    // 积分列表
    scoreList: refresh =>
      this.fetchListThenSetState(
        'get_new_guess-everday_list',
        'scoreList',
        {
          _: {
            limit: Const.__LIMIT__,
            order: {
              createTime: 'desc'
            },
            search: {
              guessType: 1
            }
          },
          _filter: filter.list
        },
        refresh
      )
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
