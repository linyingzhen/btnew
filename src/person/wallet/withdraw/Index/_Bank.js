/**
 * const prefixCls = 'style-825176';
 * const images = '/static/images/src/person/wallet/withdraw/Index';
 * @Author: czy0729
 * @Date: 2018-09-17 15:23:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-07 14:49:14
 * @Path m.benting.com.cn /src/person/wallet/withdraw/Index/_Bank.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Tips } from '@_';
import { List, Icon } from '@components';
import Const from '@const';
import { bankDS } from '@ds';

const prefixCls = 'style-825176';

const _Bank = (props, { $ }) => {
  const { className } = props;
  const { bankNo = '', bankName, _loaded } = $.getState('bankInfo');

  if (!_loaded) {
    return null;
  }

  let item;
  let hasBindCard = false;
  if (bankName) {
    item = bankDS.find(item => item.label.indexOf(bankName) !== -1);
    hasBindCard = true;
  }

  if (!item) {
    item = {};
  }

  return (
    <>
      <List className={classNames(prefixCls, className)}>
        {!hasBindCard ? (
          <List.Item
            extra="去绑定"
            arrow="horizontal"
            href={Const.__ROUTER__.bank}
          >
            <p className="t-30 l-42 t-title">您未绑定银行卡</p>
          </List.Item>
        ) : (
          <List.Item
            extra={
              <Icon
                className={`t-44 t-${item.type || 'primary'}`}
                type={item.icon ? `bank-${item.icon}` : 'card-fill'}
              />
            }
          >
            <p>
              <span className="t-30 l-42 t-title">{bankName}</span>
              <span className="t-24 l-34 t-sub ml-xs">
                尾号
                {bankNo.substr(bankNo.length - 4, 4)}
              </span>
            </p>
          </List.Item>
        )}
      </List>
      <Tips className="mt-32">提现涉及银行业务，实际到账时间会有延迟</Tips>
      <Tips>提现金额不得小于一元</Tips>
      <Tips>官网内所有余额提现手续费为1%</Tips>
    </>
  );
};

_Bank.contextTypes = {
  $: PropTypes.object
};

export default observer(_Bank);
