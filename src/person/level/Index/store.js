/**
 * const prefixCls = 'style-115998';
 * const images = '/static/images/src/person/level/Index';
 * @Author: czy0729
 * @Date: 2018-10-25 23:37:18
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-10-25 23:37:18
 * @Path bt_mb_new /src/person/level/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Utils from '@utils';
import Const from '@const';

export default class Store extends common {
  @observable
  state = this.initState({
    _tabs: {
      active: '用户等级'
    },

    // 等级信息
    grade: {},

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
      update: ['grade', 'integralRecordList']
    },

    // 等级信息
    grade: () => this.fetchThenSetState('get_my_grade_list', 'grade'),

    // 积分记录列表
    integralRecordList: refresh =>
      this.fetchListThenSetState(
        'get_my-score_list',
        'integralList',
        {
          _: {
            limit: Const.__LIMIT__ * 2
          }
        },
        refresh
      )
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
