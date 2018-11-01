/**
 * const prefixCls = 'style-141330';
 * const images = '/static/images/src/auth/Detail';
 * @Author: czy0729
 * @Date: 2018-09-03 10:31:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-03 11:23:19
 * @Path m.benting.com.cn /src/auth/Detail/_Log.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { List } from '@components';
import { Header } from '@_';
import Utils from '@utils';

const prefixCls = 'style-320213';

const _Log = (props, { $ }) => {
  const { className } = props;
  const { list } = $.getState('logs');

  if (list.length === 0) {
    return null;
  }

  return (
    <div className={classNames(prefixCls, className)}>
      <Header
        title="查询记录"
        desc={list.length > 1 && '此防伪码已多次查询'}
        isList
      />
      <List>
        {list.map((item, index) => (
          <List.Item key={item.tbId}>
            <p className="t-30 l-42 t-sub">
              查询时间：
              {Utils.date('Y-m:d H:i:s', item.createTime)}
              {index === 0 && ' (当前)'}
            </p>
            <p className="t-30 l-42 t-sub">
              操作系统：
              {item.system}
            </p>
            <p className="t-30 l-42 t-sub">
              ip：
              {item.IPArea} {item.IP}
            </p>
            <p className="t-30 l-42 t-sub">
              查询设备：
              {item.userDevice}
            </p>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

_Log.contextTypes = {
  $: PropTypes.object
};

export default observer(_Log);
