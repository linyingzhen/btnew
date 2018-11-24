import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import Api from '@api';
import Utils from '@utils';

export default class Store extends common {
  @observable
  state = this.initState({
    state: {
      keywords: '',
      focused: true,
      isSearch: false,
      _filter: true
    },
    // 搜索列表
    searchList: {
      ...Const.__EMPTY__,
      _loaded: true
    },
    friendList: {}
  });

  fetch = {
    config: {},
    fetchList: refresh => {
      const { keywords } = this.getState('state');

      window.console.log(keywords);

      if (!keywords) return false;

      this.fetchListThenSetState(
        'get_user_list',
        'searchList',
        {
          _: {
            order: {
              fNum: 'desc'
            },
            search: {
              'niname[~]': keywords
            }
          }
        },
        refresh
      );
      return true;
    }
  };

  do = {
    // 关注
    follow: async userId => {
      await Api.P('do_add_follow', {
        concernId: userId
      });

      Utils.light('关注成功');
      this.fetch.fetchList(true);
    }
  };
}
