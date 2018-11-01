/**
 * const prefixCls = 'style-302493';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-10-23 18:03:22
 * @Last Modified by:   lyz0720
 * @Last Modified time: 2018-10-23 18:03:22
 * @Path bt_mb_new \src\person\goods\Detail\store.js.git
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';

export default class Store extends common {
  @observable
  state = this.initState({
    // 我的物品详情
    myLotteryDetail: {
      rule: ''
    }
  });

  fetch = {
    config: {
      one: ['fetchMyLotteryDetail']
    },
    fetchMyLotteryDetail: () => {
      const { id } = this.getParams().params;

      return this.fetchThenSetState(
        'get_bt-lottery_my-detail',
        'myLotteryDetail',
        {
          recordId: id
        }
      );
    }
  };
}
