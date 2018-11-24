/**
 * const prefixCls = 'style-106895';
 * const images = '/static/images/src/person/event/Cashback';
 * @Author: czy0729
 * @Date: 2018-10-15 11:57:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-13 17:32:55
 * @Path m.benting.com.cn /src/person/event/Cashback/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import { ListView } from '@components';
import Row from './_Row';
import store from './store';

const Cashback = (props, { $ }) => {
  const eventList = $.getState('eventList');

  return (
    <Layout title="粉丝福利">
      <ListView
        className="tool-list-split mt-d"
        data={eventList}
        renderRow={item => <Row {...item} />}
        onEndReached={$.fetch.eventList}
      />
    </Layout>
  );
};

Cashback.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store, { login: true })(observer(Cashback));
