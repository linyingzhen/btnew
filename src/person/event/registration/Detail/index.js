/**
 * const prefixCls = 'style-134520';
 * const images = '/static/images/src/person/event/registration/Detail';
 * @Author: czy0729
 * @Date: 2018-06-27 15:25:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-17 10:02:09
 * @Path dev.tw-bt.com.mobile /src/person/event/registration/Detail/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer, form } from '@';
import { Layout } from '@_';
import { Form } from '@components';
import store from './store';

const Detail = (props, { $ }) => {
  const { form } = props;
  const {
    name,
    phone,
    ww,
    wechat,
    province,
    city,
    county,
    address,
    qq,
    message,
    order_no: orderNo,
    bank_name: bankName,
    bank_user: bankUser,
    bank_card: bankCard
  } = $.getState('registrationDetail');

  return (
    <Layout title="报名资料">
      <Form label form={form} renderHeader="我的活动信息">
        <Form.Input label="姓名" name="name" initialValue={name} disabled />
        <Form.Input label="手机号" name="phone" initialValue={phone} disabled />
        <Form.Input label="旺旺号" name="ww" initialValue={ww} disabled />
        <Form.Input
          label="微信昵称"
          name="wechat"
          initialValue={wechat}
          disabled
        />
        <Form.Input
          label="地区"
          name="area"
          initialValue={province ? `${province} ${city} ${county}` : ''}
          disabled
        />
        <Form.Input
          label="详细地址"
          name="address"
          initialValue={address}
          disabled
        />
        <Form.Input label="QQ" name="qq" initialValue={qq || '-'} disabled />
        <Form.Input
          label="备注"
          name="message"
          initialValue={message || '-'}
          disabled
        />
      </Form>
      {orderNo && (
        <Form className="mt-d" label form={form} renderHeader="我的订单信息">
          <Form.Input
            label="订单号"
            name="order_no"
            initialValue={orderNo}
            disabled
          />
          <Form.Input
            label="开户行"
            name="bank_name"
            initialValue={bankName}
            disabled
          />
          <Form.Input
            label="开户姓名"
            name="bank_user"
            initialValue={bankUser}
            disabled
          />
          <Form.Input
            label="银行卡号"
            name="bank_card"
            initialValue={bankCard}
            disabled
          />
        </Form>
      )}
    </Layout>
  );
};

Detail.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(form(observer(Detail)));
