/**
 * const prefixCls = 'style-360519';
 * const images = '/static/images/src/person/event/Guess';
 * @Author: czy0729
 * @Date: 2018-09-27 09:49:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-27 10:11:58
 * @Path m.benting.com.cn /src/person/event/Guess/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import Utils from '@utils';

export default class Store extends common {
  @observable
  state = this.initState({
    list: Const.__EMPTY__
  });

  fetch = {
    config: {
      update: ['list']
    },

    list: refresh => {
      const type = Utils.getQuery('type');

      let api;
      let query = {};
      switch (type) {
        case 'score':
          api = 'get_my_point_guess-list';
          query = {
            _: {
              limit: Const.__LIMIT__,
              order: {
                endTime: 'desc',
                isWin: 'desc'
              }
            }
          };
          break;

        default:
          api = 'get_my_gold_guess-list';
          query = {
            _: {
              limit: Const.__LIMIT__,
              order: {
                endTime: 'desc',
                isWin: 'desc'
              }
            }
          };
          break;
      }

      return this.fetchListThenSetState(
        api,
        'list',
        query,
        refresh
      );
    }
  };
}
