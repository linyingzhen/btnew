/**
 * const prefixCls = 'style-768143';
 * const images = '/static/images/src/shop/guess/Index';
 * @Author: czy0729
 * @Date: 2018-09-25 14:54:08
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-09-25 14:54:08
 * @Path m.benting.com.cn /src/shop/guess/Index/_List.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { ListView } from '@components';
import Row from './_Row';

const prefixCls = 'style-768143';

const _List = props => {
  const { data = {}, onEndReached, className } = props;
  const { nowTime } = data;

  return (
    <ListView
      className={classNames(prefixCls, className)}
      data={data}
      renderRow={item => <Row nowTime={nowTime} {...item} />}
      onEndReached={onEndReached}
    />
  );
};

export default observer(_List);
