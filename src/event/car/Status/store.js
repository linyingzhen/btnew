/**
 * const prefixCls = 'style-940604';
 * const images = '/static/images/src/event/car/Status';
 * @Author: czy0729
 * @Date: 2018-11-09 14:45:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-23 17:48:20
 * @Path bt_mb_new /src/event/car/Status/store.js.git
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import G from '@stores/g';
import { tid, tabsDS, fishAuditDS } from '../ds';

export default class Store extends common {
  @observable
  state = this.initState({
    _affixTabs: {
      page: 0
    },

    userInfo: G.toJS('userInfo'),

    // 用户报名状态
    status: {},

    // 发现列表
    discovery: Const.__EMPTY__
  });

  params = {
    query: {}
  };

  setQuery = {
    discovery: index => {
      const { id = tid } = this.params.params;
      const { title } = tabsDS[index];
      const { userId } = this.getState('userInfo');
      const query = {
        _: {
          limit: Const.__LIMIT__,
          search: {
            userId,
            sendcarTid: id
          }
        }
      };

      if (title) {
        query._.search.audit = Utils.getValue(fishAuditDS, title);
      }

      this.setParams({ query });
    }
  };

  fetch = {
    config: {
      static: ['userInfo'],
      update: ['status', 'discovery']
    },

    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    // 用户报名状态
    status: () => {
      const { id = tid } = this.params.params;

      return this.fetchThenSetState('get_event-car_user-status', 'status', {
        tid: id
      });
    },

    // 发现列表
    discovery: async refresh => {
      const { userId } = this.getState('userInfo');

      if (!userId) {
        await this.fetch.userInfo();
        this.setQuery.discovery(0);
      }

      const { query } = this.params;

      return this.fetchListThenSetState(
        'get_event-car_fish-list',
        'discovery',
        query,
        refresh,
        'publishTime'
      );
    },
    updateOneDiscovery: infoId => {
      const { list = [] } = this.getState('discovery');
      const { audit } = list.find(item => item.infoId == infoId) || {};

      return this.updateOneThenSetState(
        'get_event-car_fish-list',
        'discovery',
        {
          infoId,
          audit
        }
      );
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
    comment: async (query = {}, infoId) => {
      const { con } = query;

      if (!Utils.checkComment(con)) {
        return;
      }

      if (Utils.getCharLength(con) < 2) {
        Utils.light('回复的字数不能少于2');
        return;
      }

      if (!G.insertReply(con)) {
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
    this.setQuery.discovery(0);
  }
}
