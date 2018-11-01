/**
 * const prefixCls = 'style-115695';
 * const images = '/static/images/src/person/order/Address';
 * @Author: czy0729
 * @Date: 2018-09-19 11:52:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-19 19:00:21
 * @Path m.benting.com.cn /src/person/order/Address/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';

export default class Store extends common {
  @observable
  state = this.initState({
    state: {
      defaultIndex: ''
    },

    address: Const.__EMPTY__
  });

  fetch = {
    config: {
      every: ['address']
    },

    address: async () => {
      const res = this.fetchThenSetState('get_new_address_list', 'address');

      await res;

      // this.page.setDefault();

      return res;
    }
  };

  do = {
    submit: async () => {
      const { id } = this.params.params;
      const { defaultIndex } = this.getState();

      if (defaultIndex === '') {
        Utils.light('请选择一个地址');
        return;
      }

      await Api.P('do_set_order_address', {
        orderId: id,
        addressId: defaultIndex
      });

      Utils.light('设置成功');
      Utils.router.back();
    }
  };

  page = {
    setDefault: () => {
      const data = this.getState('address');

      let find;
      if (data.list.length) {
        find = data.list.find(item => item.default === 1);
      }

      if (find) {
        this.setState({ defaultIndex: find.addressId });
      }
    },

    changeIndex: defaultIndex => this.setState({ defaultIndex })
  };
}
