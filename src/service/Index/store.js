/**
 * const prefixCls = 'style-966577';
 * const images = '/static/images/src/service/Index';
 * @Author: czy0729
 * @Date: 2018-09-03 14:45:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-03 18:28:29
 * @Path m.benting.com.cn /src/service/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';
import G from '@stores/g';

export default class Store extends common {
  @observable
  state = this.initState({
    _tabs: {
      page: 0
    }
  });

  do = {
    // 登录后返回
    loginThenBack: async () => {
      G.setJump();
      Utils.router.push('/login');
    },

    // 注册自动登录后提交消费订单
    registerThenSubmit: async values => {
      const { mobile, code, pwd } = values;

      await Api.P('do_user_register', {
        mobile,
        code,
        pwd
      });

      await G.doLoginByPwd({
        account: mobile,
        pwd
      });

      this.do.submit(values);
    },

    // 提交消费订单
    submit: async values => {
      const { shopName, orderNo, cardImg } = values;

      await Api.P('do_consumer_add', {
        shopName,
        orderNo,
        cardImg
      });

      Utils.router.push('/service/success');
    }
  };

  page = {
    // Tab点击
    onTabClick: (item, index) => {
      this.setState({ page: index }, '_tabs');
    }
  };
}
