/**
 * const prefixCls = 'style-456650';
 * const images = '/static/images/src/bbs/topic/Index';
 * @Author: czy0729
 * @Date: 2018-08-03 10:17:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-02 18:53:47
 * @Path m.benting.com.cn /src/bbs/topic/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import Utils from '@utils';
import { tabsDS, filter } from './ds';

export default class Store extends common {
  config = {
    cache: ['topicList', 'topic']
  };

  @observable
  state = this.initState({
    // tabs
    _affixTabs: {
      page: 0
    },

    // 话题列表
    topicList: Const.__EMPTY__,

    // 话题发帖列表
    topic: Const.__EMPTY__
  });

  params = {
    query: {}
  };

  setQuery = {
    // 话题
    topic: index => {
      const { title } = tabsDS[index];
      let query;

      switch (title) {
        case '推荐':
          query = {
            _: {
              limit: Const.__LIMIT__,
              order: {
                likeAdd: 'desc',
                replyNum: 'desc'
              },
              search: {
                'topicId[>]': 0,
                'createTime[>]': Utils.getTimestamp() - 7 * 24 * 60 * 60
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
              },
              search: {
                'topicId[>]': 0
              }
            }
          };
          break;

        case '精华':
          query = {
            _: {
              limit: Const.__LIMIT__,
              order: {
                createTime: 'desc'
              },
              search: {
                'topicId[>]': 0,
                isDigest: 1
              }
            }
          };
          break;

        default:
          break;
      }
      this.setParams({
        query
      });
    }
  };

  fetch = {
    config: {
      one: ['topicList'],
      update: ['topic']
    },

    // 话题列表
    topicList: () =>
      this.fetchThenSetState('get_topic_list', 'topicList', {
        _: {
          limit: 6
        },
        _filter: filter.topicList
      }),

    // 话题发帖列表
    topic: refresh => {
      const { query } = this.params;

      return this.fetchListThenSetState(
        'get_bbs_list',
        'topic',
        query,
        refresh
      );
    }
  };

  page = {
    // Tab点击
    onTabClick: (item, index) => {
      this.setQuery.topic(index);
      this.fetch.topic(true);
      this.setState({ page: index }, '_affixTabs');

      Utils.scrollTo(0);
    }
  };

  storeInit() {
    const { id = 1 } = this.params.params;

    this.setQuery.topic(id);
    this.setState({ page: id }, '_affixTabs');
  }
}
