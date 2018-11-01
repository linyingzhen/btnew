import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Header } from '@components';
import Styles from '@styles';

const prefixCls = 'style-2018101514387';

const _Header = () => (
  <div className={prefixCls}>
    <Header
      show
      title="推广邀请"
      bd={<p className="t-34 l-48 t-void">推广邀请</p>}
      style={{
        background: '#404040'
      }}
    />
    <style jsx global>{`
      .style-2018101514387 .t-34 {
        color: ${Styles.color_void} !important;
      }
    `}</style>
  </div>
);

_Header.contextTypes = {
  $: PropTypes.object
};

export default observer(_Header);
