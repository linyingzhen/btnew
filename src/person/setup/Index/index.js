/**
 * const prefixCls = 'style-111865';
 * const images = '/static/images/src/person/setup/Index';
 * @Author: czy0729
 * @Date: 2018-10-23 13:36:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 13:48:49
 * @Path bt_mb_new /src/person/setup/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import { List, Form } from '@components';
import Const from '@const';
import Utils from '@utils';
import store from './store';

const Setup = (props, { $ }) => (
  <Layout title="设置">
    <List className="mt-d">
      <List.Item
        arrow="horizontal"
        href="/person/setup/infor"
        onClick={() => {
          Utils.router.push('/person/setup/infor');
        }}
      >
        我的资料
      </List.Item>
      <List.Item arrow="horizontal" href={Const.__ROUTER__.pwd}>
        修改密码
      </List.Item>
    </List>
    <Form.Button
      type="danger"
      onClick={() => Utils.onConfirm('确定退出登录?', $.do.logout)}
    >
      退出登录
    </Form.Button>
  </Layout>
);

Setup.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Setup));
