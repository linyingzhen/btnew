/**
 * const prefixCls = 'style-136640';
 * const images = '/static/images/src/index/Chat';
 * @Author: czy0729
 * @Date: 2018-10-21 17:36:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-21 18:00:01
 * @Path bt_mb_new /src/index/Chat/_Time.js
 */
import React from 'react';
import { observer } from '@';
import Utils from '@utils';

const _Time = ({ ctime }) => (
  <div className="t-c t-xs t-sub mt-lg">{Utils.date('m-d H:i', ctime)}</div>
);

export default observer(_Time);
