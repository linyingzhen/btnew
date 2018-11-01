/**
 * const prefixCls = 'style-503797';
 * const images = '/static/images/src/shop/guess/Detail';
 * @Author: czy0729
 * @Date: 2018-09-26 09:41:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 00:08:31
 * @Path m.benting.com.cn /src/shop/guess/Detail/_Record.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { ListView } from '@components';
import { Header } from '@_';
import Utils from '@utils';
import Row from './_Row';

const prefixCls = 'style-108990';

const _Record = (props, { $ }) => {
  const { className } = props;
  const { isMy } = $.getState();
  const record = $.getState('record');

  return (
    <div className={classNames(prefixCls, className)}>
      <Header
        title="竞猜记录"
        desc={
          <>
            <span>已有</span>
            <span className="t-danger ml-xs mr-xs">
              {record._loaded ? record.pageinfo.recordtotal : '-'}
            </span>
            <span>人次出价</span>
          </>
        }
        extra={
          <span
            className="t-32 l-48 t-sub"
            onClick={() => Utils.checkLogin($.page.switchGuessList)}
          >
            {isMy ? '全部' : '我的'}
          </span>
        }
        isList
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
