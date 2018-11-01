/**
 * const prefixCls = 'style-150589';
 * const images = '/static/images/src/shop/auction/Detail';
 * @Author: czy0729
 * @Date: 2018-09-12 16:13:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-21 15:40:29
 * @Path m.benting.com.cn /src/shop/auction/Detail/_PayConfirm.js
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
    const { dataType, panicType, salePrice } = $.getState('detail');

    let type;
    let _dataType;
    let amount;
    if (dataType == 2) {
      if (panicType == 1) {
        // 本汀余额
        type = 'amount';
        _dataType = 2;
        amount = salePrice;
      } else {
        // 金币
        type = 'coin';
        amount = (salePrice * 1000) / 100;
      }
    } else {
      // 灵动余额
      type = 'amount';
      _dataType = 1;
      amount = salePrice;
    }

    return (
      <PayConfirm
        show={show}
        type={type}
        dataType={_dataType}
        amount={amount}
        onClose={$.page.hidePayConfirm}
        onConfirm={$.do.miaosha}
      />
    );
  }
}
