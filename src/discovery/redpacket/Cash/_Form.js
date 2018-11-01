/**
 * const prefixCls = 'style-172535';
 * const images = '/static/images/src/discovery/redpacket/Cash';
 * @Author: czy0729
 * @Date: 2018-10-23 00:22:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 18:31:02
 * @Path bt_mb_new /src/discovery/redpacket/Cash/_Form.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Form } from '@components';
import Const from '@const';
import Utils from '@utils';

const _Form = (props, { $ }) => {
  const { form, label, onSubmit } = props;
  const { redPriceType } = $.getState();

  const amount = form.getFieldValue('amount');
  const total = form.getFieldValue('total');
  const title = Utils.trim(form.getFieldValue('title'));

  let _btnText = '发红包';
  let reminding = '';
  let disabled = true;

  if (redPriceType === 1) {
    if (
      amount >= 1 &&
      total >= 0 &&
      title != '' &&
      amount / total >= 0.1 &&
      amount / total <= 200
    ) {
      disabled = false;
      _btnText = `发红包(总金额${amount}元)`;
    }

    if (amount / total < 0.1 || amount / total > 200) {
      reminding = '单个红包金额不可低于0.1元高于200元';
    }

    if (amount < 1) {
      reminding = '红包总金额不可小于1元';
    }
  } else {
    if (amount >= 0.1 && amount <= 200 && title != '' && amount * total >= 1) {
      disabled = false;
      _btnText = `发红包(总金额${(amount * total).toFixed(2)}元)`;
    }

    if (amount < 0.1 || amount > 200) {
      reminding = '单个红包金额不可低于0.1元高于200元';
    }
    if (amount * total < 1) {
      reminding = '红包总金额不可小于1元';
    }
  }

  return (
    <>
      <Form form={form} label>
        <Form.MoneyInput
          label={label}
          name="amount"
          placeholder="0.00"
          extra="￥"
          maxLength={7}
          option={Const.rules.required}
        />
        <Form.Input
          label="红包个数"
          name="total"
          type="phone"
          extra="个"
          maxLength={3}
          option={Const.rules.required}
        />
        <Form.Textarea
          name="title"
          initialValue="大鲫大鲤，渔获多多"
          placeholder="请输入祝福语"
          count={80}
          option={Const.rules.required}
        />
      </Form>
      <p className="p-w t-24 t-danger mt-d">{reminding}</p>
      <Form.Button
        type="danger"
        disabled={disabled}
        onClick={() => onSubmit(form, $.page.check)}
      >
        {_btnText}
      </Form.Button>
    </>
  );
};

_Form.contextTypes = {
  $: PropTypes.object
};

export default observer(_Form);
