/**
 * const prefixCls = 'style-822944';
 * const images = '/static/images/src/account/WW';
 * @Author: czy0729
 * @Date: 2018-10-07 12:27:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-17 09:18:35
 * @Path m.benting.com.cn /src/account/WW/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';
import G from '@stores/g';

export default class Store extends common {
  @observable
  state = this.initState({
    userInfo: G.toJS('userInfo')
  });

  fetch = {
    config: {
      static: ['userInfo']
    },

    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    }
  };

  do = {
    submit: async values => {
      await Api.P('do_user_bind-ww', values);
      Utils.light('绑定成功');

      await G.fetchUserInfo();
      Utils.router.back();
    }
  };

  page = {
    check: value => {
      const _value = { ...value };
      _value.ww = Utils.trim(_value.ww);

      if (_value.ww.indexOf(' ') !== -1) {
        Utils.light('旺旺ID中不能有空格');
        return;
      }

      if (Utils.validate(_value.ww, 'mobile')) {
        Utils.light('旺旺ID不能为手机号');
        return;
      }

      Utils.onConfirm('一旦绑定后，只能通过客服修改。确认无误并且绑定?', () =>
        this.do.submit(_value));
    }
  };
}
