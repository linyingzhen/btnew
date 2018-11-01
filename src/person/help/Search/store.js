/**
 * const prefixCls = 'style-174906';
 * const images = '/static/images/src/person/help/Search';
 * @Author: czy0729
 * @Date: 2018-09-08 15:02:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 15:24:51
 * @Path m.benting.com.cn /src/person/help/Search/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import Utils from '@utils';

export default class Store extends common {
  @observable
  state = this.initState({
    state: {
      keywords: '',
      title: ''
    },

    searchList: Const.__EMPTY__
  });

  params = {
    search: '',
    query: {}
  };

  fetch = {
    config: {
      update: ['list']
    },

    // 获得搜索结果
    list: () => {
      const { id } = this.params.params;
      const { keywords } = this.getState('state');

      if (id && !keywords) {
        this.setParams({
          query: {
            _: {
              search: {
                class: id
              }
            }
          }
        });

        this.page.setTitle(id);
      }

      const { query } = this.params;

      return this.fetchListThenSetState(
        'get_user_helps',
        'searchList',
        query,
        true
      );
    },

    // 搜索问题
    search: async () => {
      const { keywords } = this.getState('state');

      if (!keywords) {
        Utils.light('请输入问题');
        return;
      }

      this.setParams({
        search: keywords,
        query: {
          _: {
            search: {
              'tit[~]': keywords
            }
          }
        }
      });

      this.fetch.list(true);
    }
  };

  page = {
    // 输入关键字
    keywordsChange: e => {
      const { value } = e.target;

      this.setState({ keywords: value }, 'state');
    },

    setTitle: index => {
      const titleArr = {
        1: '银行卡',
        2: '账号处罚',
        3: '优惠券',
        4: '活动问题',
        5: '等级积分',
        6: 'VIP问题'
      };
      const tit = titleArr[index];
      this.setState({ title: tit }, 'state');
    }
  };
}
