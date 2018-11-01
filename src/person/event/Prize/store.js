/**
 * const prefixCls = 'style-264462';
 * const images = '/static/images/src/person/event/Prize';
 * @Author: czy0729
 * @Date: 2018-09-18 18:03:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 16:11:55
 * @Path m.benting.com.cn /src/person/event/Prize/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';
import { dataTypeDS } from '../_/ds';
import { orderTypeMap } from './ds';

export default class Store extends common {
  @observable
  state = this.initState({
    _payConfirm: {
      show: false
    },

    orderInfo: {}
  });

  fetch = {
    config: {
      every: ['orderInfo']
    },

    orderInfo: async () => {
      const { id } = this.params.params;

      return this.fetchThenSetState('get_bt_order_detail', 'orderInfo', {
        orderId: id
      });
    }
  };

  do = {
    payFee: async () => {
      const { orderinfo } = this.getState('orderInfo');
      const { orderNo, dataType } = orderinfo || {};

      // 支付邮费 判断本汀和灵动
      switch (Utils.getLabel(dataTypeDS, dataType)) {
        case '本汀余额':
          await Api.P('do_pay_bt', {
            orderNo,
            payPort: 0
          });
          break;

        case '灵动余额':
          await Api.P('do_pay_ld', {
            orderNo,
            payPort: 0
          });
          break;

        default:
          Utils.light('支付类型出错，请联系客服');
          return;
      }

      await this.fetch.orderInfo();
      this.page.hidePayConfirm();
      Utils.light('领取成功');
    }
  };

  page = {
    jumpEditAddress: () => {
      const { orderinfo } = this.getState('orderInfo');
      const { orderId, orderType } = orderinfo;

      Utils.router.push(
        `/person/order/address?id=${orderId}`,
        `/person/order/address/${orderId}`
      );

      // 设置列表刷新标志
      if (orderTypeMap[orderType]) {
        const store = window.Stores[orderTypeMap[orderType].storeKey];

        if (store) {
          store.setRefresh();
        }
      }
    },

    showPayConfirm: () =>
      this.setState(
        {
          show: true
        },
        '_payConfirm'
      ),

    hidePayConfirm: () =>
      this.setState(
        {
          show: false
        },
        '_payConfirm'
      )
  };
}
