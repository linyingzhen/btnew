/**
 * const prefixCls = 'style-314949';
 * const images = '/static/images/src/person/wallet/coin/Exchange';
 * @Author: czy0729
 * @Date: 2018-09-14 16:24:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-17 09:41:05
 * @Path m.benting.com.cn /src/person/wallet/coin/Exchange/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, form, observer } from '@';
import { Form } from '@components';
import { Layout, Tips } from '@_';
import Styles from '@styles';
import FlowWrap from '../../_/FlowWrap';
import Input from './_Input';
import Blocks from './_Blocks';
import PayConfirm from './_PayConfirm';
import store from './store';

const Exchange = (props, { $ }) => {
  const { form, onSubmit } = props;
  const { sysAmount = '-' } = $.getState('walletInfo');

  return (
    <Layout
      title="兑换金币"
      bd={null}
      headerStyle={{
        color: Styles.color_theme,
        background: 'transparent'
      }}
    >
      <FlowWrap>
        <p className="t-48 l-66 t-void t-b t-c mt-64">{sysAmount}</p>
        <p className="t-24 l-34 t-void t-c mt-24">金币</p>
      </FlowWrap>
      <Input className="mt-d" form={form} />
      <Blocks className="mt-d" />
      <Tips className="mt-md">金币一经兑换将无法退款，请确认后再兑换。</Tips>
      <Form.Button
        onClick={() =>
          onSubmit(form, values => $.page.showPayConfirm(values, form))
        }
      >
        兑换
      </Form.Button>
      <PayConfirm />
    </Layout>
  );
};

Exchange.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(form(observer(Exchange)));
