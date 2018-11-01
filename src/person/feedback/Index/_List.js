/**
 * const prefixCls = 'style-195744';
 * const images = '/static/images/src/person/feedback/Index';
 * @Author: czy0729
 * @Date: 2018-09-10 10:25:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-10 12:18:05
 * @Path m.benting.com.cn /src/person/feedback/Index/_List.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { ListView } from '@components';
import Row from './_Row';

const prefixCls = 'style-195744';

const _List = (props, { $ }) => {
  const { className } = props;
  const data = $.getState('feedback');

  return (
    <ListView
      className={classNames(prefixCls, className, 'tool-list-split')}
      data={data}
      renderRow={item => <Row {...item} />}
      onEndReached={$.fetch.feedback}
    />
  );
};

_List.contextTypes = {
  $: PropTypes.object
};

export default observer(_List);
