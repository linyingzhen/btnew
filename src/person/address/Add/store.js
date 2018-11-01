/**
 * const prefixCls = 'style-560476';
 * const images = '/static/images/src/person/address/Add';
 * @Author: czy0729
 * @Date: 2018-09-19 14:51:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-19 15:30:26
 * @Path m.benting.com.cn /src/person/address/Add/store.js
 */
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';

export default class Store extends common {
  do = {
    add: async values => {
      const [province, city, district] = values.city.split(',');

      await Api.P('do_new_set_address', {
        recName: values.recName,
        phone: String(values.phone).replace(/ /g, ''),
        province,
        city,
        district,
        address: values.address
      });

      Utils.light('添加成功');
      Utils.router.back();
    }
  };
}
