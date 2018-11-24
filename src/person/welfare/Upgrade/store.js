/**
 * const prefixCls = 'style-156820';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-09 15:09:28
 * @Last Modified by:   lyz0720
 * @Last Modified time: 2018-11-09 15:09:28
 * @Path bt_mb_new \src\person\welfare\Upgrade\store.js.git
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
      id: '1',
      selectedIndex: []
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
              getType: 2,
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
              getType: 2,
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
        getType: 2,
        lotteryPrizeId
      });

      Utils.light('领取成功');
      Utils.router.push('/person/goods');
    },
    doGetBatch: async () => {
      const { selectedIndex } = this.getState('state');

      await Api.P('do_bt-lottery_get-batch', {
        getType: 2,
        lotteryPrizeId: selectedIndex.join(',')
      });

      Utils.light('领取成功');
      Utils.router.push('/person/goods');
    }
  };

  page = {
    toggleItem: index => {
      const { selectedIndex } = this.getState('state');
      const { getNum = 0 } = this.getState('lotteryList');

      let _selectedIndex = [...selectedIndex];

      if (_selectedIndex.includes(index)) {
        _selectedIndex = _selectedIndex.filter(item => item !== index);
      } else if (_selectedIndex.length >= getNum) {
        Utils.light('不能选择更多礼品了');
      } else {
        _selectedIndex.push(index);
      }

      this.setState(
        {
          selectedIndex: [..._selectedIndex]
        },
        'state'
      );
    }
  }
}
