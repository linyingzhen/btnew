/**
 * const prefixCls = 'style-605472';
 * const images = '/static/images/src/index/Home';
 * @Author: cwz0525
 * @Date: 2018-08-10 11:58:02
 * @Last Modified by: cwz0525
 * @Last Modified time: 2018-08-30 16:34:11
 * @Path m.benting.com.cn \src\person\wallet\_Header.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Header, Icon } from '@components';

const _Header = () => (
  <div>
    <Header
      show
      title="每日签到"
      ft={
        <p>
          <Icon className="t-40 t-icon" type="message" />
          <Icon className="t-40 t-icon ml-24" type="information-circle-fill" />
        </p>
      }
      bd={<p className="t-34 l-48 t-icon">每日签到</p>}
      style={{
        background: '#404040'
      }}
    />
    <style jsx>{`
      .style-000000 {
      }
    `}</style>
  </div>
);

_Header.contextTypes = {
  $: PropTypes.object
};

export default observer(_Header);
