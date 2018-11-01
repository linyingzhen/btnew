/**
 * const prefixCls = 'style-254511';
 * const images = '/static/images/src/person/help/Index';
 * @Author: Jun
 * @Date: 2018-09-08 10:09:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 10:14:19
 * @Path m.benting.com.cn /src/person/help/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import Utils from '@utils';

export default class Store extends common {
  @observable
  state = this.initState({
    _loadingState: {
      isLoading: false
    },

    questions: Const.__EMPTY__
  });

  params = {
    queryQuestions: {
      _: {
        page: 1,
        limit: 5,
        search: {
          viewNum: 'desc'
        }
      }
    }
  };

  fetch = {
    config: {
      one: ['questions']
    },

    // 获取热门问题
    questions: refresh => {
      const { queryQuestions } = this.params;

      return this.fetchThenSetState(
        'get_user_helps',
        'questions',
        queryQuestions,
        refresh
      );
    }
  };

  page = {
    // 换一换
    changeQuestions: async () => {
      const { pageinfo } = this.state.questions;
      const { isLoading } = this.state._loadingState;

      if (isLoading) {
        Utils.light('加载中...');
        return false;
      }

      const query = {
        _: {
          page:
            pageinfo.page + 1 > pageinfo.pagetotal
              ? 1
              : pageinfo.page + 1,
          limit: 5,
          search: {
            viewNum: 'desc'
          }
        }
      };
      this.setParams({ queryQuestions: query });
      this.setState({ isLoading: true }, '_loadingState');

      const res = await this.fetch.questions(true);
      this.setState({ isLoading: false }, '_loadingState');

      return res;
    }
  };
}
