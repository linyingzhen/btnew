/**
 * const prefixCls = 'style-189920';
 * const images = '/static/images/src/event/car/User';
 * @Author: czy0729
 * @Date: 2018-11-06 18:29:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-21 11:16:07
 * @Path bt_mb_new /src/event/car/User/store.js.git
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import Utils from '@utils';
import { signAuditDS } from '../ds';
import { tabsDS } from './ds';

export default class Store extends common {
  @observable
  state = this.initState({
    _affixTabs: {
      page: 0
    },

    list: Const.__EMPTY__
  });

  params = {
    query: {}
  };

  setQuery = {
    list: index => {
      const { id } = this.params.params;
      const { title } = tabsDS[index];
      const query = {
        _: {
          limit: Const.__LIMIT__ * 2,
          search: {
            tid: id
          }
        }
      };

      if (title) {
        query._.search.result_type = Utils.getValue(signAuditDS, title);
      }

      this.setParams({ query });
    }
  };

  fetch = {
    config: {
      update: ['list']
    },

    list: refresh => {
      const { query } = this.params;

      return this.fetchListThenSetState(
        'get_event-car_sign-up-list',
        'list',
        query,
        refresh
      );
    }
  };

  page = {
    onTabClick: (item, index) => {
      this.setQuery.list(index);
      this.fetch.list(true);
      this.setState({ page: index }, '_affixTabs');
    }
  };

  storeInit() {
    this.setQuery.list(0);
  }
}
