/**
 * const prefixCls = 'style-614958';
 * const images = '/static/images/src/account/Pwd';
 * @Author: czy0729
 * @Date: 2018-10-23 13:42:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 13:44:22
 * @Path bt_mb_new /src/account/Pwd/store.js
 */
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';

export default class Store extends common {
  do = {
    updatePwd: async values => {
      await Api.P('do_re_pwd', values);

      Utils.light('修改成功');
      Utils.router.back();
    }
  };
}
