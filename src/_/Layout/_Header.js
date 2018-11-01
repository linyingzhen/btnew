/**
 * const prefixCls = 'style-116571';
 * const images = '/static/images/src/_/Layout';
 * @Author: czy0729
 * @Date: 2018-06-20 17:18:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-16 15:42:47
 * @Path m.benting.com.cn \src\_\Layout\_Header.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Header } from '@components';
import Const from '@const';
import UI from '@stores/ui';

const _Header = (props, { pathname }) => {
  const { title, hideBack, hideLogo, hd, bd, ft, ...other } = props;
  const header = UI.getState('header');

  let _bd;
  if (Const.__WX__) {
    _bd = null;
  } else {
    _bd = bd === null ? null : bd || header.bd;
  }

  return (
    <Header
      title={title}
      pathname={pathname}
      hideBack={hideBack}
      hideLogo={hideLogo}
      {...header}
      {...other}
      hd={hd || header.hd}
      bd={_bd} // bd === null 时中间标题不显示
      ft={ft || header.ft}
    />
  );
};

_Header.contextTypes = {
  pathname: PropTypes.string
};

export default observer(_Header);
