/**
 * const prefixCls = 'style-162968';
 * const images = '/static/images/src/person/prize/Index';
 * @Author: lyz0720
 * @Date: 2018-09-21 11:50:44
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-10-25 10:12:59
 * @Path bt_mb_new /src/person/prize/Index/_List.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { ListView } from '@components';
import Row from './_Row';

const _List = props => {
  const { data = {}, onEndReached, className } = props;
  const { nowTime } = data;

  return (
    <ListView
      className={classNames(className, 'tool-list-split')}
      data={data}
      renderRow={item => <Row nowTime={nowTime} {...item} />}
      onEndReached={onEndReached}
    />
  );
};

_List.contextTypes = {
  $: PropTypes.object
};

export default observer(_List);
