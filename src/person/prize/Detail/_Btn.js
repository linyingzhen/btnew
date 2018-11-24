/**
 * const prefixCls = 'style-922568';
 * const images = '/static/images/src/person/prize/Detail';
 * @Author: czy0729
 * @Date: 2018-11-07 11:07:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-12 14:40:47
 * @Path bt_mb_new /src/person/prize/Detail/_Btn.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Form } from '@components';
import Utils from '@utils';

const _Btn = (props, { $ }) => {
  const { tbId, state, authState, _loaded } = $.getState('detail');

  if (!_loaded) {
    return null;
  }

  let btnType = 'primary';
  let btnText = '提交订单信息';
  let onClick = () =>
    Utils.router.push(
      `/person/prize/info?id=${tbId}`,
      `/person/prize/info/${tbId}`
    );
  switch (parseInt(authState)) {
    case 0:
      break;

    case 1:
      btnText = '已提交，审核中';
      break;

    case 2:
      btnText = state == 3 ? '答谢金发放成功' : '审核通过，请等待奖金发放';

      if (state == 3) {
        onClick = () =>
          Utils.router.push(
            `/person/prize/success?id=${tbId}`,
            `/person/prize/success/${tbId}`
          );
      }
      break;

    case 3:
      btnType = 'danger';
      btnText = '审核失败，重新提交';
      break;

    default:
      break;
  }

  return (
    <Form.Button type={btnType} onClick={onClick}>
      {btnText}
    </Form.Button>
  );
};

_Btn.contextTypes = {
  $: PropTypes.object
};

export default observer(_Btn);
