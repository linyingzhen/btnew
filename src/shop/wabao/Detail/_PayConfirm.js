/**
 * const prefixCls = 'style-157255';
 * const images = '/static/images/src/shop/guess/Detail';
 * @Author: czy0729
 * @Date: 2018-09-26 16:14:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-28 15:18:34
 * @Path m.benting.com.cn /src/shop/guess/Detail/_PayConfirm.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { PayConfirm } from '@components';

const _PayConfirm = (props, { $ }) => {
  if ($.isEnd) {
    return null;
  }

  const { show, value } = $.getState('_payConfirm');
  const { point } = $.getState('detail');

  return (
    <PayConfirm
      show={show}
      type="nido"
      amount={value * parseInt(point)}
      onClose={$.page.hidePayConfirm}
      onConfirm={$.do.wabao}
    />
  );
};

_PayConfirm.contextTypes = {
  $: PropTypes.object
};

export default observer(_PayConfirm);
