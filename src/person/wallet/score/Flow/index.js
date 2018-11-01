/**
 * const prefixCls = 'style-926577';
 * const images = '/static/images/src/person/wallet/score/Flow';
 * @Author: czy0729
 * @Date: 2018-09-13 12:24:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-13 15:15:29
 * @Path m.benting.com.cn /src/person/wallet/score/Flow/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import List from '../../_/FlowList';
import store from './store';

const Flow = (props, { $ }) => {
  const data = $.getState('list');

  return (
    <Layout title="积分记录">
      <List
        className="mt-d"
        section={$.section}
        data={data}
        type="score"
        onEndReached={$.fetch.list}
      />
    </Layout>
  );
};

Flow.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Flow));
