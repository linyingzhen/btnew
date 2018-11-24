/**
 * const prefixCls = 'style-162328';
 * const images = '/static/images/src/event/car/Index';
 * @Author: czy0729
 * @Date: 2018-11-09 10:54:41
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-11-09 10:54:41
 * @Path bt_mb_new /src/event/car/Index/_FixedTextarea.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { FixedTextarea } from '@components';

const prefixCls = 'style-162328';

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
