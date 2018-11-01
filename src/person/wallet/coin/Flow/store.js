/**
 * const prefixCls = 'style-174393';
 * const images = '/static/images/src/person/wallet/coin/Flow';
 * @Author: czy0729
 * @Date: 2018-09-13 11:56:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 23:39:42
 * @Path m.benting.com.cn /src/person/wallet/coin/Flow/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import Utils from '@utils';

export default class Store extends common {
  @observable
  state = this.initState({
    // 账号余额明细
    list: Const.__EMPTY__
  });

  computed = {
    section: () => {
      const { list, _loaded } = this.getState('list');

      if (!_loaded) {
        return [];
      }

      const dateMap = {};
      list.forEach(item => {
        const date = Utils.date('y,m,d', item.createTime);
        const changeAmount = item.changeAmount || 0;

        if (date in dateMap) {
          dateMap[date] = (
            parseFloat(dateMap[date]) + parseFloat(changeAmount)
          ).toFixed(2);
        } else {
          dateMap[date] = parseFloat(changeAmount);
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
      update: ['list']
    },

    // 金币余额明细
    list: refresh =>
      this.fetchListThenSetState(
        'get_wallet_logs',
        'list',
        {
          _: {
            limit: Const.__LIMIT__ * 2,
            search: {
              dataType: 2
            }
          }
        },
        refresh
      )
  };
}
