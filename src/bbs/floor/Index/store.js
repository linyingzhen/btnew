/**
 * const prefixCls = 'style-158258';
 * const images = '/static/images/src/bbs/floor/Index';
 * @Author: czy0729
 * @Date: 2018-09-04 14:45:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-04 18:00:35
 * @Path m.benting.com.cn /src/bbs/floor/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import G from '@stores/g';

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

  params = {
    __cache: true
  };

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
    post: refresh => {
      const { queryPost } = this.params;

      return this.fetchListThenSetState(
        'get_floor_list',
        'post',
        queryPost,
        refresh
      );
    },
    updateOnePostList: postId =>
      this.updateOneThenSetState('get_floor_list', 'post', { postId })
  };

  do = {
    // 点赞
    like: async (postId, threadId) => {
      await G.doLike(postId, threadId);

      const bbsLikeAndFavorList = G.getState('bbsLikeAndFavorList');

      // 更新是否点赞
      this.setState(bbsLikeAndFavorList, 'bbsLikeAndFavorList');

      // 更新一项
      this.fetch.updateOnePostList(postId);
    }
  };
}
