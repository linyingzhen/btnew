/**
 * const prefixCls = 'style-207031';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-09-25 15:10:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 15:34:47
 * @Path m.benting.com.cn \src\person\event\Coupon\store.js
 */

import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import Utils from '@utils';
import Api from '@api';
import G from '@stores/g';

export default class Store extends common {
  @observable
  state = this.initState({
    _affixTabs: {
      page: 0
    },
    state: {
      show: false,
      title: '',
      text: '',
      _filter: true
    },

    // 用户信息
    userInfo: G.toJS('userInfo'),

    // 优惠卷
    lotteryList: Const.__EMPTY__,

    // vip优惠卷
    viplotteryList: Const.__EMPTY__
  });

  fetch = {
    config: {
      static: [['userInfo', 'userInfo']],
      update: ['fetchLotteryList', 'fetchvipLotteryList']
    },

    // 用户信息
    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    // 优惠卷
    fetchLotteryList: async () => {
      const res = Api.PP('get_lottery_list', {
        lotteryType: 2,
        _: {
          limit: Const.__LIMIT__
        }
      });

      const data = await res;
      if (data.code !== 0) {
        Utils.light(data.err);
        return false;
      }

      this.setState(data.data, 'lotteryList');

      return res;
    },

    // vip优惠卷
    fetchvipLotteryList: async () => {
      const res = Api.PP(
        'get_lottery_list',
        {
          lotteryType: 5,
          _: {
            limit: Const.__LIMIT__
          }
        }
      );

      const data = await res;
      if (data.code !== 0) {
        return false;
      }

      this.setState(data.data, 'viplotteryList');

      return res;
    }
  };

  do = {
    // 获取优惠券
    doGet: async cid => {
      await Api.PP('do_lottery_get-coupon', { cid });

      this.fetch.fetchLotteryList();
      this.page.showModal({
        title: '领取成功',
        text: '领取现金券成功！'
      });
    }
  };

  page = {
    // Tab点击
    onTabClick: (item, index) => {
      this.setState({ page: index }, '_affixTabs');

      Utils.scrollTo(0);
    },

    // 显示获取成功modal
    showModal: value => {
      this.setState({
        ...value,
        show: true
      });
    },

    // 隐藏获取成功modal
    hideModal: () => {
      this.setState({
        show: false
      });
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
