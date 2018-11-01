/**
 * const prefixCls = 'style-111924';
 * const images = '/static/images/src/discovery/fish/Index';
 * @Author: czy0729
 * @Date: 2018-08-09 15:38:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-12 15:15:08
 * @Path m.benting.com.cn /src/discovery/fish/Index/_Header.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Header } from '@components';

const _Header = (props, { $ }) => {
  const { rule = '' } = $.getState('specialGoods');
  const isSpecial = !!rule;

  return (
    <Header
      show
      bd={null}
      ft={
        <span
          className={classNames('t-34 l-48', {
            't-primary': !isSpecial,
            't-danger': isSpecial
          })}
          onClick={$.page.showRule}
        >
          {isSpecial ? '特殊规则' : '查看规则'}
        </span>
      }
    />
  );
};

_Header.contextTypes = {
  $: PropTypes.object
};

export default observer(_Header);
