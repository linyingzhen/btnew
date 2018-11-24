/**
 * const prefixCls = 'style-841648';
 * const images = '/static/images/src/person/friends/Index';
 * @Author: czy0729
 * @Date: 2018-10-23 15:31:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-14 16:36:42
 * @Path bt_mb_new /src/person/friends/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import { filter } from './ds';

export default class Store extends common {
  @observable
  state = this.initState({
    _affixTabs: {
      page: 0
    },

    follows: Const.__EMPTY__,

    fans: Const.__EMPTY__
  });

  fetch = {
    config: {
      update: ['follows', 'fans']
    },

    follows: refresh =>
      this.fetchListThenSetState(
        'get_user_followers',
        'follows',
        {
          _filter: filter.list
        },
        refresh
      ),

    fans: refresh =>
      this.fetchListThenSetState(
        'get_user_fans',
        'fans',
        {
          _filter: filter.list
        },
        refresh
      )
  };

  do = {
    toggle: async (concernId, isFollow) => {
      await Api.P('do_add_follow', {
        concernId
      });

      if (isFollow) {
        this.fetch.fans(true);
      } else {
        this.fetch.follows(true);
      }
    }
  };

  page = {
    onTabClick: (item, index) => {
      if (index == 0) {
        this.fetch.follows(true);
      } else {
        this.fetch.fans(true);
      }

      this.setState({ page: index }, '_affixTabs');
      Utils.scrollTo(0);
    }
  };

  storeInit() {
    const { id = 0 } = this.params.params;

    this.setState({ page: id }, '_affixTabs');
  }
}
