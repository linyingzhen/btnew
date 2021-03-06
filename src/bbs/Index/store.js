/**
 * const prefixCls = 'style-962115';
 * const images = '/static/images/src/bbs/Index';
 * @Author: czy0729
 * @Date: 2018-07-10 09:49:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-16 16:47:16
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
    filter: {
      top: {
        threadId: 1,
        title: 1
      },
      post: {
        contentImg: 1,
        createTime: 1,
        faceImg: 1,
        grade: 1,
        isDigest: 1,
        likeAdd: 1,
        niname: 1,
        replyNum: 1,
        threadId: 1,
        title: 1,
        userId: 1,
        vip: 1,
        role: 1
      }
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
        },
        _filter: this.fetch.filter.top
      }),

    // 帖子列表
    post: refresh => {
      const { queryPost } = this.params;
      const { page } = this.getState('_affixTabs');

      // 推荐tab不是正常按时间排序，不要用截止时间戳
      const createTimeKey = page !== 0 ? 'createTime' : undefined;

      return this.fetchListThenSetState(
        'get_bbs_list',
        'post',
        {
          ...queryPost,
          _filter: this.fetch.filter.post
        },
        refresh,
        createTimeKey
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
