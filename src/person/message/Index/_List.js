/**
 * const prefixCls = 'style-101632';
 * const images = '/static/images/src/person/message/Index';
 * @Author: czy0729
 * @Date: 2018-10-05 20:46:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-05 23:06:07
 * @Path m.benting.com.cn /src/person/message/Index/_List.js
 */
import React from 'react';
import { observer } from '@';
import { ListView } from '@components';
import Row from './_Row';

const _List = props => {
  const { data = {}, onEndReached } = props;

  return (
    <ListView
      data={data}
      renderRow={item => <Row {...item} />}
      onEndReached={onEndReached}
    />
  );
};

export default observer(_List);
