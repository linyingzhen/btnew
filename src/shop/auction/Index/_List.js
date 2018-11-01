/**
 * const prefixCls = 'style-190631';
 * const images = '/static/images/src/shop/auction/Index';
 * @Author: czy0729
 * @Date: 2018-09-10 18:11:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-20 17:05:48
 * @Path m.benting.com.cn /src/shop/auction/Index/_List.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { ListView } from '@components';
import Row from './_Row';

const prefixCls = 'style-190631';

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
