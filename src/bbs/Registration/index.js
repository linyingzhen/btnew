/**
 * const prefixCls = 'style-104163';
 * const images = '/static/images/src/bbs/Registration';
 * @Author: czy0729
 * @Date: 2018-06-26 15:33:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 09:57:22
 * @Path dev.tw-bt.com.mobile /src/bbs/Registration/store.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer, form } from '@';
import { Layout } from '@_';
import { Form, Link } from '@components';
import CityPicker from '@components/Form/CityPicker';
import Const from '@const';
import Utils from '@utils';
import store from './store';

const Registration = (props, { $ }) => {
  const { form, onSubmit } = props;
  const { ww, _loaded: loadedUserInfo } = $.getState('userInfo');
  const {
    status,
    name,
    phone,
    wechat,
    province,
    city,
    county,
    address,
    qq,
    message,
    order_no: orderNo,
    marks,
    _loaded: loadedRegistration
  } = $.getState('registration');
  const {
    bankNo,
    bankName,
    branchName,
    cardUsername,
    _loaded: bankLoaded
  } = $.getState('bank');

  if (!loadedUserInfo || !loadedRegistration || !bankLoaded) {
    return null;
  }

  let isCanEdit = false;
  let isFormRegist = false;
  let isCanRegist = false;
  let isFormSubmit = false;
  let isCanSubmit = false;
  let isUpdateOrder = false;
  let text;

  // status(-1=>取消报名, 0=>报名审核中, 1=>报名审核未通过, 2=>报名审核通过,
  // 3=>订单信息审核中, 4=>订单信息审核未通过, 5=>订单信息审核通过)
  switch (parseInt(status)) {
    case -1:
      isFormRegist = true;
      isCanRegist = true;
      isCanEdit = true;
      text = '重新报名';
      break;

    case 0:
      isFormRegist = true;
      text = '报名审核中';
      break;

    case 1:
      isFormRegist = true;
      isCanRegist = true;
      isCanEdit = true;
      text = '审核未通过，重新报名';
      break;

    case 2:
      isFormSubmit = true;
      isCanSubmit = true;
      isCanEdit = true;
      text = '提交订单';
      break;

    case 3:
      isFormSubmit = true;
      text = '订单审核中';
      break;

    case 4:
      isFormSubmit = true;
      isCanSubmit = true;
      isCanEdit = true;
      isUpdateOrder = true;
      text = '审核未通过，重新提交订单';
      break;

    case 5:
      isFormSubmit = true;
      text = '审核通过，请等待奖金发放';
      break;

    default:
      isFormRegist = true;
      isCanRegist = true;
      isCanEdit = true;
      text = '提交报名';
      break;
  }

  return (
    <Layout title="活动报名">
      {isFormRegist && (
        <>
          <Form label form={form} renderHeader="请填写基本信息">
            <Form.Input
              label="姓名"
              name="name"
              option={Const.rules.required}
              updatePlaceholder={false}
              initialValue={name}
              disabled={!isCanEdit}
            />
            <Form.Input
              label="手机号"
              name="phone"
              option={Const.rules.gen('mobile')}
              type="phone"
              updatePlaceholder={false}
              initialValue={phone}
              disabled={!isCanEdit}
            />
            <Form.Input
              label="旺旺号"
              name="ww"
              option={Const.rules.required}
              updatePlaceholder={false}
              initialValue={ww}
              disabled
              extra={
                !ww && (
                  <Link className="t-primary" href={Const.__ROUTER__.ww}>
                    去绑定
                  </Link>
                )
              }
            />
            <Form.Input
              label="微信昵称"
              name="wechat"
              option={Const.rules.required}
              updatePlaceholder={false}
              initialValue={wechat}
              disabled={!isCanEdit}
            />
            <CityPicker
              label="地区"
              name="area"
              option={Const.rules.required}
              initialValue={province ? [province, city, county] : []}
              disabled={!isCanEdit}
            />
            <Form.Input
              label="详细地址"
              name="address"
              option={Const.rules.required}
              updatePlaceholder={false}
              initialValue={address}
              disabled={!isCanEdit}
            />
          </Form>
          <Form label form={form} renderHeader="选填">
            <Form.Input
              label="QQ"
              name="qq"
              updatePlaceholder={false}
              initialValue={qq}
              disabled={!isCanEdit}
            />
            <Form.Input
              label="备注"
              name="message"
              updatePlaceholder={false}
              initialValue={message}
              disabled={!isCanEdit}
            />
          </Form>
          <Form.Button
            type="primary"
            onClick={() =>
              onSubmit(form, values =>
                Utils.onConfirm('报名信息提交后不可修改，确定提交?', () =>
                  $.do.regist(values)))
            }
            disabled={!isCanRegist}
          >
            {text}
          </Form.Button>
        </>
      )}

      {isFormSubmit && (
        <>
          <Form
            label
            form={form}
            renderHeader={
              bankNo ? (
                <p className="text-sm">
                  <span>银行卡使用绑定银行卡，</span>
                  <span
                    className="text-primary"
                    onClick={() => Utils.router.push('/person/bank')}
                  >
                    前往查看
                  </span>
                </p>
              ) : (
                <p className="text-sm">
                  <span>请先绑定银行卡后再提交，</span>
                  <span
                    className="text-primary"
                    onClick={() => Utils.router.push('/person/bank/bind')}
                  >
                    前往绑定
                  </span>
                </p>
              )
            }
          >
            <Form.Input
              label="订单号"
              name="order_no"
              option={Const.rules.required}
              updatePlaceholder={false}
              initialValue={orderNo}
              disabled={!isCanSubmit || !bankNo}
            />
            <Form.Input
              label="开户行"
              name="bank_name"
              option={Const.rules.required}
              updatePlaceholder={false}
              initialValue={
                bankName ? `${bankName || ''} ${branchName || ''}` : undefined
              }
              disabled
            />
            <Form.Input
              label="开户姓名"
              name="bank_user"
              option={Const.rules.required}
              updatePlaceholder={false}
              initialValue={cardUsername}
              disabled
            />
            <Form.Input
              label="银行卡号"
              name="bank_card"
              option={Const.rules.required}
              updatePlaceholder={false}
              initialValue={bankNo}
              disabled
            />
          </Form>
          {marks && (
            <p className="p-w mt-d text-sm text-danger">
              <span>近一次审核信息：</span>
              <span>{marks}</span>
            </p>
          )}
          <Form.Button
            type="primary"
            onClick={() =>
              onSubmit(form, values =>
                Utils.onConfirm(
                  '订单信息提交后，在审核前不可修改，确定提交?',
                  () => {
                    if (isUpdateOrder) {
                      $.do.update(values);
                    } else {
                      $.do.submit(values);
                    }
                  }
                ))
            }
            disabled={!isCanSubmit}
          >
            {text}
          </Form.Button>
        </>
      )}
    </Layout>
  );
};

Registration.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(form(observer(Registration)));
