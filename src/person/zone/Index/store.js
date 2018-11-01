/**
 * const prefixCls = 'style-585658';
 * const images = '/static/images/src/person/zone/Index';
 * @Author: czy0729
 * @Date: 2018-07-27 10:19:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-21 14:52:56
 * @Path m.benting.com.cn /src/person/zone/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import { tabsDS } from './ds';

export default class Store extends common {
  @observable
  state = this.initState({
    // tabs
    _affixTabs: {
      page: 0
    },

    // 用户信息
    person: {},

    // 发现列表
    discovery: Const.__EMPTY__,

    // 社区
    bbs: Const.__EMPTY__,

    // 视频
    video: Const.__EMPTY__
  });

  fetch = {
    config: {
      one: ['person', 'discovery']
    },

    // 用户信息
    person: () => {
      const { id } = this.params.params;

      return this.fetchThenSetState('get_person_info-more', 'person', {
        userId: id
      });
    },

    // 发现列表
    discovery: refresh => {
      const { id } = this.params.params;

      return this.fetchListThenSetState(
        'get_person_discovery_list',
        'discovery',
        {
          _: {
            limit: Const.__LIMIT__,
            search: {
              userId: id
            }
          }
        },
        refresh
      );
    },

    // 社区列表
    bbs: refresh => {
      const { id } = this.params.params;

      return this.fetchListThenSetState(
        'get_bbs_list',
        'bbs',
        {
          _: {
            limit: Const.__LIMIT__,
            search: {
              userId: id
            }
          }
        },
        refresh
      );
    },

    // 视频列表
    video: refresh => {
      const { id } = this.params.params;

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
              userId: id
            }
          }
        },
        refresh
      );
    }
  };

  do = {
    // 关注
    follow: async () => {
      const { userId } = this.getState('person');

      await Api.P('do_add_follow', {
        concernId: userId
      });

      Utils.light('关注成功');
      this.fetch.person();
    }
  };

  page = {
    // Tab点击
    onTabClick: (item, index) => {
      this.setState({ page: index }, '_affixTabs');

      if (tabsDS[index].title === '帖子') {
        const bbs = this.getState('bbs');

        if (!bbs._loaded) {
          this.fetch.bbs();
        }
      }

      if (tabsDS[index].title === '视频') {
        const video = this.getState('video');

        if (!video._loaded) {
          this.fetch.video();
        }
      }

      Utils.scrollTo(0);
    }
  };
}
