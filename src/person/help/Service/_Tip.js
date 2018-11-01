/**
 * const prefixCls = 'style-105431';
 * const images = '/static/images/src/person/help/Service';
 * @Author: Jun
 * @Date: 2018-08-10 18:01:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 14:21:32
 * @Path m.benting.com.cn /src/person/help/Service/_Tip.js
 */
import React from 'react';
import classNames from 'classnames';
import { Header } from '@_';

const prefixCls = 'style-368126';

const _Tip = ({ className }) => (
  <Header
    className={classNames(prefixCls, className)}
    title="温馨提示"
    desc="尊敬的大师们，天猫旗舰店与官网并不相同。如您有官网的问题请直接咨询官网客服哦，天猫旗舰店的客服并不清楚官网的问题。官网客服将竭诚为您服务。"
  />
);

export default _Tip;
