/**
 * const prefixCls = 'style-115828';
 * const images = '/static/images/src/school/Tech';
 * @Author: czy0729
 * @Date: 2018-09-06 14:45:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-06 15:53:10
 * @Path m.benting.com.cn /src/school/Tech/_List.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { ListView } from '@components';
import Row from '../_/VideoItem';

const prefixCls = 'style-182735';

const _List = (props, { $ }) => {
  const { className } = props;
  const data = $.getState('video');

  return (
    <ListView
      className={classNames(prefixCls, className)}
      data={data}
      renderRow={item => <Row {...item} />}
      onEndReached={$.fetch.video}
    />
  );
};

_List.contextTypes = {
  $: PropTypes.object
};

export default observer(_List);
