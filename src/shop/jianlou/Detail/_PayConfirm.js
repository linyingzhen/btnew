/**
 * const prefixCls = 'style-435605';
 * const images = '/static/images/src/shop/jianlou/Detail';
 * @Author: czy0729
 * @Date: 2018-09-23 22:23:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-23 22:24:44
 * @Path m.benting.com.cn /src/shop/jianlou/Detail/_PayConfirm.js
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
    const { tag } = this.props;

    if (tag !== '进行中') {
      return null;
    }

    const { $ } = this.context;
    const { show } = $.getState('_payConfirm');
    const { salePrice } = $.getState('detail');

    return (
      <PayConfirm
        show={show}
        type="coin"
        amount={salePrice}
        onClose={$.page.hidePayConfirm}
        onConfirm={$.do.miaosha}
      />
    );
  }
}
