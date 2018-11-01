/**
 * const prefixCls = 'style-356553';
 * const images = '/static/images/src/person/publish/Index';
 * @Author: czy0729
 * @Date: 2018-07-31 18:35:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 15:26:44
 * @Path m.benting.com.cn /src/person/publish/Index/store.js
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
    // tabs
    _affixTabs: {
      page: 0
    },

    // 用户信息
    userInfo: G.toJS('userInfo'),

    // 发现列表
    discovery: Const.__EMPTY__,

    // 社区
    bbs: Const.__EMPTY__,

    // 视频
    video: Const.__EMPTY__
  });

  fetch = {
    config: {
      static: ['userInfo']
    },

    // 用户信息
    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    // 发现列表
    discovery: refresh =>
      this.fetchListThenSetState(
        'get_my_discovery_list',
        'discovery',
        {},
        refresh
      ),

    // 社区列表
    bbs: refresh =>
      this.fetchListThenSetState('get_bbs_my-post-list', 'bbs', {}, refresh),

    // 视频列表
    video: refresh => {
      const { userId } = this.getState('userInfo');

      return this.fetchListThenSetState(
        'get_video_list-list',
        'video',
        {
          _: {
            limit: Const.__LIMIT__,
            order: {
              createTime: 'desc'
            },
            search: {
              userId
            }
          }
        },
        refresh
      );
    }
  };

  do = {
    // 删除
    delete: async id => {
      const { page } = this.getState('_affixTabs');

      if (tabsDS[page].title === '发现') {
        this.do.deleteDiscovery(id);
      }

      if (tabsDS[page].title === '帖子') {
        this.do.deleteBBS(id);
      }
    },

    // 删除发现
    deleteDiscovery: async infoId => {
      await Api.P('do_delete_publish', { infoId });

      Utils.light('删除成功');
      this.fetch.discovery(true);
    },

    // 删除帖子
    deleteBBS: async postId => {
      await Api.P('do_bbs_delete-post', { postId });

      Utils.light('删除成功');
      this.fetch.bbs(true);
    }

    // #todo 删除视频
  };

  page = {
    // Tab点击
    onTabClick: (item, index) => {
      this.setState({ page: index }, '_affixTabs');

      let data;
      switch (tabsDS[index].title) {
        case '帖子':
          data = this.getState('bbs');

          if (!data._loaded) {
            this.fetch.bbs();
          }
          break;

        case '视频':
          data = this.getState('video');

          if (!data._loaded) {
            this.fetch.video();
          }
          break;

        default:
          data = this.getState('discovery');

          if (!data._loaded) {
            this.fetch.discovery();
          }
          break;
      }

      Utils.scrollTo(0);
    }
  };

  storeInit() {
    const { id = 0 } = this.params.params;

    this.setState({ page: id }, '_affixTabs');
  }

  storeDidMount() {
    const { page } = this.getState('_affixTabs');

    switch (tabsDS[page].title) {
      case '帖子':
        this.fetch.bbs(true);
        break;

      case '视频':
        this.fetch.video(true);
        break;

      default:
        this.fetch.discovery(true);
        break;
    }
  }
}
