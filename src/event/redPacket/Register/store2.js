/**
 * const prefixCls = 'styles-12005199';
 * const images = '/static/images/src/event/redPacket/Register';
 * @Author: Jack
 * @Date:   2018-02-27 14:15:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-19 11:05:16
 * @Path btWap \src\event\redPacket\Register\store.js
 */
'use strict';

import React from 'react';
import { observable } from 'mobx';
import common from 'stores/common';
import Api from 'api';
import Const from 'const';
import Utils from 'utils';
import G from 'stores/g';

class store extends common {
  @observable
  state = this.initState({
    state: {
      float: false,
      amount: 0,
      registered: true,
      _filter: true
    }
  });

  /*==================== DS ====================*/

  /*==================== Action ====================*/
  doRegister = async values => {
    const { isGet, openId } = this.getParams().params;
    const { registered } = this.getState();

    if (isGet == 1) {
      Utils.light('该微信号已领取红包');
      return;
    }

    const _values = { ...values };
    if (registered) {
      _values.pwd = '';
    }
    const { amount } = await Api.P('do_register_red-packet', {
      ..._values,
      openId
    });
    this.doShow(amount);

    setTimeout(() => {
      if (_values.pwd) {
        this.doAutoLogin(values);
      }
    }, 200);
  };

  doAutoLogin = async values => {
    await G.doLoginByPwd({
      account: values.mobile,
      pwd: values.pwd
    });
  };

  /*==================== Page ====================*/
  checkMobile = async mobile => {
    const data = await Api.PP('get_mobile_check-exist', { mobile });

    const registered = data.code === 0 ? false : true;

    this.setState({ registered });
  };

  doShow = amount => {
    this.setState({
      float: true,
      amount
    });
  };

  doHide = () => {
    this.setState({
      float: false
    });
  };
}

export default store;
