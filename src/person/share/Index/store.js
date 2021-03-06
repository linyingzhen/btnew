/**
 * const prefixCls = 'style-185228';
 * const images = '/static/images';
 * @Author: cwz0525
 * @Date: 2018-08-27 11:00:48
 * @Last Modified by: cwz0525
 * @Last Modified time: 2018-08-28 15:09:40
 * @Path newProject \src\person\share\Index\ds.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Utils from '@utils';
import Api from '@api';
import G from '@stores/g';

export default class Store extends common {
  @observable
  state = this.initState({
    code: '',
    userInfo: G.toJS('userInfo'),
    state: {
      isSend: false,
      smsWindow: false
    }
  });

  params = {};

  setQuery = {};

  fetch = {
    config: {
      static: [['userInfo', 'userInfo']],
      update: ['code']
    },
    // 用户信息
    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },
    // 邀请码
    code: () => {
      this.fetchThenSetState('get_invite_code', 'code');
    }
  };
  computed = {};

  do = {
    // 发送短信
    doSend: async values => {
      const { isSend } = this.getState();

      if (isSend) {
        return Utils.light('已发送，请稍后再试');
      }

      await Api.P('do_invite_send-sms', values);

      Utils.light('发送短信成功');
      this.setState({
        isSend: true
      });
      return false;
    }
  };

  page = {
    showSMSModal: () => {
      this.setState({ smsWindow: true });
    },
    hideSMSModal: () => {
      this.setState({ smsWindow: false });
    }
  };
}
