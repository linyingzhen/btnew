/**
 * const prefixCls = 'style-263036';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-09-26 10:17:03
 * @Last Modified by:   mikey.zhaopeng
 * @Last Modified time: 2018-09-26 10:17:03
 * @Path m.benting.com.cn \src\person\event\Coupon\_List.js
 */

import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { ListView } from '@components';
import Row from './_Row';

const prefixCls = 'style-263036';

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
