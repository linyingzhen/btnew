/**
 * const prefixCls = 'style-493270';
 * const images = '/static/images/src/bbs/Article';
 * @Author: czy0729
 * @Date: 2018-07-11 16:52:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-14 13:43:14
 * @Path m.benting.com.cn /src/bbs/Article/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import Utils from '@utils';
import { tabsDS, filter } from './ds';

export default class Store extends common {
  config = {
    cache: ['videoTop', 'video']
  };

  @observable
  state = this.initState({
    // tabs
    _affixTabs: {
      page: 0
    },

    // 置顶视频
    videoTop: Const.__EMPTY__,

    // 视频
    video: Const.__EMPTY__
  });

  params = {
    // 视频
    queryVideo: {}
  };

  setQuery = {
    // 视频
    video: index => {
      const { title } = tabsDS[index];
      let query;

      switch (title) {
        case '推荐':
          query = {
            _: {
              limit: Const.__LIMIT__,
              order: {
                sortNo: 'desc',
                createTime: 'desc'
              }
            }
          };
          break;

        case '最新':
          query = {
            _: {
              limit: Const.__LIMIT__,
              order: {
                createTime: 'desc'
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
                from: 0
              }
            }
          };
          break;

        default:
          break;
      }

      this.setParams({
        queryVideo: query
      });
    }
  };

  fetch = {
    config: {
      one: ['videoTop'],
      update: ['video']
    },

    // 置顶视频
    videoTop: () =>
      this.fetchThenSetState('get_video_list-list', 'videoTop', {
        _: {
          limit: 3,
          search: {
            recomNo: [2, 50]
          }
        },
        _filter: filter.videoTop
      }),

    // 视频
    video: refresh => {
      const { queryVideo } = this.params;

      return this.fetchListThenSetState(
        'get_video_list-list',
        'video',
        {
          ...queryVideo,
          _filter: filter.video
        },
        refresh
      );
    }
  };

  page = {
    // Tab点击
    onTabClick: (item, index) => {
      this.setQuery.video(index);
      this.fetch.video(true);
      this.setState({ page: index }, '_affixTabs');

      Utils.scrollTo(0);
    }
  };

  storeInit() {
    const { id = 1 } = this.params.params;

    this.setQuery.video(id);
    this.setState({ page: id }, '_affixTabs');
  }
}
