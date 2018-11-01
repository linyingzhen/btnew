/**
 * const prefixCls = 'style-364047';
 * const images = '/static/images/src/auth/Detail';
 * @Author: czy0729
 * @Date: 2018-08-13 17:39:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-17 17:42:56
 * @Path m.benting.com.cn /src/auth/Detail/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';

export default class Store extends common {
  @observable
  state = this.initState({
    detail: {},
    logs: Const.__EMPTY__
  });

  fetch = {
    config: {
      one: ['logs']
    },

    detail: () => {
      const { id } = this.params.params;

      return this.fetchThenSetState('get_new-code_detail', 'detail', {
        _: {
          search: {
            codeNo: id
          }
        }
      });
    },

    logs: () => {
      const { id } = this.params.params;

      // get_new-code_search-logs
      return this.fetchThenSetState('get_code_query_list', 'logs', {
        _: {
          limit: Const.__LIMIT__,
          order: {
            createTime: 'desc'
          },
          search: {
            codeNo: id
          }
        }
      });
    }
  };
}
