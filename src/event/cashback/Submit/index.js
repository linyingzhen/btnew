/**
 * const prefixCls = 'style-107517';
 * const images = '/static/images/src/event/cashback/Submit';
 * @Author: czy0729
 * @Date: 2018-10-15 16:34:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 18:08:13
 * @Path m.benting.com.cn /src/event/cashback/Submit/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, form, observer } from '@';
import { Layout } from '@_';
import { Form, Link } from '@components';
import Const from '@const';
import Utils from '@utils';
import { shopDS } from './ds';
import store from './store';

const Submit = (props, { $ }) => {
  const { form, onSubmit } = props;
  const {
    orderTime,
    shop,
    orderNumber,
    createTime,
    _loaded: loadedDetail
  } = $.getState('detail');
  const {
    bankcardId,
    bankName,
    branchName,
    bankNo,
    cardUsername,
    _loaded: loadedBank
  } = $.getState('bank');
  const { tosTime } = $.getState('eventDetail');
  const { ww } = $.getState('userInfo');

  if (!loadedDetail || !loadedBank) {
    return null;
  }

  const now = Utils.getTimestamp();
  const _tosTime = Utils.toTimestamp(tosTime);
  const isNeedBrand =
    bankName != '工商银行' &&
    bankName != '农业银行' &&
    bankName != '中国银行' &&
    bankName != '建设银行';

  return (
    <Layout title="提交资料">
      <Form className="mt-d" form={form} label renderHeader="订单相关信息">
        <Form.DatePicker
          name="orderTime"
          label="订单日期"
          initialValue={orderTime || Utils.date('Y-m-d', now)}
          option={Const.rules.required}
          align="left"
        />
        <Form.Picker
          name="shop"
          label="订单店铺"
          initialValue={shop ? [shop] : [shopDS[0].value]}
          option={Const.rules.required}
          data={shopDS}
        />
        <Form.Input
          name="orderNumber"
          label="订单号"
          initialValue={orderNumber}
          option={Const.rules.required}
          type="number"
        />
        <Form.Input
          name="ww"
          label="旺旺ID"
          initialValue={ww}
          option={Const.rules.required}
          disabled
          extra={
            !ww && (
              <Link className="t-primary" href={Const.__ROUTER__.ww}>
                去绑定
              </Link>
            )
          }
        />
      </Form>
      <Form className="mt-d" form={form} label renderHeader="银行卡信息">
        <Form.Input
          name="bankName"
          label="银行名称"
          initialValue={bankName}
          option={Const.rules.required}
          disabled
          extra={
            !bankcardId && (
              <Link className="t-primary" href={Const.__ROUTER__.bank}>
                去绑定
              </Link>
            )
          }
        />
        {isNeedBrand && (
          <Form.Input
            name="branchName"
            label="支行名称"
            initialValue={branchName}
            option={Const.rules.required}
            disabled
          />
        )}
        <Form.Input
          name="bankNumber"
          label="银行卡号"
          initialValue={bankNo}
          option={Const.rules.gen('bank')}
          type="number"
          disabled
        />
        <Form.Input
          name="userName"
          label="持卡人"
          initialValue={cardUsername}
          option={Const.rules.required}
          disabled
        />
      </Form>
      {now > _tosTime ? (
        <Form.Button onClick={() => onSubmit(form, $.do.submit)}>
          {createTime ? '重新提交' : '提交'}
        </Form.Button>
      ) : (
        <Form.Button disabled>
          报名成功，
          {tosTime}
          后才能提交
        </Form.Button>
      )}
    </Layout>
  );
};

Submit.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(form(observer(Submit)));
