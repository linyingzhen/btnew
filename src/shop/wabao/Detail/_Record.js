/**
 * const prefixCls = 'style-416865';
 * const images = '/static/images/src/shop/wabao/Detail';
 * @Author: czy0729
 * @Date: 2018-09-27 18:55:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 11:21:40
 * @Path m.benting.com.cn /src/shop/wabao/Detail/_Record.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { ListView } from '@components';
import { Header } from '@_';
import Row from './_Row';

const prefixCls = 'style-416865';

const _Record = (props, { $ }) => {
  const { className } = props;
  const record = $.getState('record');

  return (
    <div className={classNames(prefixCls, className)}>
      <Header
        title="挖宝记录"
        isList
        desc={
          <>
            <span>已有</span>
            <span className="t-danger ml-xs mr-xs">
              {record._loaded ? record.pageinfo.recordtotal : '-'}
            </span>
            <span>人次参与</span>
          </>
        }
      />
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
