/**
 * const prefixCls = 'style-472913';
 * const images = '/static/images/src/person/prize/Detail';
 * @Author: czy0729
 * @Date: 2018-09-08 14:46:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-07 11:35:36
 * @Path bt_mb_new /src/person/prize/Detail/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';

export default class Store extends common {
  @observable
  state = this.initState({
    detail: {}
  });

  fetch = {
    config: {
      every: ['detail']
    },

    detail: () => {
      const { id } = this.params.params;

      return this.fetchThenSetState(
        'get_my-prize_detail',
        'detail',
        {
          recordId: id
        }
      );
    }
  };

  do = {
    doSubmit: async (value = 1) => {
      const { id } = this.params.params;

      await Api.P('do_lottery_submit-coupon-cashback-info', {
        recordId: id,
        ...value
      });

      Utils.light('提交成功');
    }
  };
}
