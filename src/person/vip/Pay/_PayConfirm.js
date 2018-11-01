/**
 * const prefixCls = 'style-193182';
 * const images = '/static/images/src/person/vip/Pay';
 * @Author: czy0729
 * @Date: 2018-10-17 23:35:51
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-10-31 18:09:33
 * @Path m.benting.com.cn /src/person/vip/Pay/_PayConfirm.js
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

    $.page.hidePayConfirm();
  }

  render() {
    const { $ } = this.context;
    const { show, amount } = $.getState('_payConfirm');

    return (
      <PayConfirm
        show={show}
        type="amount"
        dataType="1"
        amount={amount}
        onClose={$.page.hidePayConfirm}
        onConfirm={$.do.pay}
      />
    );
  }
}
