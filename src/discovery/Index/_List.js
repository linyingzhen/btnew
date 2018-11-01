/**
 * const prefixCls = 'style-497800';
 * const images = '/static/images/src/discovery/Index';
 * @Author: czy0729
 * @Date: 2018-08-23 12:37:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-23 16:20:25
 * @Path m.benting.com.cn /src/discovery/Index/_List.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { ListView } from '@components';
import Row from './_Row';

const prefixCls = 'style-497800';

const _List = (props, { $ }) => {
  const { className } = props;
  const { redOpenIds, likeOpenIds } = $.getState('_discoveryRow');
  const discovery = $.getState('discovery');

  return (
    <ListView
      className={classNames(prefixCls, className)}
      data={discovery}
      refresh
      renderRow={item => (
        <Row
          redRecordsOpen={redOpenIds.includes(item.infoId)}
          likeRecordsOpen={likeOpenIds.includes(item.infoId)}
          {...item}
        />
      )}
      onEndReached={$.fetch.discovery}
    />
  );
};

_List.contextTypes = {
  $: PropTypes.object
};

export default observer(_List);
