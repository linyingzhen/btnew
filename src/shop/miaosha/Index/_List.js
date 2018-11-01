/**
 * const prefixCls = 'style-150622';
 * const images = '/static/images/src/shop/miaosha/Index';
 * @Author: czy0729
 * @Date: 2018-09-20 15:30:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-20 18:16:28
 * @Path m.benting.com.cn /src/shop/miaosha/Index/_List.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { ListView } from '@components';
import Row from './_Row';

const prefixCls = 'style-150622';

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
