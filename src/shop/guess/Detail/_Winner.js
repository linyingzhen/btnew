/**
 * const prefixCls = 'style-171763';
 * const images = '/static/images/src/shop/guess/Detail';
 * @Author: czy0729
 * @Date: 2018-09-26 18:21:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-27 09:31:57
 * @Path m.benting.com.cn /src/shop/guess/Detail/_Winner.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { ListView } from '@components';
import { Header } from '@_';
import Row from './_Row';

const prefixCls = 'style-171763';

const _Winner = (props, { $ }) => {
  const { className } = props;
  const winner = $.getState('winner');

  if (!winner.list.length) {
    return null;
  }

  return (
    <div className={classNames(prefixCls, className)}>
      <Header
        title="中奖名单"
        desc={
          <>
            <span>共有</span>
            <span className="t-danger ml-xs mr-xs">
              {(winner.pageinfo && winner.pageinfo.recordtotal) || '-'}
            </span>
            <span>人竞猜成功</span>
          </>
        }
        isList
      />
      <ListView
        data={winner}
        renderRow={item => <Row {...item} />}
        hideFooter
        onEndReached={$.fetch.winner}
      />
    </div>
  );
};

_Winner.contextTypes = {
  $: PropTypes.object
};

export default observer(_Winner);
