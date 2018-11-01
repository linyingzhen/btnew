/**
 * const prefixCls = 'style-969380';
 * const images = '/static/images/src/bbs/floor/Detail';
 * @Author: czy0729
 * @Date: 2018-09-04 17:31:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 00:46:02
 * @Path m.benting.com.cn /src/bbs/floor/Detail/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import G from '@stores/g';
import { tabsAllDS } from './ds';

export default class Store extends common {
  @observable
  state = this.initState({
    // tabs
    _affixTabs: {
      page: 0
    },

    // 留言框
    _fixedTextarea: {
      show: false,
      onSubmit: Function.prototype
    },

    // 用户信息
    userInfo: G.toJS('userInfo'),

    // 我的论坛点赞和收藏列表
    bbsLikeAndFavorList: G.toJS('bbsLikeAndFavorList'),

    // 详情
    detail: {},

    // 评论
    comment: Const.__EMPTY__,

    // 加分记录
    score: Const.__EMPTY__
  });

  params = {
    // 评论
    queryComment: {}
  };

  setQuery = {
    // 评论
    comment: index => {
      const { title } = tabsAllDS[index];
      const { id } = this.params.params;
      let query;

      switch (title) {
        case '最新':
          query = {
            _: {
              limit: Const.__LIMIT__,
              order: {
                top: 'desc',
                createTime: 'desc'
              },
              search: {
                threadId: id
              }
            }
          };
          break;

        case '正序':
          query = {
            _: {
              limit: Const.__LIMIT__,
              search: {
                threadId: id
              }
            }
          };
          break;

        case '我的':
          query = {
            _: {
              limit: Const.__LIMIT__,
              search: {
                threadId: id,
                userId: this.getState('userInfo').userId
              }
            }
          };
          break;

        default:
          break;
      }

      this.setParams({
        queryComment: query
      });
    }
  };

  fetch = {
    config: {
      static: ['userInfo', 'bbsLikeAndFavorList'],
      one: ['detail']
    },

    // 用户信息
    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    // 我的论坛点赞和收藏列表
    bbsLikeAndFavorList: async () => {
      const res = G.fetchBBSLikeAndFavorList();

      this.setState(await res, 'bbsLikeAndFavorList');

      return res;
    },

    // 文章详情
    detail: async () => {
      const { id } = this.params.params;

      return this.fetchThenSetState('get_floor_detail', 'detail', {
        threadId: id
      });
    },

    // 评论
    comment: refresh => {
      const { queryComment } = this.params;

      return this.fetchListThenSetState(
        'get_floor_comment',
        'comment',
        queryComment,
        refresh
      );
    },

    // 加分记录
    score: () => {
      const { id } = this.params.params;

      return this.fetchThenSetState('get_bbs_scoretips-list', 'score', {
        _: {
          limit: Const.__LIMIT__ * 3,
          order: {
            point: 'desc'
          },
          search: {
            relevType: 10016,
            relevId: id
          }
        }
      });
    },

    // 延迟请求
    lazy: {
      score: () => {
        const { _loaded } = this.getState('score');

        if (!_loaded) {
          this.fetch.score();
        }
      },

      comment: () => this.fetch.comment(true)
    }
  };

  computed = {
    // 是否点赞
    isLike: () => {
      const { id } = this.params.params;
      const bbsLikeAndFavorList = this.getState('bbsLikeAndFavorList');

      if (!bbsLikeAndFavorList.list || !bbsLikeAndFavorList.list.like) {
        return false;
      }

      return bbsLikeAndFavorList.list.like.findIndex(item => item == id) !== -1;
    },

    // 是否收藏
    isFavor: () => {
      const { id } = this.params.params;
      const bbsLikeAndFavorList = this.getState('bbsLikeAndFavorList');

      if (!bbsLikeAndFavorList.list || !bbsLikeAndFavorList.list.favorite) {
        return false;
      }

      return (
        bbsLikeAndFavorList.list.favorite.findIndex(item => item == id) !== -1
      );
    }
  };

  do = {
    // 回复
    comment: async query => {
      await Api.P('do_floor_comment', query);

      this.fetch.comment(true);
      this.page.hideFixedTextarea();
      Utils.light('踩楼成功');
    },

    // 收藏
    toggleFavor: async () => {
      const { threadId } = this.getState('detail');

      await G.doFavor(threadId);

      const bbsLikeAndFavorList = G.getState('bbsLikeAndFavorList');

      // 更新是否点赞
      this.setState(bbsLikeAndFavorList, 'bbsLikeAndFavorList');

      this.fetch.detail();
    },

    // 点赞
    toggleLike: async () => {
      const { postId, threadId } = this.getState('detail');

      await G.doLike(postId, threadId);

      const bbsLikeAndFavorList = G.getState('bbsLikeAndFavorList');

      // 更新是否点赞
      this.setState(bbsLikeAndFavorList, 'bbsLikeAndFavorList');

      this.fetch.detail();
    },

    // 加积分
    addScore: async () => {
      const { id } = this.params.params;

      const data = await Api.P('do_bbs_scoretips-post', {
        threadId: id,
        changeScore: 1
      });

      this.fetch.score();
      Utils.light(`已成功为他加 ${data.point} 积分`);
    },

    // 红人加积分
    addScoreHongren: async value => {
      const { id } = this.params.params;

      const _value = parseInt(value);

      /* eslint-disable-next-line */
      if (isNaN(_value) || _value < 1 || _value > 10) {
        Utils.light('请输入1-10');
        return;
      }

      await Api.P('do_hong-ren_score', {
        threadId: id,
        changeScore: _value
      });

      this.fetch.score();
      Utils.light(`已成功为他加 ${value} 积分`);
    }
  };

  page = {
    // Tab点击
    onTabClick: (item, index) => {
      this.setQuery.comment(index);
      this.fetch.comment(true);
      this.setState({ page: index }, '_affixTabs');

      // #todo
      // Utils.scrollTo(0);
    },

    // 显示FixedTextarea
    onCommentClick: item => {
      const { threadId } = this.getState('detail');
      let onSubmit;

      if (item.parentId) {
        // 回复用户
        // placeholder = `回复${item.niname}：`;
        // onSubmit = value => {
        //   if (Utils.getCharLength(value.value) < 2) {
        //     Utils.light('回复的字数不能少于2');
        //     return false;
        //   }
        //   this.do.comment({
        //     content: value.value,
        //     commentImg: value.id,
        //     threadId,
        //     parentId: item.parentId
        //   });
        //   return true;
        // };
      } else {
        // 回复评论
        onSubmit = () => {
          const { postId, replayDefContent } = this.getState('detail');

          this.do.comment({
            content: replayDefContent,
            threadId,
            parentId: postId
          });
        };
      }

      this.page.showFixedTextarea({
        onSubmit
      });
    },

    // 显示回复框
    showFixedTextarea: item =>
      this.setState(
        {
          ...item,
          show: true
        },
        '_fixedTextarea'
      ),

    // 隐藏回复框
    hideFixedTextarea: () =>
      this.setState(
        {
          show: false
        },
        '_fixedTextarea'
      )
  };

  storeInit() {
    const id = 0;

    this.setQuery.comment(id);
    this.setState({ page: id }, '_affixTabs');
  }
}
