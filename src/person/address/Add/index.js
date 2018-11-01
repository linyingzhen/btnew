/**
 * const prefixCls = 'style-988775';
 * const images = '/static/images';
 * @Author: cwz0525
 * @Date: 2018-08-29 17:09:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-21 10:51:23
 * @Path newProject \src\person\address\Add\index.js
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

const Add = (props, { $ }) => {
  const { form, onSubmit } = props;

  return (
    <Layout title="添加地址" bd={null}>
      <p
        className="p-sw t-48 l-66 t-b"
        style={{ background: Styles.color_theme }}
      >
        添加地址
      </p>
      <Form form={form} label style={{ marginTop: 0 }}>
        <Form.Input
          label="收货人"
          name="recName"
          option={Const.rules.required}
        />
        <Form.Input
          label="手机号码"
          name="phone"
          option={Const.rules.gen('mobile')}
          type="phone"
        />
        <CityPicker label="省市区" name="city" option={Const.rules.required} />
        <Form.Textarea
          name="address"
          title="详细地址"
          rows={3}
          option={Const.rules.required}
        />
      </Form>
      <Form.Button onClick={() => onSubmit(form, $.do.add)}>
        确认
      </Form.Button>
    </Layout>
  );
};

Add.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(form(observer(Add)));
