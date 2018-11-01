/**
 * const prefixCls = 'style-127567';
 * const images = '/static/images/src/person/prize/Info';
 * @Author: czy0729
 * @Date: 2018-10-25 14:31:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 15:06:56
 * @Path bt_mb_new /src/person/prize/Info/index.js
 */
import React from 'react';
import { injectV2, form } from '@';
import { Layout } from '@_';
import Form from './_Form';
import store from './store';

const Info = props => {
  const { form, onSubmit } = props;

  return (
    <Layout title="完善信息">
      <Form form={form} onSubmit={onSubmit} />
    </Layout>
  );
};

export default injectV2(store)(form(Info));
