/**
 * const prefixCls = 'style-995589';
 * const images = '/static/images/src/discovery/redpacket/Coin';
 * @Author: czy0729
 * @Date: 2018-10-23 00:00:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-12 14:08:28
 * @Path bt_mb_new /src/discovery/redpacket/Coin/_Form.js
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
  let disabled = true;
  let reminding = '';

  if (redPriceType === 1) {
    if (
      amount >= 10 &&
      total >= 1 &&
      title != '' &&
      amount / total >= 1 &&
      amount / total <= 2000
    ) {
      disabled = false;
      _btnText = `发红包(总金币${amount}个)`;
    }

    if (amount / total < 1 || amount / total > 2000) {
      reminding = '单个红包金币不可低于1个高于2000个';
    }

    if (amount < 10) {
      reminding = '红包总金币不可小于10个';
    }
  } else {
    if (amount >= 1 && amount <= 2000 && title != '' && amount * total >= 10) {
      disabled = false;
      _btnText = `发红包(总金币${amount * total}个)`;
    }

    if (amount < 1 || amount > 2000) {
      reminding = '单个红包金币不可低于1个高于2000个';
    }

    if (amount * total < 10) {
      reminding = '红包总金币不可小于10个';
    }
  }

  return (
    <>
      <Form form={form} label>
        <Form.Input
          label={label}
          name="amount"
          type="phone"
          extra="个"
          maxLength={5}
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
          label="祝福语"
          name="title"
          initialValue="大鲫大鲤，渔获多多"
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
