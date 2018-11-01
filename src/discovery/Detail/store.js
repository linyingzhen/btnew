/**
 * const prefixCls = 'style-189182';
 * const images = '/static/images/src/discovery/Detail';
 * @Author: czy0729
 * @Date: 2018-07-24 15:55:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-31 15:06:54
 * @Path m.benting.com.cn /src/discovery/Detail/store.js
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

    // 发现详情
    detail: {},

    // 留言
    comment: Const.__EMPTY__,

    // 打赏
    reward: Const.__EMPTY__
  });

  fetch = {
    config: {
      one: ['detail'],
      update: ['comment']
    },

    // 发现详情
    detail: async () => {
      const { id } = this.params.params;

      const res = this.fetchThenSetState('get_detail', 'detail', {
        infoId: id
      });
      await res;

      return this.fetch.reward();
    },

    // 留言
    comment: refresh => {
      const { id } = this.params.params;

      return this.fetchListThenSetState(
        'get_detail_comment_list',
        'comment',
        {
          _: {
            limit: Const.__LIMIT__,
            order: {
              createTime: 'desc'
            },
            search: {
              infoId: id
            }
          }
        },
        refresh
      );
    },
    updateComment: tbId => {
      const { id } = this.params.params;

      return this.updateOneThenSetState(
        'get_detail_comment_list',
        'comment',
        {
          infoId: id,
          tbId
        },
        'tbId'
      );
    },

    // 打赏
    reward: () => {
      const { tbId } = this.getState('detail');

      return this.fetchThenSetState('get_new_reward-list', 'reward', {
        _: {
          limit: Const.__LIMIT__,
          search: {
            dataId: tbId,
            typeId: 2
          }
        }
      });
    }
  };

  do = {
    // 浏览计数
    view: () => {
      const { id } = this.params.params;

      Api.P(
        'do_view',
        {
          infoId: id
        },
        {
          show: false
        }
      );
    },

    // 留言
    comment: async query => {
      const { rootId, parId, con } = query;

      if (!Utils.checkComment(con)) {
        return;
      }

      if (Utils.getCharLength(con) < 2) {
        Utils.light('回复字数太少');
        return;
      }

      const _query = { con };
      if (!parId) {
        const { id } = this.params.params;
        _query.infoId = id;
      } else {
        _query.parId = parId;
      }

      const { point } = await Api.P('do_comment', _query);

      this.page.hideFixedTextarea();
      Utils.light(point == 0 ? '回复成功' : `回复成功，积分+${point}`);

      if (!parId) {
        // 回复楼主全部刷新
        this.fetch.comment(true);
      } else {
        // 回复某回复，只刷新最顶层
        this.fetch.updateComment(rootId);
      }

      if (window.Stores['/discovery']) {
        const { id } = this.params.params;
        window.Stores['/discovery'].updateOneDiscovery(id);
      }
    },

    // 打赏
    reward: async value => {
      const { tbId } = this.getState('detail');

      await Api.P('do_new_reward', {
        dataId: tbId,
        typeId: 2,
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

  storeDidMount() {
    this.do.view();
  }
}
