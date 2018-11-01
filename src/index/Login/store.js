/**
 * const prefixCls = 'style-126004';
 * const images = '/static/images/src/index/Login';
 * @Author: czy0729
 * @Date: 2018-07-02 10:28:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-04 14:42:10
 * @Path m.benting.com.cn /src/index/Login/store.js
 */
import common from '@stores/commonV2';
import Utils from '@utils';
import G from '@stores/g';
import { lsKey } from './ds';

export default class Store extends common {
  do = {
    login: async values => {
      await G.doLoginByPwd(values);

      Utils.light('登录成功');
      Utils.lsSet(lsKey, {
        account: values.account,
        pwd: values.pwd
      });

      setTimeout(() => {
        // 若回调跳转方法返回false，跳到个人中心
        if (!G.doJump()) {
          Utils.router.push('/person');
        }
      }, 200);
    }
  };
}
