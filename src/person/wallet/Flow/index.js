/**
 * const prefixCls = 'style-471178';
 * const images = '/static/images/src/person/wallet/Flow';
 * @Author: czy0729
 * @Date: 2018-09-13 09:46:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-13 12:22:29
 * @Path m.benting.com.cn /src/person/wallet/Flow/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import List from '../_/FlowList';
import store from './store';

const Flow = (props, { $ }) => {
  const data = $.getState('list');

  return (
    <Layout title="资金记录">
      <List
        className="mt-d"
        section={$.section}
        data={data}
        onEndReached={$.fetch.list}
      />
    </Layout>
  );
};

Flow.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Flow));
