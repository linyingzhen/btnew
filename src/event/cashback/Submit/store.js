/**
 * const prefixCls = 'style-532341';
 * const images = '/static/images/src/event/cashback/Submit';
 * @Author: czy0729
 * @Date: 2018-10-15 16:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 18:12:57
 * @Path m.benting.com.cn /src/event/cashback/Submit/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';
import G from '@stores/g';

export default class Store extends common {
  @observable
  state = this.initState({
    userInfo: {},

    // 银行卡信息
    bank: {},

    // 活动信息
    eventDetail: {},

    // 填写过的信息
    detail: {}
  });

  fetch = {
    config: {
      static: ['userInfo'],
      one: ['eventDetail'],
      every: ['bank', 'detail']
    },

    // 用户信息
    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    // 银行卡信息
    bank: () => this.fetchThenSetState('get_user_bank_info', 'bank'),

    // 活动信息
    eventDetail: () => {
      const { id } = this.params.params;

      return this.fetchThenSetState('get_event_detail', 'eventDetail', {
        tbId: id
      });
    },

    // 填写过的信息
    detail: () => {
      const { id } = this.params.params;

      return this.fetchThenSetState('get_event_cash_back_detail', 'detail', {
        perateId: id
      });
    }
  };

  do = {
    // 检查订单号唯一
    checkOrder: orderNumber => {
      if (!orderNumber) {
        return false;
      }

      return Api.P('do_event_check-order-is-exist', {
        orderNumber
      });
    },

    // 提交表单信息
    submit: async values => {
      const { id } = this.params.params;
      const { orderNumber, createTime } = this.getState('detail');
      const { bankcardId } = this.getState('bank');

      const _values = { ...values };

      if (orderNumber !== _values.orderNumber) {
        const data = await this.do.checkOrder(_values.orderNumber);

        if (data !== 'ok') {
          Utils.light('订单号已录入过，请检查');
          return;
        }
      }

      _values.orderTime = Utils.formatDate(_values.orderTime);

      delete _values.bankName;
      delete _values.branchName;
      delete _values.bankNumber;
      delete _values.userName;

      if (createTime) {
        await Api.P('do_event_cash_back_update', {
          ..._values,
          bankcardId,
          perateId: id
        });

        Utils.light('重新提交成功');
      } else {
        await Api.P('do_event_cash_back_add', {
          ..._values,
          bankcardId,
          perateId: id
        });

        Utils.light('提交成功');
      }

      Utils.router.back();
    }
  };
}
