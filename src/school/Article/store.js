/**
 * const prefixCls = 'style-101503';
 * const images = '/static/images/src/school/Article';
 * @Author: czy0729
 * @Date: 2018-09-07 14:48:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-07 16:27:22
 * @Path m.benting.com.cn /src/school/Article/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import Utils from '@utils';
import { articleBlockDS } from '../Index/ds';

export default class Store extends common {
  @observable
  state = this.initState({
    // tabs
    _affixTabs: {
      page: 0
    },

    article: Const.__EMPTY__
  });

  params = {
    query: {}
  };

  setQuery = {
    article: id =>
      this.setParams({
        query: {
          _: {
            limit: Const.__LIMIT__,
            order: {
              displayState: 'desc',
              createTime: 'desc'
            },
            search: {
              forumId: articleBlockDS[id].value
            }
          }
        }
      })
  };

  fetch = {
    config: {
      one: ['article']
    },

    article: refresh => {
      const { query } = this.params;

      return this.fetchListThenSetState(
        'get_bbs_list',
        'article',
        query,
        refresh
      );
    }
  };

  page = {
    // Tab点击
    onTabClick: (item, index) => {
      this.setQuery.article(index);
      this.fetch.article(true);
      this.setState({ page: index }, '_affixTabs');

      Utils.scrollTo(0);
    }
  };

  storeInit() {
    const { id = 0 } = this.params.params;

    this.setQuery.article(id);
    this.setState({ page: id }, '_affixTabs');
  }
}
