/**
 * const prefixCls = 'style-607007';
 * const images = '/static/images';
 * @Author: cwz0525
 * @Date: 2018-08-29 15:55:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-19 15:44:19
 * @Path newProject \src\person\address\Detail\store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';

export default class Store extends common {
  @observable
  state = this.initState({
    addressInfo: {}
  });

  fetch = {
    config: {
      update: ['addressInfo']
    },

    addressInfo: async () => {
      const { id } = this.params.params;

      const res = this.fetchThenSetState(
        'get_new_address_list',
        'addressInfo',
        {
          _: {
            search: {
              addressId: id
            }
          }
        }
      );

      const data = await res;
      if (data.list.length) {
        this.setState(data.list[0], 'addressInfo');
      }

      return res;
    }
  };

  do = {
    save: async values => {
      const { id } = this.params.params;
      const [province, city, district] = values.city.split(',');

      await Api.P('do_new_set_address', {
        addressId: id,
        recName: values.recName,
        phone: String(values.phone).replace(/ /g, ''),
        province,
        city,
        district,
        address: values.address
      });

      Utils.light('修改成功');
      Utils.router.back();
    }
  };
}
