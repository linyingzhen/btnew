/**
 * const prefixCls = 'style-162333';
 * const images = '/static/images';
 * @Author: cwz0525
 * @Date: 2018-08-29 10:44:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-19 15:47:53
 * @Path newProject \src\person\address\Index\store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';

export default class Store extends common {
  @observable
  state = this.initState({
    address: Const.__EMPTY__
  });

  fetch = {
    config: {
      every: ['address']
    },

    address: () => this.fetchThenSetState('get_new_address_list', 'address', {
      _: {
        limit: Const.__LIMIT__,
        order: {
          addressId: 'desc'
        }
      }
    })
  };

  do = {
    setDefault: async addressId => {
      await Api.P('do_new_set_address', {
        addressId,
        default: 1
      });

      Utils.light('设置成功');
      this.fetch.address();
    },

    delete: async addressId => {
      await Api.P('do_new_delete_address', {
        addressId
      });

      Utils.light('删除成功');
      this.fetch.address();
    }
  };
}
