/**
 * const prefixCls = 'style-601153';
 * const images = '/static/images/src/person/help/Detail';
 * @Author: czy0729
 * @Date: 2018-09-08 14:46:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 14:48:33
 * @Path m.benting.com.cn /src/person/help/Detail/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';

export default class Store extends common {
  @observable
  state = this.initState({
    state: {
      isSubmit: false
    },

    helpDetail: {}
  });

  fetch = {
    config: {
      update: ['helpDetail']
    },

    // 获取问题详情
    helpDetail: async () => {
      const { id } = this.params.params;
      const res = Api.PP('get_user_helps', {
        _: {
          search: {
            tbId: id
          }
        }
      });
      const data = await res;

      if (data.code !== 0) {
        Utils.light(data.err);
        return false;
      }
      this.setState(data.data.list[0], 'helpDetail');

      return res;
    }
  };

  do = {
    isUseful: async (value = 1) => {
      const { isSubmit } = this.getState('state');
      if (isSubmit) {
        Utils.light('请勿重复提交');
        return;
      }

      this.setState({
        isSubmit: true
      });

      const { id } = this.params.params;
      await Api.P('do_user_helps-userful', {
        tbId: id,
        isUseful: value
      });

      Utils.light('提交成功');
    }
  };
}
