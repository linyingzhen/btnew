/**
 * const prefixCls = 'style-193965';
 * const images = '/static/images/src/person/btlevel/Index';
 * @Author: lyz0720
 * @Date: 2018-10-26 13:47:33
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-11-13 17:27:31
 * @Path bt_mb_new /src/person/btlevel/Index/store.js.git
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Utils from '@utils';
import Const from '@const';
import G from '@stores/g';

export default class Store extends common {
  @observable
  state = this.initState({
    _tabs: {
      active: '用户等级'
    },

    // 用户信息
    userInfo: {},

    // 积分记录列表
    integralList: Const.__EMPTY__
  });

  computed = {
    section: () => {
      const { list, _loaded } = this.getState('integralList');

      if (!_loaded) {
        return [];
      }

      const dateMap = {};
      list.forEach(item => {
        const date = Utils.date('y,m,d', item.createTime);
        const changePoint = item.changePoint || 0;

        if (date in dateMap) {
          dateMap[date] = (
            parseFloat(dateMap[date]) + parseFloat(changePoint)
          ).toFixed(2);
        } else {
          dateMap[date] = parseFloat(changePoint);
        }
      });

      return Object.keys(dateMap).map(item => ({
        title: `${item},${dateMap[item]}`,
        filter: i => Utils.date('y,m,d', i.createTime) === item
      }));
    }
  };

  fetch = {
    config: {
      update: ['fetchUserInfo', 'fetchIntegralRecordList']
    },
    // 用户信息
    fetchUserInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    // 积分记录列表
    fetchIntegralRecordList: refresh => {
      this.fetchListThenSetState(
        'get_my-score_list',
        'integralList',
        {
          _: {
            search: {
              isBT: 1
            }
          }
        },
        refresh
      );
    }
  };

  page = {
    onTabClick: newActive => {
      const { active } = this.getState('_tabs');

      if (active === newActive) {
        return;
      }

      this.setState(
        {
          active: newActive
        },
        '_tabs'
      );
    }
  };
}
