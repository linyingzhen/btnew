/**
 * const prefixCls = 'style-128947';
 * const images = '/static/images/src/person/prize/Index';
 * @Author: lyz0720
 * @Date: 2018-09-21 11:45:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 11:05:01
 * @Path bt_mb_new /src/person/prize/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';

export default class Store extends common {
  @observable
  state = this.initState({
    _affixTabs: {
      page: 0
    },

    // 奖品列表
    prizeList: Const.__EMPTY__,

    // 移除奖品列表
    removePrizeList: Const.__EMPTY__
  });

  fetch = {
    config: {
      update: ['prizeList', 'removePrizeList']
    },

    // 奖品列表
    prizeList: refresh =>
      this.fetchListThenSetState(
        'get_my-prize_list',
        'prizeList',
        {
          _: {
            limit: Const.__LIMIT__,
            search: {
              'prizeType[!]': 0,
              userDel: 0
            }
          }
        },
        refresh
      ),

    // 移除奖品列表
    removePrizeList: refresh =>
      this.fetchListThenSetState(
        'get_my-prize_list',
        'removePrizeList',
        {
          _: {
            limit: Const.__LIMIT__,
            search: {
              'prizeType[!]': 0,
              userDel: 1
            }
          }
        },
        refresh
      )
  };

  page = {
    // Tab点击
    onTabClick: (item, index) => {
      this.setState({ page: index }, '_affixTabs');

      Utils.scrollTo(0);
    },

    // 管理优惠券
    toManager: async (tbId, isRemove) => {
      await Api.PP('do_my-prize_del', {
        tbId,
        del: isRemove ? '1' : '0' // 1删除 0恢复
      });

      Utils.light(isRemove ? '移进回收站成功' : '恢复成功');
      this.fetch.prizeList(true);
      this.fetch.removePrizeList(true);
    }
  };
}
