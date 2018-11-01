/**
 * const prefixCls = 'style-522813';
 * const images = '/static/images/src/index/Home';
 * @Author: czy0729
 * @Date: 2018-06-20 17:47:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-30 11:16:38
 * @Path m.benting.com.cn /src/index/Home/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import G from '@stores/g';

export default class Store extends common {
  config = {
    cache: ['carousel', 'newGoods', 'videos', 'information']
  };

  @observable
  state = this.initState({
    // 提醒数
    messageCount: G.getState('messageCount'),

    // 用户信息
    userInfo: G.toJS('userInfo'),

    // 首页轮播图
    carousel: Const.__EMPTY__,

    // 新品
    newGoods: Const.__EMPTY__,

    // 视频
    videos: Const.__EMPTY__,

    // 资讯
    information: Const.__EMPTY__
  });

  fetch = {
    config: {
      static: ['messageCount', 'userInfo'],
      one: ['carousel', 'newGoods', 'videos', 'information']
    },

    // 最近公告，3天内
    checkRecentNotice: async () => {
      const indexNotice = G.getState('indexNotice');

      const data = await Api.P('get_bbs_list', {
        _: {
          limit: 1,
          order: {
            createTime: 'desc'
          },
          search: {
            forumId: 75,
            'createTime[>]':
              indexNotice.time || Utils.getTimestamp() - 3 * 24 * 60 * 60
          }
        }
      });

      if (data.list.length) {
        const { time } = G.getState('indexNotice');
        const { createTime } = data.list[0];

        if (createTime > time) {
          G.indexNoticeSetNew(createTime, data.pageinfo.recordtotal);
        }
      }
    },

    // 提醒数
    messageCount: async () => {
      const res = G.fetchMessageCount();

      this.setState(await res, 'messageCount');

      return res;
    },

    // 用户信息
    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    // 首页轮播图
    carousel: () =>
      this.fetchThenSetState('get_carousel_list', 'carousel', {
        imgType: 41
      }),

    // 新品
    newGoods: () =>
      this.fetchThenSetState('get_goods-list', 'newGoods', {
        _: {
          limit: 4,
          search: {
            goodsType: 48,
            disable: 0
          }
        }
      }),

    // 视频推荐
    videos: () =>
      this.fetchThenSetState('get_video_list-list', 'videos', {
        _: {
          limit: 8,
          order: {
            createTime: 'desc'
          },
          search: {
            from: 0
          }
        }
      }),

    // 资讯
    information: refresh =>
      this.fetchListThenSetState(
        'get_article_list',
        'information',
        {
          _: {
            limit: Const.__LIMIT__
          }
        },
        refresh
      )
  };

  page = {
    // 最近公告点击
    noticeClick: () => {
      Utils.router.push('/bbs/block?id=75', '/bbs/block/75');

      G.indexNoticeSetReaded();
    }
  };

  storeDidMount() {
    setTimeout(() => {
      this.fetch.checkRecentNotice();
    }, 1600);
  }
}
