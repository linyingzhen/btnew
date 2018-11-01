/**
 * const prefixCls = 'style-341819';
 * const images = '/static/images/src/pay/Result';
 * @Author: czy0729
 * @Date: 2018-09-21 17:52:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-21 17:54:32
 * @Path m.benting.com.cn /src/pay/Result/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';

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

      return this.fetchThenSetState('get_pay_result', 'detail', {
        orderNo: id
      });
    }
  };
}
