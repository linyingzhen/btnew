/**
 * const prefixCls = 'style-208545';
 * const images = '/static/images/src/person/address/Update';
 * @Author: czy0729
 * @Date: 2018-09-19 15:33:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-19 15:45:37
 * @Path m.benting.com.cn /src/person/address/Update/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer, injectV2, form } from '@';
import { Layout } from '@_';
import { Form } from '@components';
import CityPicker from '@components/Form/CityPicker';
import store from './store';
import Const from '@const';
import Styles from '@styles';

const Update = (props, { $ }) => {
  const { form, onSubmit } = props;
  const { recName, phone, province, city, district, address } = $.getState(
    'addressInfo'
  );

  return (
    <Layout title="修改地址" bd={null}>
      <p
        className="p-sw t-48 l-66 t-b"
        style={{ background: Styles.color_theme }}
      >
        修改地址
      </p>
      <Form form={form} label style={{ marginTop: 0 }}>
        <Form.Input
          label="收货人"
          name="recName"
          initialValue={recName}
          option={Const.rules.required}
        />
        <Form.Input
          label="手机号码"
          name="phone"
          initialValue={phone}
          option={Const.rules.gen('mobile')}
          type="phone"
        />
        <CityPicker
          label="省市区"
          name="city"
          initialValue={[province, city, district]}
          option={Const.rules.required}
        />
        <Form.Textarea
          name="address"
          title="详细地址"
          rows={3}
          initialValue={address}
          option={Const.rules.required}
        />
      </Form>
      <Form.Button onClick={() => onSubmit(form, $.do.save)}>保存</Form.Button>
    </Layout>
  );
};

Update.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(form(observer(Update)));
