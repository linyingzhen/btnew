/**
 * const prefixCls = 'style-286679';
 * const images = '/static/images/src/discovery/Index';
 * @Author: czy0729
 * @Date: 2018-07-09 18:23:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-21 16:59:35
 * @Path m.benting.com.cn /src/discovery/Index/_FixedTextarea.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { FixedTextarea } from '@components';

const prefixCls = 'style-286679';

const _FixedTextarea = (props, { $ }) => {
  const { className } = props;
  const { show, placeholder, onSubmit } = $.getState('_fixedTextarea');

  return (
    <FixedTextarea
      className={classNames(prefixCls, className)}
      show={show}
      placeholder={placeholder}
      onSubmit={onSubmit}
      onClose={$.page.hideFixedTextarea}
    />
  );
};

_FixedTextarea.contextTypes = {
  $: PropTypes.object
};

export default observer(_FixedTextarea);
