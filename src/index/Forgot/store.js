/**
 * const prefixCls = 'style-141184';
 * const images = '/static/images/src/index/Forgot';
 * @Author: czy0729
 * @Date: 2018-07-04 10:08:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-20 17:38:00
 * @Path m.benting.com.cn /src/index/Forgot/store.js
 */
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';

export default class Store extends common {
  do = {
    // 找回
    find: async values => {
      await Api.P('do_find_pwd', values);

      Utils.light('重设密码成功');
      Utils.router.back();
    }
  };
}
