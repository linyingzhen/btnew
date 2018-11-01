/**
 * const prefixCls = 'style-621643';
 * const images = '/static/images/src/shop/miaosha/Detail';
 * @Author: czy0729
 * @Date: 2018-09-21 15:01:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-21 15:07:36
 * @Path m.benting.com.cn /src/shop/miaosha/Detail/_Record.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { ListView } from '@components';
import { Header } from '@_';
import Row from './_Row';

const prefixCls = 'style-621643';

const _Record = (props, { $ }) => {
  const { className } = props;
  const record = $.getState('record');

  return (
    <div className={classNames(prefixCls, className)}>
      <Header title="参与记录" isList={!!record.list.length} />
      <ListView
        data={record}
        renderRow={item => <Row {...item} />}
        onEndReached={$.fetch.record}
      />
    </div>
  );
};

_Record.contextTypes = {
  $: PropTypes.object
};

export default observer(_Record);
