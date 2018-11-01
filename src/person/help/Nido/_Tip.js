/**
 * const prefixCls = 'style-637381';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-01 18:06:27
 * @Last Modified by:   lyz0720
 * @Last Modified time: 2018-11-01 18:06:27
 * @Path bt_mb_new \src\person\help\Nido\_Tip.js.git
 */
import React from 'react';
import classNames from 'classnames';
import { Header } from '@_';

const prefixCls = 'style-637381';

const _Tip = ({ className }) => (
  <Header
    className={classNames(prefixCls, className)}
    title="温馨提示"
    desc="尊敬的大师们，所有与我们灵动相关的问题，如粉丝福利、灵动福利等。天猫、社区客服并不清楚我们的活动，所以请认准灵动客服喔！我们一定竭诚为你服务！"
  />
);

export default _Tip;
