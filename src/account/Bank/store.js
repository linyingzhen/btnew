/**
 * const prefixCls = 'style-136418';
 * const images = '/static/images/src/account/Bank';
 * @Author: czy0729
 * @Date: 2018-10-07 14:40:44
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-10-07 14:40:44
 * @Path m.benting.com.cn /src/account/Bank/store.js
 */
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';

export default class Store extends common {
  do = {
    submit: async values => {
      await Api.P('do_user_bind_bank', values);

      Utils.light('绑定成功');
      Utils.router.back();
    }
  };
}
