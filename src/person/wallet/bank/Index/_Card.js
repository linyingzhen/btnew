/**
 * const prefixCls = 'style-985365';
 * const images = '/static/images/src/person/wallet/bank/Index';
 * @Author: czy0729
 * @Date: 2018-09-13 17:13:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-13 18:55:55
 * @Path m.benting.com.cn /src/person/wallet/bank/Index/_Card.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon } from '@components';
import { bankDS } from '@ds';

const prefixCls = 'style-985365';

const _Card = (props, { $ }) => {
  const { className } = props;
  const { bankName, bankNo } = $.getState('bank');

  let item;
  if (bankName) {
    item = bankDS.find(item => item.label.indexOf(bankName) !== -1);
  }

  if (!item) {
    item = {};
  }

  return (
    <div>
      <div
        className={classNames(`card card-${item.type || 'primary'}`, className)}
      >
        <Flex>
          <Icon
            className="t-28 t-void"
            type={item.icon ? `bank-${item.icon}` : 'card-fill'}
          />
          <p className="t-28 l-40 t-void ml-16">{item.label || bankName}</p>
        </Flex>
        <p className="t-48 l-66 t-void t-c t-b mt-64">
          {bankNo.replace(/^(\d{4})\d+(\d{4})$/, '$1 **** **** $2')}
        </p>
        <p className="t-sub8 l-40 t-void t-r mt-64">储蓄卡</p>
        <Icon
          className={`${prefixCls}__icon-bank t-void`}
          type={item.icon ? `bank-${item.icon}` : 'card-fill'}
        />
      </div>
      <p className="t-30 l-42 t-sub t-c mt-32">
        若要修改银行卡，请联系本汀客服
      </p>

      <style jsx global>{`
        .style-985365 {
        }
        .${prefixCls}__icon-bank {
          position: absolute;
          right: 0;
          bottom: 0;
          margin-right: -0.24rem;
          margin-bottom: -0.24rem;
          font-size: 2.6rem;
          opacity: 0.16;
        }
      `}</style>
      <style jsx>{`
        .style-985365 {
        }
        .card {
          position: relative;
          padding: 0.32rem;
          border-radius: 0.2rem;
          overflow: hidden;
        }
        .card-primary {
          background: linear-gradient(
            142deg,
            rgba(128, 224, 243, 1) 0%,
            rgba(66, 142, 255, 1) 100%
          );
        }
        .card-success {
          background: linear-gradient(
            117deg,
            rgba(81, 236, 160, 1) 0%,
            rgba(31, 206, 162, 1) 100%
          );
        }
        .card-danger {
          background: linear-gradient(
            142deg,
            rgba(255, 101, 101, 1) 0%,
            rgba(255, 125, 66, 1) 100%
          );
        }
        .card-warning {
          background: linear-gradient(
            135deg,
            rgba(255, 220, 94, 1) 0%,
            rgba(255, 186, 114, 1) 100%
          );
        }
      `}</style>
    </div>
  );
};

_Card.contextTypes = {
  $: PropTypes.object
};

export default observer(_Card);
