/**
 * const prefixCls = 'style-213633';
 * const images = '/static/images/src/person/prize/Info';
 * @Author: czy0729
 * @Date: 2018-10-25 14:34:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-07 14:48:16
 * @Path bt_mb_new /src/person/prize/Info/_Form.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Form, Link } from '@components';
import { Tips } from '@_';
import Const from '@const';
import Utils from '@utils';

const prefixCls = 'style-121409';

const _Form = (props, { $ }) => {
  const { form, onSubmit, className } = props;
  const { ww, _loaded: loadedUserInfo } = $.getState('userInfo');
  const {
    bankNo,
    orderNo,
    bankName,
    cardUsername,
    state,
    authState,
    authRemark,
    expdatebegin,
    expdateend,
    _loaded: loadedDetail
  } = $.getState('detail');
  const bank = $.getState('bank');

  if (!loadedUserInfo || !loadedDetail || !bank._loaded) {
    return null;
  }

  const begin = Utils.date('y.m.d H:i:s', expdatebegin);
  const end = Utils.date('y.m.d H:i:s', expdateend);
  const isBindWW = !!ww;
  const isBindBank = !!bank.bankcardId;

  let allowSubmit = true;
  let btnType = 'primary';
  let btnText = '确认提交';
  switch (parseInt(authState)) {
    case 0:
      break;

    case 1:
      allowSubmit = false;
      btnText = '已提交，审核中';
      break;

    case 2:
      allowSubmit = false;
      btnText = state == 3 ? '答谢金发放成功' : '审核通过，请等待奖金发放';
      break;

    case 3:
      btnType = 'danger';
      btnText = '审核失败，重新提交';
      break;

    default:
      break;
  }

  return (
    <>
      <Form className={classNames(prefixCls, className)} form={form} label>
        <Form.Input
          label="订单号"
          name="orderNo"
          type="number"
          initialValue={orderNo}
          option={Const.rules.required}
          disabled={!allowSubmit}
        />
        <Form.Input
          name="ww"
          label="旺旺号"
          initialValue={ww}
          option={Const.rules.required}
          placeholder="必须为购买此单的旺旺号"
          disabled
          extra={
            !isBindWW && (
              <Link className="t-primary" href={Const.__ROUTER__.ww}>
                去绑定
              </Link>
            )
          }
        />
        <Form.Input
          name="bankName"
          label="银行"
          initialValue={bankName || bank.bankName}
          option={Const.rules.required}
          disabled
          extra={
            !isBindBank && (
              <Link className="t-primary" href={Const.__ROUTER__.bank}>
                去绑定
              </Link>
            )
          }
        />
        <Form.Input
          label="银行卡号"
          name="bankNo"
          initialValue={bankNo || bank.bankNo}
          option={Const.rules.gen('bank')}
          disabled
        />
        <Form.Input
          label="持卡人"
          name="cardUsername"
          initialValue={cardUsername || bank.cardUsername}
          disabled
          option={Const.rules.required}
        />
      </Form>
      {authRemark && (
        <p className="p-w t-24 t-danger mt-d">
          上次审核信息：
          {authRemark}
        </p>
      )}
      <Tips className="mt-d">
        <p className="t-28 l-44">
          1、购买订单日期必须为：
          {begin} - {end}
        </p>
        <p className="t-28 l-44">2、已绑定的旺旺ID不可自己修改</p>
        <p className="t-28 l-44">3、一个旺旺ID只能绑定一个账号</p>
        <p className="t-28 l-44">4、订单的旺旺ID必需与订单号对应</p>
      </Tips>
      <Form.Button
        type={btnType}
        disabled={!allowSubmit}
        onClick={() =>
          onSubmit(form, values =>
            Utils.onConfirm('确认无误并提交?', () => $.do.submit(values))
          )
        }
      >
        {btnText}
      </Form.Button>
    </>
  );
};

_Form.contextTypes = {
  $: PropTypes.object
};

export default observer(_Form);
