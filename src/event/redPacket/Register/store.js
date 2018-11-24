/**
 * const prefixCls = 'style-750221';
 * const images = '/static/images/src/event/redPacket/Register';
 * @Author: czy0729
 * @Date: 2018-11-19 10:19:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-19 14:01:23
 * @Path bt_mb_new /src/event/redPacket/Register/store.js.git
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';

export default class Store extends common {
  @observable
  state = this.initState({
    state: {
      float: false,
      amount: 0,
      registered: true
    }
  });

  fetch = {
    config: {}
  };

  do = {
    register: async values => {
      const { isGet, openId } = this.params.params;
      const { registered } = this.getState();

      if (isGet == 1) {
        Utils.light('该微信号已领取红包');
        return;
      }

      const _values = { ...values };
      if (registered) {
        _values.pwd = '';
      }
      const { amount } = await Api.P('do_register_red-packet', {
        ..._values,
        openId
      });
      this.doShow(amount);

      setTimeout(() => {
        if (_values.pwd) {
          this.doAutoLogin(values);
        }
      }, 200);
    }
  };

  page = {
    show: amount =>
      this.setState({
        float: true,
        amount
      }),

    hide: () =>
      this.setState({
        float: false
      })
  };
}
