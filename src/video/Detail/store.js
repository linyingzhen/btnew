/**
 * const prefixCls = 'style-614289';
 * const images = '/static/images/src/video/Detail';
 * @Author: czy0729
 * @Date: 2018-07-19 17:14:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 15:45:36
 * @Path m.benting.com.cn /src/video/Detail/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';

export default class Store extends common {
  @observable
  state = this.initState({
    // 留言框
    _fixedTextarea: {
      show: false,
      placeholder: '',
      onSubmit: Function.prototype
    },

    // 打赏框
    _reward: {
      show: false
    },

    // 视频详情
    detail: {},

    // 推荐视频
    list: Const.__EMPTY__,

    // 随机视频
    random: Const.__EMPTY__,

    // 留言
    comment: Const.__EMPTY__,

    // 打赏
    reward: Const.__EMPTY__
  });

  fetch = {
    config: {
      one: ['detail', 'random', 'reward'],
      update: ['comment']
    },

    // 视频详情
    detail: async () => {
      const { id } = this.params.params;

      return this.fetchThenSetState('get_video_detail', 'detail', {
        tbId: id
      });
    },

    // 相关视频
    list: typeId =>
      this.fetchThenSetState('get_video_list-list', 'list', {
        _: {
          limit: 9,
          search: {
            typeId
          }
        }
      }),

    // 随机视频
    random: () =>
      this.fetchThenSetState('get_random_video_list-list', 'random', {
        _: {
          limit: 6
        }
      }),

    // 留言
    comment: refresh => {
      const { id } = this.params.params;

      return this.fetchListThenSetState(
        'get_video-v2_comment-list',
        'comment',
        {
          _: {
            limit: Const.__LIMIT__,
            order: {
              createTime: 'desc'
            },
            search: {
              videoId: id
            }
          }
        },
        refresh
      );
    },
    updateComment: tbId => {
      const { id } = this.params.params;

      return this.updateOneThenSetState(
        'get_video-v2_comment-list',
        'comment',
        {
          videoId: id,
          tbId
        },
        'tbId'
      );
    },

    // 打赏
    reward: () => {
      const { id } = this.params.params;

      return this.fetchThenSetState('get_new_reward-list', 'reward', {
        _: {
          limit: Const.__LIMIT__,
          search: {
            dataId: id,
            typeId: 1
          }
        }
      });
    }
  };

  do = {
    // 评论
    comment: async query => {
      const { rootId, parId, con } = query;
      if (Utils.getCharLength(con) < 2) {
        Utils.light('回复字数太少');
        return;
      }

      const _query = { con };
      if (!parId) {
        const { id } = this.params.params;
        _query.tbId = id;
      } else {
        _query.parId = parId;
      }

      await Api.P('do_video-v2_comment', _query);

      this.page.hideFixedTextarea();
      Utils.light('回复成功');

      if (!parId) {
        // 回复楼主全部刷新
        this.fetch.comment(true);
      } else {
        // 回复某回复，只刷新最顶层
        this.fetch.updateComment(rootId);
      }
    },

    // 点赞
    toggleLike: async () => {
      const { id } = this.params.params;

      await Api.P('do_video-v2_like', {
        tbId: id,
        likeType: 1
      });

      this.fetch.detail();
    },

    // 打赏
    reward: async value => {
      const { id } = this.params.params;

      await Api.P('do_new_reward', {
        dataId: id,
        typeId: 1,
        goodsId: value
      });

      this.page.hideReward();
      Utils.light('打赏成功');
      this.fetch.reward();
    }
  };

  page = {
    // 显示FixedTextarea
    onCommentClick: item => {
      const { rootId, parId, niname } = item;
      let placeholder;
      let onSubmit;

      if (!parId) {
        // 回复评论
        placeholder = '回复：';
        onSubmit = value =>
          this.do.comment({
            con: value
          });
      } else {
        // 回复用户
        placeholder = `回复${niname}：`;
        onSubmit = value =>
          this.do.comment({
            rootId,
            parId,
            con: value
          });
      }

      this.page.showFixedTextarea({
        placeholder,
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
      ),

    // 显示打赏框
    showReward: () =>
      this.setState(
        {
          show: true
        },
        '_reward'
      ),

    // 隐藏打赏框
    hideReward: () =>
      this.setState(
        {
          show: false
        },
        '_reward'
      )
  };
}
