/**
 * const prefixCls = 'style-108990';
 * const images = '/static/images/src/shop/auction/Detail';
 * @Author: czy0729
 * @Date: 2018-09-11 16:52:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 15:50:49
 * @Path m.benting.com.cn /src/shop/auction/Detail/_Record.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { ListView } from '@components';
import { Header } from '@_';
import Utils from '@utils';
import Row from './_Row';
import { auctionTypeDS } from '../Index/ds';

const prefixCls = 'style-108990';

const _Record = (props, { $ }) => {
  const { className } = props;
  const { auctionType } = $.getState('detail');
  const record = $.getState('record');
  const type = Utils.getLabel(auctionTypeDS, auctionType);

  return (
    <div className={classNames(prefixCls, className)}>
      <Header
        title="出价记录"
        desc={
          <>
            <span>当前已有</span>
            <span className="t-danger ml-xs mr-xs">
              {record._loaded ? record.pageinfo.recordtotal : '-'}
            </span>
            <span>人次出价</span>
          </>
        }
        isList
      />
      <ListView
        data={record}
        renderRow={item => <Row type={type} {...item} />}
        onEndReached={$.fetch.record}
      />
    </div>
  );
};

_Record.contextTypes = {
  $: PropTypes.object
};

export default observer(_Record);
