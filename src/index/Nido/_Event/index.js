/**
 * const prefixCls = 'style-210486';
 * const images = '/static/images/src/index/Nido/_Event';
 * @Author: czy0729
 * @Date: 2018-08-02 14:41:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-02 15:15:02
 * @Path m.benting.com.cn /src/index/Nido/_Event/index.js
 */
import React from 'react';
import classNames from 'classnames';
import Top from './_Top';
import Middle from './_Middle';
import Bottom from './_Bottom';

const prefixCls = 'style-210486';

const _Event = props => {
  const { className } = props;

  return (
    <div className={classNames(prefixCls, className)}>
      <Top />
      <Middle />
      <Bottom />
    </div>
  );
};

export default _Event;
