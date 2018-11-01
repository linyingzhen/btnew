/**
 * const prefixCls = 'style-136097';
 * const images = '/static/images/src/pay/Do';
 * @Author: czy0729
 * @Date: 2018-09-17 12:15:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-17 14:53:23
 * @Path m.benting.com.cn /src/pay/Do/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, form, observer } from '@';
import { Layout } from '@_';
import { Form } from '@components';
import Const from '@const';
import Styles from '@styles';
import FlowWrap from '@src/person/wallet/_/FlowWrap';
import Input from './_Input';
import Radio from './_Radio';
import store from './store';

@injectV2(store)
@form
@observer
export default class Do extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  componentDidMount() {
    const { $ } = this.context;

    if (Const.__WX__) {
      $.setState({
        payType: 'wx'
      });
    } else {
      $.setState({
        payType: 'alipay'
      });
    }
  }

  render() {
    const { form, onSubmit } = this.props;
    const { $ } = this.context;
    const { btAmount = '-' } = $.getState('walletInfo');

    return (
      <Layout
        title="充值"
        bd={null}
        headerStyle={{
          color: Styles.color_theme,
          background: 'transparent'
        }}
      >
        <FlowWrap>
          <p className="t-48 l-66 t-void t-b t-c mt-64">{btAmount}</p>
          <p className="t-24 l-34 t-void t-c mt-24">当前账户余额</p>
        </FlowWrap>
        <Input form={form} />
        <Radio className="mt-d" />
        <Form.Button onClick={() => onSubmit(form, $.do.charge)}>
          充值
        </Form.Button>
      </Layout>
    );
  }
}
