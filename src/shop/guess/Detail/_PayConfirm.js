/**
 * const prefixCls = 'style-157255';
 * const images = '/static/images/src/shop/guess/Detail';
 * @Author: czy0729
 * @Date: 2018-09-26 16:14:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-27 09:28:59
 * @Path m.benting.com.cn /src/shop/guess/Detail/_PayConfirm.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { PayConfirm } from '@components';
import Utils from '@utils';
import { guessTypeDS, dataTypeDS } from './ds';

const _PayConfirm = (props, { $ }) => {
  if ($.isEnd) {
    return null;
  }

  const { show } = $.getState('_payConfirm');
  const { guessType, dataType, perPrice } = $.getState('detail');

  let type;
  const _guessType = Utils.getLabel(guessTypeDS, guessType);
  if (_guessType === '金币') {
    type = 'coin';
  } else if (_guessType === '积分') {
    const _dataType = Utils.getLabel(dataTypeDS, dataType);

    if (_dataType === '灵动积分') {
      type = 'nido';
    } else if (_dataType === '本汀积分') {
      type = 'bt';
    }
  }

  return (
    <PayConfirm
      show={show}
      type={type}
      amount={perPrice}
      onClose={$.page.hidePayConfirm}
      onConfirm={$.do.guess}
    />
  );
};

_PayConfirm.contextTypes = {
  $: PropTypes.object
};

export default observer(_PayConfirm);
