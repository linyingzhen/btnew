/**
 * const prefixCls = 'style-151638';
 * const images = '/static/images/src/person/event/Auction';
 * @Author: czy0729
 * @Date: 2018-09-18 09:59:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-18 11:33:43
 * @Path m.benting.com.cn /src/person/event/Auction/store.js
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

      let query = {};
      // 默认金币竞拍
      switch (type) {
        case 'score':
          query = {
            _: {
              limit: Const.__LIMIT__,
              order: {
                endTime: 'desc'
              },
              search: {
                auctionType: 2
              }
            }
          };
          break;

        default:
          query = {
            _: {
              limit: Const.__LIMIT__,
              order: {
                endTime: 'desc'
              },
              search: {
                auctionType: 1
              }
            }
          };
          break;
      }

      return this.fetchListThenSetState(
        'get_my_auction-list',
        'list',
        query,
        refresh
      );
    }
  };
}
