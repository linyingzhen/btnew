/**
 * const prefixCls = 'style-174814';
 * const images = '/static/images/src/event/car/UserStatus';
 * @Author: czy0729
 * @Date: 2018-11-09 18:17:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-21 11:30:20
 * @Path bt_mb_new /src/event/car/UserStatus/_Row.js.git
 */
import React from 'react';
import { observer } from '@';
import { List, Flex } from '@components';
import Utils from '@utils';
import { auditDS } from '../ds';

const _Row = props => {
  const {
    created_at: createdAt,
    order_no: orderNo,
    audit_at: auditAt,
    audit,
    cnt,
    reason
  } = props;

  const _audit = Utils.getLabel(auditDS, audit);
  let type;
  let text;
  let extra;
  if (_audit === '审核通过') {
    type = 'success';
    text = '通过时间';
    extra = '通过';
  } else if (_audit === '审核不通过') {
    type = 'danger';
    text = '不通过时间';
    extra = '未通过';
  } else if (_audit === '审核中') {
    type = 'sub';
    text = '请耐心等待审核';
    extra = '审核中';
  }

  return (
    <List.Item>
      <Flex align="start">
        <p className="t-24 t-sub" style={{ minWidth: '1.1rem' }}>
          {Utils.date('y-m-d', createdAt)}
        </p>
        <Flex.Item className="t-24 l-40 ml-48">
          <p className="t-24">订单号：{orderNo}</p>
          <p className="t-24 t-sub mt-16">
            <span>{text}</span>
            {!!auditAt && <span>：{Utils.date(auditAt)}</span>}
          </p>
          {reason && <p className={`t-24 t-${type} mt-16`}>原因：{reason}</p>}
        </Flex.Item>
        <div className="ml-sm">
          <p className={`t-24 t-${type}`}>{extra}</p>
          {cnt != 0 && <p className={`t-24 t-${type} mt-16`}>+{cnt}次</p>}
        </div>
      </Flex>
    </List.Item>
  );
};

export default observer(_Row);
