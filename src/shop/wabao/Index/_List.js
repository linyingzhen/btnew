/**
 * const prefixCls = 'style-380107';
 * const images = '/static/images/src/shop/wabao/Index';
 * @Author: czy0729
 * @Date: 2018-09-27 16:36:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-28 16:16:47
 * @Path m.benting.com.cn /src/shop/wabao/Index/_List.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { ListView } from '@components';
import Utils from '@utils';
import Row from './_Row';

const prefixCls = 'style-380107';

const _List = props => {
  const { data = {}, onEndReached, className } = props;

  return (
    <ListView
      className={classNames(prefixCls, className)}
      data={data}
      renderRow={item => <Row nowTime={Utils.getTimestamp()} {...item} />}
      onEndReached={onEndReached}
    />
  );
};

export default observer(_List);
