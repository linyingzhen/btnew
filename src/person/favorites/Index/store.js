/**
 * const prefixCls = 'style-805586';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-10-31 13:50:01
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-10-31 14:50:27
 * @Path bt_mb_new \src\person\favorites\Index\store.js.git
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import Utils from '@utils';
import G from '@stores/g';
import { orderTabs } from './ds';

export default class Store extends common {
  @observable
  state = this.initState({
    _affixTabs: {
      page: 0
    },
    favorites: Const.__EMPTY__,
    videos: {
      ...Const.__EMPTY__,
      _loaded: true
    }
  });

  fetch = {
    config: {
      update: ['favorite']
    },
    favorite: refresh =>
      this.fetchListThenSetState(
        'get_bbs_my-favor-list',
        'favorites',
        {},
        refresh
      )
  };

  do = {
    // 删除
    delete: async id => {
      const { page } = this.getState('_affixTabs');

      if (orderTabs[page].title === '帖子') {
        this.do.deleteBBS(id);
      }
    },

    // 删除收藏帖子
    deleteBBS: async postId => {
      await G.doFavor(postId);
      this.fetch.favorite(true);
    }
  };

  page = {
    onTabClick: (item, index) => {
      this.setState({ page: index }, '_affixTabs');
      Utils.scrollTo(0);
    }
  };

  storeInit() {
    const { id = 0 } = this.params.params;

    this.setState({ page: id }, '_affixTabs');
  }
}
