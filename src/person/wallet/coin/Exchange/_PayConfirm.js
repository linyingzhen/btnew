/**
 * const prefixCls = 'style-554668';
 * const images = '/static/images/src/person/wallet/coin/Exchange';
 * @Author: czy0729
 * @Date: 2018-09-17 09:21:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-17 10:05:28
 * @Path m.benting.com.cn /src/person/wallet/coin/Exchange/_PayConfirm.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { PayConfirm } from '@components';

@observer
export default class _PayConfirm extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  componentWillUnmount() {
    const { $ } = this.context;

    $.page.reset();
  }

  render() {
    const { $ } = this.context;
    const { show, amount } = $.getState('_payConfirm');

    return (
      <PayConfirm
        show={show}
        amount={amount}
        onClose={$.page.hidePayConfirm}
        onConfirm={$.do.exchange}
      />
    );
  }
}
