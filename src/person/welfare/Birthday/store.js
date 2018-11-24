/**
 * const prefixCls = 'style-129245';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-08 17:30:13
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-08 18:14:31
 * @Path bt_mb_new \src\person\welfare\Birthday\store.js.git
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
      showfull: false,
      id: '0'
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
      const { id } = this.getState('state');
      this.fetchListThenSetState(
        'get_bt-lottery_list',
        'lotteryMoneyList',
        {
          _: {
            limit: Const.__LIMIT__,
            search: {
              getType: 3,
              prizeType: 4,
              grade: id
            }
          }
        },
        refresh
      );
    },
    // 实物券
    lotteryList: refresh => {
      const { id } = this.getState('state');

      this.fetchListThenSetState(
        'get_bt-lottery_list',
        'lotteryList',
        {
          _: {
            limit: Const.__LIMIT__,
            search: {
              getType: 3,
              prizeType: 1,
              grade: id
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
        getType: 3,
        lotteryPrizeId
      });

      Utils.light('领取成功');
      Utils.router.push('/person/goods');
    }
  };
}
