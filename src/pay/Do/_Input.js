/**
 * const prefixCls = 'style-674991';
 * const images = '/static/images/src/pay/Do';
 * @Author: czy0729
 * @Date: 2018-09-17 14:20:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-17 14:46:32
 * @Path m.benting.com.cn /src/pay/Do/_Input.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Form } from '@components';
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
    const { form, className } = this.props;
    const { focused } = this.state;

    return (
      <Form
        className={classNames(prefixCls, className)}
        form={form}
        label
        style={{ marginTop: 0 }}
      >
        <Form.MoneyInput
          name="price"
          label="充值金额"
          option={Const.rules.required}
          focused={focused}
          updatePlaceholder={false}
          extra={<span className="t-34 l-34 t-title">元</span>}
          onBlur={() => this.setState({ focused: false })}
          onFocus={() => this.setState({ focused: true })}
        />
      </Form>
    );
  }
}
