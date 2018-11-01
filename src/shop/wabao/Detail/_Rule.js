/**
 * const prefixCls = 'style-209773';
 * const images = '/static/images/src/shop/wabao/Detail';
 * @Author: czy0729
 * @Date: 2018-09-27 18:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-27 18:53:06
 * @Path m.benting.com.cn /src/shop/wabao/Detail/_Rule.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Rule } from '@_';

const prefixCls = 'style-209773';

const _Rule = ({ className }, { $ }) => {
  const { perLimit, perVipLimit } = $.getState('detail');

  return (
    <Rule
      className={classNames(prefixCls, className)}
      title="规则"
      showNum
      content={[
        '挖宝时间结束前，每个用户可以使用相应的积分进行挖宝，挖宝号顺序发放',
        '到达截止时间后，等待当天 039期 重庆时时彩出奖，计算“幸运号”，拥有“幸运号”者即可获得此商品',
        '计算公式：{(时间值之和 + 重庆时时彩) / 所需人次}取余数 + 初始号',
        `每期商品每个用户能参加${perLimit}次，VIP用户可以参加${perVipLimit}次`
      ]}
    />
  );
};

_Rule.contextTypes = {
  $: PropTypes.object
};

export default observer(_Rule);
