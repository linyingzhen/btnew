/**
 * const prefixCls = 'style-460489';
 * const images = '/static/images/src/person/wallet/coin/Exchange';
 * @Author: czy0729
 * @Date: 2018-09-14 17:47:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-17 09:37:58
 * @Path m.benting.com.cn /src/person/wallet/coin/Exchange/_Input.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Form, Link } from '@components';
import Const from '@const';

const prefixCls = 'style-460489';

@observer
export default class _Input extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  state = {
    focused: true
  };

  render() {
    const { $ } = this.context;
    const { btAmount = '-' } = $.getState('walletInfo');
    const { form, className } = this.props;
    const { focused } = this.state;

    return (
      <Form
        className={classNames(prefixCls, className)}
        form={form}
        label
        renderHeader={
          <p className="t-30 l-42 t-sub">
            <span style={{ display: 'inline-block', minWidth: '2.4rem' }}>
              账户余额：
              {btAmount}
            </span>
            <Link className="t-primary ml-32" href="/pay/do">
              去充值
            </Link>
          </p>
        }
      >
        <Form.MoneyInput
          name="price"
          label="兑换数量"
          option={Const.rules.required}
          focused={focused}
          placeholder="请输入数量，10金币=1元"
          updatePlaceholder={false}
          format="int"
          onBlur={() => this.setState({ focused: false })}
          onFocus={() => this.setState({ focused: true })}
        />
      </Form>
    );
  }
}
