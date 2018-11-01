/**
 * const prefixCls = 'style-841648';
 * const images = '/static/images/src/person/friends/Index';
 * @Author: czy0729
 * @Date: 2018-10-23 15:31:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 15:38:21
 * @Path bt_mb_new /src/person/friends/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import Utils from '@utils';

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
        {},
        refresh
      ),

    fans: refresh =>
      this.fetchListThenSetState('get_user_fans', 'fans', {}, refresh)
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
}
