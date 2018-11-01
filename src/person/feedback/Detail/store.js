/**
 * const prefixCls = 'style-204377';
 * const images = '/static/images/src/person/feedback/Detail';
 * @Author: czy0729
 * @Date: 2018-09-10 14:07:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-10 15:40:00
 * @Path m.benting.com.cn /src/person/feedback/Detail/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';

export default class Store extends common {
  @observable
  state = this.initState({
    detail: {}
  });

  fetch = {
    config: {
      update: ['detail']
    },

    detail: async () => {
      const { id } = this.params.params;

      const res = this.fetchThenSetState('get_feedback_list', 'detail', {
        _: {
          search: {
            tbId: id
          }
        }
      });
      const data = await res;

      if (data.list.length) {
        this.setState(data.list[0], 'detail');

        const { tbId, replys, read } = data.list[0];
        const isReplied = !!replys;
        const isRead = isReplied && read == 0;

        if (!isRead) {
          this.do.setRead(tbId);
        }
      }

      return res;
    }
  };

  do = {
    setRead: tbId =>
      Api.P(
        'do_feedback_read',
        {
          tbId
        },
        {
          show: false
        }
      )
  };
}
