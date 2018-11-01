/**
 * const prefixCls = 'style-101574';
 * const images = '/static/images/src/person/prize/Detail';
 * @Author: czy0729
 * @Date: 2018-10-25 11:15:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 15:15:05
 * @Path bt_mb_new /src/person/prize/Detail/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import { Form } from '@components';
import Utils from '@utils';
import Attention from './_Attention';
import Pack from './_Pack';
import store from './store';

const Detail = (props, { $ }) => {
  const { tbId, _loaded } = $.getState('detail');

  return (
    <Layout title="优惠券详情">
      <Attention />
      <Pack className="mt-md" />
      {_loaded && (
        <Form.Button
          onClick={() =>
            Utils.router.push(
              `/person/prize/info/id=${tbId}`,
              `/person/prize/info/${tbId}`
            )
          }
        >
          完善信息
        </Form.Button>
      )}
    </Layout>
  );
};

Detail.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Detail));
