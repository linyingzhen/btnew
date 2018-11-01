/**
 * const prefixCls = 'style-154683';
 * const images = '/static/images/src/person/wallet/withdraw/Index';
 * @Author: czy0729
 * @Date: 2018-09-14 11:58:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-17 15:35:02
 * @Path m.benting.com.cn /src/person/wallet/withdraw/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, form, observer } from '@';
import { Layout } from '@_';
import { Form } from '@components';
import Styles from '@styles';
import FlowWrap from '../../_/FlowWrap';
import Input from './_Input';
import Bank from './_Bank';
import store from './store';

const Withdraw = (props, { $ }) => {
  const { form, onSubmit } = props;
  const { btAmount = '-' } = $.getState('walletInfo');

  return (
    <Layout
      title="提现"
      bd={null}
      headerStyle={{
        color: Styles.color_theme,
        background: 'transparent'
      }}
    >
      <FlowWrap>
        <p className="t-48 l-66 t-void t-b t-c mt-64">{btAmount}</p>
        <p className="t-24 l-34 t-void t-c mt-24">可提现余额</p>
      </FlowWrap>
      <Input form={form} />
      <Bank className="mt-d" />
      <Form.Button
        onClick={() => onSubmit(form, values => $.do.submit(values, form))}
      >
        提现
      </Form.Button>
    </Layout>
  );
};

Withdraw.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(form(observer(Withdraw)));
