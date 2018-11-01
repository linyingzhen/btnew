/**
 * const prefixCls = 'style-976540';
 * const images = '/static/images';
 * @Author: cwz0525
 * @Date: 2018-08-27 11:14:37
 * @Last Modified by: cwz0525
 * @Last Modified time: 2018-08-27 11:16:28
 * @Path newProject \src\person\Sign\Index\_Header.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Header } from '@components';

const _Header = () => (
  <div>
    <Header
      show
      title="推广邀请"
      bd={<p className="t-34 l-48 t-void">推广邀请</p>}
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
