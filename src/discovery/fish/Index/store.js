/**
 * const prefixCls = 'style-139617';
 * const images = '/static/images/src/discovery/fish/Index';
 * @Author: czy0729
 * @Date: 2018-08-08 15:33:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-06 17:11:58
 * @Path m.benting.com.cn /src/discovery/fish/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import G from '@stores/g';
import { tabsDS } from './ds';

export default class Store extends common {
  @observable
  state = this.initState({
    _affixTabs: {
      page: 0
    },

    _discoveryRow: {
      likeOpenIds: [] // 点赞记录展开id
    },

    _fixedTextarea: {
      show: false,
      placeholder: '',
      onSubmit: Function.prototype
    },

    _rule: {
      show: false
    },

    // 用户信息
    userInfo: G.toJS('userInfo'),

    // 发现列表
    discovery: Const.__EMPTY__,

    // 特殊商品，特殊规则
    specialGoods: {}
  });

  params = {
    query: {}
  };

  setQuery = {
    discovery: index => {
      const { id, gid } = this.params.params;
      const { title } = tabsDS[index];
      let query;

      const dtQuery = {};
      if (id && !gid) {
        dtQuery.dtsourceCategory = id;
      }
      if (gid) {
        // dtQuery.dtsourceType = id;
        dtQuery.dtsourceType = 20;
        dtQuery.dtsourceId = gid;
      }

      switch (title) {
        case '最新':
          query = {
            _: {
              limit: Const.__LIMIT__,
              search: dtQuery
            }
          };
          break;

        case '高分':
          query = {
            _: {
              limit: Const.__LIMIT__,
              order: {
                rate: 'desc'
              },
              search: dtQuery
            }
          };
          break;

        case '已评分':
          query = {
            _: {
              limit: Const.__LIMIT__,
              search: {
                'rate[>]': 0,
                ...dtQuery
              }
            }
          };
          break;

        default:
          break;
      }

      this.setParams({ query });
    }
  };

  fetch = {
    config: {
      static: ['userInfo'],
      one: ['specialGoods'],
      update: ['discovery']
    },

    // 用户信息
    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    // 发现列表
    discovery: refresh => {
      const { query } = this.params;

      return this.fetchListThenSetState(
        'get_discovery_list',
        'discovery',
        query,
        refresh,
        'publishTime'
      );
    },
    updateOneDiscovery: infoId =>
      this.updateOneThenSetState('get_discovery_list', 'discovery', {
        infoId
      }),

    // 特殊商品，特殊规则
    specialGoods: async () => {
      const { gid } = this.params.params;
      if (!gid) {
        return null;
      }

      const res = Api.P('get_shop_special-goods', {
        _: {
          search: {
            goodsId: gid
          }
        }
      });
      const data = await res;

      if (data.list[0]) {
        this.setState(data.list[0], 'specialGoods');
      }

      return res;
    }
  };

  do = {
    // 点赞
    toggleLike: async infoId => {
      await Api.P('do_like', { infoId });

      // 更新发现列表一项
      this.fetch.updateOneDiscovery(infoId);
    },

    // 评论
    comment: async (query, infoId) => {
      if (Utils.getCharLength(query.con) < 2) {
        Utils.light('回复的字数不能少于2');
        return;
      }

      if (!G.insertReply(query.con)) {
        Utils.light('检测到最近有类似回复，请不要恶意灌水');
        return;
      }

      const { point } = await Api.P('do_comment', query);

      this.page.hideFixedTextarea();
      Utils.light(point == 0 ? '回复成功' : `回复成功，积分+${point}`);

      // 更新发现列表一项
      this.fetch.updateOneDiscovery(infoId);
    }
  };

  page = {
    // Tab点击
    onTabClick: (item, index) => {
      this.setQuery.discovery(index);
      this.fetch.discovery(true);
      this.setState({ page: index }, '_affixTabs');

      Utils.scrollTo(0);
    },

    // 回复点击
    onCommentClick: item => {
      let placeholder;
      let onSubmit;

      if (item.userId) {
        // 回复用户
        placeholder = `回复${item.name}：`;
        onSubmit = value =>
          this.do.comment(
            {
              parId: item.tbId,
              con: value
            },
            item.infoId
          );
      } else {
        // 回复评论
        placeholder = '回复：';
        onSubmit = value =>
          this.do.comment(
            {
              infoId: item.infoId,
              con: value
            },
            item.infoId
          );
      }

      this.page.showFixedTextarea({
        placeholder,
        onSubmit
      });
    },

    // 点赞记录显示更多
    onLikeLogsOpen: infoId => {
      const { likeOpenIds } = this.getState('_discoveryRow');

      this.setState(
        {
          likeOpenIds: [...likeOpenIds, infoId]
        },
        '_discoveryRow'
      );
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

    // 显示规则
    showRule: () =>
      this.setState(
        {
          show: true
        },
        '_rule'
      ),

    // 隐藏规则
    hideRule: () =>
      this.setState(
        {
          show: false
        },
        '_rule'
      )
  };

  storeInit() {
    const id = 0;

    this.setQuery.discovery(id);
    this.setState({ page: id }, '_affixTabs');
  }
}
