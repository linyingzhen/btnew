/**
 * const prefixCls = 'style-158258';
 * const images = '/static/images/src/bbs/floor/Index';
 * @Author: czy0729
 * @Date: 2018-09-04 14:45:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-14 18:27:02
 * @Path m.benting.com.cn /src/bbs/floor/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import G from '@stores/g';
import { filter } from './ds';

export default class Store extends common {
  @observable
  state = this.initState({
    // 我的论坛点赞和收藏列表
    bbsLikeAndFavorList: G.toJS('bbsLikeAndFavorList'),

    // 服务器时间
    time: {},

    // 帖子列表
    post: Const.__EMPTY__
  });

  fetch = {
    config: {
      static: ['bbsLikeAndFavorList'],
      update: ['time', 'post']
    },

    // 我的论坛点赞和收藏列表
    bbsLikeAndFavorList: async () => {
      const res = G.fetchBBSLikeAndFavorList();

      this.setState(await res, 'bbsLikeAndFavorList');

      return res;
    },

    // 服务器时间
    time: () => this.fetchThenSetState('get_time', 'time'),

    // 帖子列表
    post: refresh =>
      this.fetchListThenSetState(
        'get_floor_list',
        'post',
        {
          _filter: filter.post
        },
        refresh
      )
  };
}
