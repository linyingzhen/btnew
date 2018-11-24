/**
 * const prefixCls = 'style-145790';
 * const images = '/static/images/src/index/Nido';
 * @Author: czy0729
 * @Date: 2018-06-24 18:00:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-15 11:51:56
 * @Path m.benting.com.cn /src/index/Nido/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import G from '@stores/g';
import { mockTopic, filter } from './ds';

export default class Store extends common {
  config = {
    cache: ['carousel', 'event', 'fish', 'prize', 'discovery', 'bbs']
  };

  @observable
  state = this.initState({
    userInfo: G.getState('userInfo'),

    // 首页轮播图
    carousel: Const.__EMPTY__,

    // 活动
    event: {
      floor: {}, // 欢乐踩楼
      guess: {}, // 猜鱼
      panic: {}, // 极速秒杀
      panicGold: {}, // 金币捡漏
      pointOncebuy: {}, // 积分挖宝
      pointAuction: {}, // 积分竞拍
      goldAuction: {} // 金币竞拍
    },

    // 话题
    topic: mockTopic,

    // 渔获有礼
    fish: Const.__EMPTY__,

    // 有奖活动
    prize: Const.__EMPTY__,

    // 发现精选
    discovery: Const.__EMPTY__,

    // 牛贴赏析
    bbs: Const.__EMPTY__
  });

  fetch = {
    config: {
      static: ['userInfo'],
      one: ['carousel', 'event', 'fish', 'prize', 'discovery', 'bbs']
    },

    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    // 首页轮播图
    carousel: () =>
      this.fetchThenSetState('get_carousel_list', 'carousel', {
        imgType: 1,
        _filter: filter.carousel
      }),

    // 活动信息
    event: () => this.fetchThenSetState('get_event_home-info', 'event'),

    // 话题
    // topic: () => this.fetchThenSetState('get_home_topic-list', 'topic'),

    // 渔获有礼
    fish: () =>
      this.fetchThenSetState('get_discovery_list', 'fish', {
        _: {
          limit: 4,
          search: {
            'rate[>]': 0,
            isReclist: 1
          }
        },
        _filter: filter.fish
      }),

    // 有奖活动
    prize: () =>
      this.fetchThenSetState('get_bbs_list', 'prize', {
        _: {
          limit: 5,
          search: {
            forumId: 77
          }
        },
        _filter: filter.bbs
      }),

    // 发现精选
    discovery: () =>
      this.fetchThenSetState('get_discovery_list', 'discovery', {
        _: {
          limit: 6,
          search: {
            isRec: 1 // 精选
          }
        },
        _filter: filter.discovery
      }),

    // 牛贴赏析
    bbs: () =>
      this.fetchThenSetState('get_bbs_list', 'bbs', {
        _: {
          limit: 6,
          search: {
            isDigest: 1, // 精华,
            'replyNum[>]': 50
          }
        },
        _filter: filter.bbs
      })
  };
}
