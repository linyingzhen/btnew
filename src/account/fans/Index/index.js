/**
 * const prefixCls = 'style-109692';
 * const images = '/static/images/src/account/Fans/Index';
 * @Author: czy0729
 * @Date: 2018-10-07 16:38:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-13 17:51:36
 * @Path m.benting.com.cn /src/account/Fans/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import Apply from './_Apply';
import Result from './_Result';
import store from './store';

const Fans = (props, { $ }) => {
  const { toggleShow } = $.getState('state');
  const { _loaded: _loadedUserInfo } = $.getState('userInfo');
  const { state } = $.getState('fansState');
  const { _loaded: _loadedFans } = $.getState('fans');

  if (!_loadedUserInfo || !_loadedFans) {
    return null;
  }

  return (
    <Layout title="粉丝认证" theme="fullTheme">
      {(state == '0' || toggleShow == 1) && <Apply />}
      {!toggleShow && <Result />}
    </Layout>
  );
};

Fans.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store, { login: true })(observer(Fans));
