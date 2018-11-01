/**
 * const prefixCls = 'style-214157';
 * const images = '/static/images/src/person/wallet/withdraw/Index';
 * @Author: czy0729
 * @Date: 2018-09-17 14:59:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-17 15:14:22
 * @Path m.benting.com.cn /src/person/wallet/withdraw/Index/_Input.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Form } from '@components';
import Const from '@const';

const prefixCls = 'style-214157';

@observer
export default class _Input extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  state = {
    focused: true
  };

  render() {
    const { form, className } = this.props;
    const { focused } = this.state;
    const { $ } = this.context;
    const { btAmount = 0 } = $.getState('walletInfo');

    let actualMoney = 0;
    const ipt = form.getFieldValue('price');
    if (ipt) {
      actualMoney = (ipt * 100 - Math.floor(ipt * 0.01 * 100)) / 100;
    }

    return (
      <Form
        className={classNames(prefixCls, className)}
        form={form}
        label
        style={{ marginTop: 0 }}
        renderFooter={
          !!actualMoney && (
            <p className="t-28 l-44 t-sub">
              实际到账 ¥{actualMoney.toFixed(2)} (手续费: ¥
              {(ipt - actualMoney).toFixed(2)})
            </p>
          )
        }
      >
        <Form.MoneyInput
          name="price"
          label="提现金额"
          option={Const.rules.required}
          focused={focused}
          updatePlaceholder={false}
          max={btAmount}
          extra={
            <span
              className="t-30 l-46 t-primary"
              onClick={() => $.page.onAllClick(form)}
            >
              全部提现
            </span>
          }
          onBlur={() => this.setState({ focused: false })}
          onFocus={() => this.setState({ focused: true })}
        />
      </Form>
    );
  }
}
