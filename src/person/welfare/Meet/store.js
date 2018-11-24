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
      id: '0',
      selectedIndex: [],
      _filter: true
    },

    // 用户信息
    userInfo: G.toJS('userInfo'),

    // 礼品等级信息
    lotteryGradeInfo: Const.__EMPTY__,

    // 商品列表
    lotteryList: Const.__EMPTY__
  });

  fetch = {
    config: {
      static: ['userInfo'],
      one: ['lotteryGradeInfo'],
      update: ['lotteryList']
    },
    // 用户信息
    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },
    // 礼品等级信息
    lotteryGradeInfo: () => {
      this.fetchThenSetState('get_bt-lottery_grade-info', 'lotteryGradeInfo', {
        getType: 4
      });
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
              getType: 4,
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
    doGet: async () => {
      const { selectedIndex } = this.getState('state');

      await Api.P('do_bt-lottery_get-batch', {
        getType: 4,
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
  };
}
