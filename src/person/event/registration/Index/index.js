/**
 * const prefixCls = 'style-388194';
 * const images = '/static/images/src/person/event/registration/Index';
 * @Author: czy0729
 * @Date: 2018-10-16 17:57:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-13 17:33:51
 * @Path m.benting.com.cn /src/person/event/registration/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { ListView } from '@components';
import { Layout } from '@_';
import Row from './_Row';
import store from './store';

const Registration = (props, { $ }) => {
  const data = $.getState('registration');

  return (
    <Layout title="社区活动">
      <ListView
        className="tool-list-split mt-d"
        data={data}
        renderRow={item => <Row {...item} />}
        onEndReached={$.fetch.registration}
      />
    </Layout>
  );
};

Registration.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store, { login: true })(observer(Registration));
