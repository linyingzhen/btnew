/**
 * const prefixCls = 'style-447446';
 * const images = '/static/images/src/event/sign/Index';
 * @Author: czy0729
 * @Date: 2018-10-20 15:44:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-20 15:49:34
 * @Path bt_mb_new /src/event/sign/Index/_Rule.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Rule } from '@components';

const _Rule = (props, { $ }) => {
  const { show } = $.getState('_rule');

  return (
    <Rule
      show={show}
      content={[
        '每日签到可随机获得5-10分',
        '每天前10名签到除签到本身积分外可以额外获得积分，分别为第一名30分，第二名25分，第三名20分，4-10名全部15分',
        '一周全勤可领取88积分',
        '签到先锋所得积分于每晚凌晨2:00发放'
      ]}
      showNum
      onClose={$.page.hideRule}
    />
  );
};

_Rule.contextTypes = {
  $: PropTypes.object
};

export default observer(_Rule);
