/**
 * const prefixCls = 'style-191890';
 * const images = '/static/images/src/bbs/Block';
 * @Author: czy0729
 * @Date: 2018-10-21 22:03:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-21 22:25:53
 * @Path bt_mb_new /src/bbs/Block/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';

export default class Store extends common {
  @observable
  state = this.initState({
    // 置顶文章
    top: Const.__EMPTY__,

    // 帖子列表
    post: Const.__EMPTY__
  });

  fetch = {
    config: {
      one: ['top'],
      update: ['post']
    },

    // 置顶文章
    top: () => {
      const { id } = this.params.params;

      return this.fetchThenSetState('get_bbs_list', 'top', {
        _: {
          limit: Const.__LIMIT_SM__,
          search: {
            displayState: 3,
            forumId: id
          }
        }
      });
    },

    // 帖子列表
    post: refresh => {
      const { id } = this.params.params;

      return this.fetchListThenSetState(
        'get_bbs_list',
        'post',
        {
          _: {
            limit: Const.__LIMIT__,
            order: {
              createTime: 'desc'
            },
            search: {
              forumId: id
            }
          }
        },
        refresh
      );
    },
    updateOnePostList: postId =>
      this.updateOneThenSetState('get_bbs_list', 'post', { postId })
  };
}
