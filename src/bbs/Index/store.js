/**
 * const prefixCls = 'style-962115';
 * const images = '/static/images/src/bbs/Index';
 * @Author: czy0729
 * @Date: 2018-07-10 09:49:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-30 11:41:48
 * @Path m.benting.com.cn /src/bbs/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import Utils from '@utils';
import G from '@stores/g';
import { tabsDS } from './ds';

export default class Store extends common {
  config = {
    cache: ['top', 'post']
  };

  @observable
  state = this.initState({
    _affixTabs: {
      page: 0
    },

    // 我的论坛点赞和收藏列表
    bbsLikeAndFavorList: G.toJS('bbsLikeAndFavorList'),

    // 置顶文章
    top: Const.__EMPTY__,

    // 帖子列表
    post: Const.__EMPTY__
  });

  params = {
    __cache: true,

    // 帖子列表Query
    queryPost: {}
  };

  setQuery = {
    post: index => {
      const { title } = tabsDS[index];
      let query;

      switch (title) {
        case '推荐':
          query = {
            _: {
              limit: Const.__LIMIT__,
              order: {
                displayState: 'desc',
                createTime: 'desc'
              },
              search: {}
            }
          };
          break;

        case '最新':
          query = {
            _: {
              limit: Const.__LIMIT__,
              order: {
                createTime: 'desc'
              },
              search: {}
            }
          };
          break;

        case '精华':
          query = {
            _: {
              limit: Const.__LIMIT__,
              order: {
                createTime: 'desc'
              },
              search: {
                isDigest: 1
              }
            }
          };
          break;

        case '官方':
          query = {
            _: {
              limit: Const.__LIMIT__,
              order: {
                createTime: 'desc'
              },
              search: {
                forumId: [75, 77]
              }
            }
          };
          break;

        default:
          break;
      }

      this.setParams({
        queryPost: query
      });
    }
  };

  fetch = {
    config: {
      static: ['bbsLikeAndFavorList'],
      one: ['top'],
      update: ['post']
    },

    // 我的论坛点赞和收藏列表
    bbsLikeAndFavorList: async () => {
      const res = G.fetchBBSLikeAndFavorList();

      this.setState(await res, 'bbsLikeAndFavorList');

      return res;
    },

    // 置顶文章
    top: () =>
      this.fetchThenSetState('get_bbs_list', 'top', {
        _: {
          limit: Const.__LIMIT__,
          search: {
            displayState: 3
          }
        }
      }),

    // 帖子列表
    post: refresh => {
      const { queryPost } = this.params;

      return this.fetchListThenSetState(
        'get_bbs_list',
        'post',
        queryPost,
        refresh
      );
    },
    updateOnePostList: postId =>
      this.updateOneThenSetState('get_bbs_list', 'post', { postId })
  };

  page = {
    // Tab点击
    onTabClick: (item, index) => {
      this.setQuery.post(index);
      this.fetch.post(true);
      this.setState({ page: index }, '_affixTabs');

      Utils.scrollTo(0);
    }
  };

  storeInit() {
    const { id = 0 } = this.params.params;

    this.setQuery.post(id);
    this.setState({ page: id }, '_affixTabs');
  }
}
