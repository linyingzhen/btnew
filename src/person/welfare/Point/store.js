/**
 * const prefixCls = 'style-641940';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-09 15:55:04
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-09 16:37:25
 * @Path bt_mb_new \src\person\welfare\Point\store.js.git
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import G from '@stores/g';
import Api from '@api';
import Utils from '@utils';

export default class Store extends common {
  @observable
  state = this.initState({
    state: {
      showfull: false
    },

    // 用户信息
    userInfo: G.toJS('userInfo'),

    // 现金券
    lotteryMoneyList: Const.__EMPTY__,

    // 实物券
    lotteryList: Const.__EMPTY__
  });

  fetch = {
    config: {
      static: ['userInfo'],
      update: ['lotteryMoneyList', 'lotteryList']
    },
    // 用户信息
    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },
    // 现金券
    lotteryMoneyList: refresh => {
      this.fetchListThenSetState(
        'get_bt-lottery_list',
        'lotteryMoneyList',
        {
          _: {
            limit: Const.__LIMIT__,
            order: {
              grade: 'asc'
            },
            search: {
              getType: 5,
              prizeType: 4
            }
          }
        },
        refresh
      );
    },
    // 实物券
    lotteryList: refresh => {
      this.fetchListThenSetState(
        'get_bt-lottery_list',
        'lotteryList',
        {
          _: {
            limit: Const.__LIMIT__,
            order: {
              grade: 'asc'
            },
            search: {
              getType: 5,
              prizeType: 1
            }
          }
        },
        refresh
      );
    }
  };

  do = {
    doGet: async lotteryPrizeId => {
      await Api.P('do_bt-lottery_get-batch', {
        getType: 5,
        lotteryPrizeId
      });

      Utils.light('兑换成功');
      Utils.router.push('/person/goods');
    }
  };
}
