/**
 * const prefixCls = 'style-874826';
 * const images = '/static/images/src/event/car';
 * @Author: czy0729
 * @Date: 2018-11-06 18:36:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-21 15:18:44
 * @Path bt_mb_new /src/event/car/ds.js.git
 */
import Const from '@const';

export const tid = Const.__RELEASE__ ? 101966 : 100384;
export const getTid = type => {
  // 送钓箱
  if (type == 2) {
    return Const.__RELEASE__ ? 102509 : 100387;
  }

  return tid;
};
export const tabsDS = [
  { title: '审核通过' },
  { title: '审核中' },
  { title: '审核不通过' }
];
export const auditDS = [
  {
    label: '审核通过',
    value: '1'
  },
  {
    label: '审核中',
    value: '0'
  },
  {
    label: '审核不通过',
    value: '2'
  }
];
export const signAuditDS = [
  {
    label: '成功报名',
    value: '1'
  },
  {
    label: '审核中',
    value: '0'
  },
  {
    label: '报名未通过',
    value: '2'
  }
];
export const fishAuditDS = [
  {
    label: '审核通过',
    value: '1'
  },
  {
    label: '审核中',
    value: '0'
  },
  {
    label: '审核不通过',
    value: '2'
  }
];
