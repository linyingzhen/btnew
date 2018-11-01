/**
 * const prefixCls = 'style-182735';
 * const images = '/static/images/src/_/Comment';
 * @Author: czy0729
 * @Date: 2018-07-22 12:47:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-22 18:46:46
 * @Path m.benting.com.cn /src/_/Comment/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { ListView, Empty } from '@components';
import Row from './_Row';

const prefixCls = 'style-182735';

const _Comment = props => {
  const { data, onCommentClick, onEndReached, className } = props;

  return (
    <ListView
      className={classNames(prefixCls, className)}
      data={data}
      renderRow={item => <Row onCommentClick={onCommentClick} {...item} />}
      renderEmpty={<Empty>来抢沙发吧...</Empty>}
      onEndReached={onEndReached}
    />
  );
};

export default observer(_Comment);
