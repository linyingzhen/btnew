/**
 * const prefixCls = 'style-172988';
 * const images = '/static/images/src/pay/Do';
 * @Author: czy0729
 * @Date: 2018-09-17 14:51:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-17 14:52:51
 * @Path m.benting.com.cn /src/pay/Do/_Radio.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Radio } from 'antd-mobile';
import { observer } from '@';
import { List, Icon } from '@components';

const prefixCls = 'style-172988';

const _Radio = (props, { $ }) => {
  const { className } = props;
  const { payType } = $.getState();

  return (
    <List
      className={classNames(prefixCls, className)}
      renderHeader={() => '选择支付方式'}
    >
      <Radio.RadioItem
        thumb={<Icon className="t-44 t-success" type="wechat-fill" />}
        checked={payType === 'wx'}
        onClick={() => $.page.changeType('wx')}
      >
        微信
      </Radio.RadioItem>
      <Radio.RadioItem
        thumb={<Icon className="t-44 t-primary" type="alipay-circle-fill" />}
        checked={payType === 'alipay'}
        onClick={() => $.page.changeType('alipay')}
      >
        支付宝
      </Radio.RadioItem>
    </List>
  );
};

_Radio.contextTypes = {
  $: PropTypes.object
};

export default observer(_Radio);
