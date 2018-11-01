/**
 * const prefixCls = 'style-150589';
 * const images = '/static/images/src/shop/auction/Detail';
 * @Author: czy0729
 * @Date: 2018-09-12 16:13:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 15:46:55
 * @Path m.benting.com.cn /src/shop/auction/Detail/_PayConfirm.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { PayConfirm } from '@components';
import Utils from '@utils';
import { showStateDS } from '../Index/ds';

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
    const { show, addPrice } = $.getState('_payConfirm');
    const { showState, auctionType, appType } = $.getState('detail');
    const _showState = Utils.getLabel(showStateDS, showState);

    if (_showState !== '进行中') {
      return null;
    }

    let type;
    if (auctionType == 1) {
      type = 'coin';
    } else if (auctionType == 2) {
      if (appType == 1) {
        type = 'bt';
      } else if (appType == 2) {
        type = 'nido';
      }
    }

    return (
      <PayConfirm
        show={show}
        type={type}
        amount={addPrice}
        onClose={$.page.hidePayConfirm}
        onConfirm={$.do.auction}
      />
    );
  }
}
