/**
 * const prefixCls = 'style-108375';
 * const images = '/static/images/src/discovery/fish/Index';
 * @Author: czy0729
 * @Date: 2018-08-08 17:31:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-09 15:59:12
 * @Path m.benting.com.cn /src/discovery/fish/Index/_FixedTextarea.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { FixedTextarea } from '@components';

const prefixCls = 'style-108375';

@observer
export default class _FixedTextarea extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  render() {
    const { $ } = this.context;
    const { className } = this.props;
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
  }
}
