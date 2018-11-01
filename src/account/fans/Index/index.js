/**
 * const prefixCls = 'style-109692';
 * const images = '/static/images/src/account/Fans/Index';
 * @Author: czy0729
 * @Date: 2018-10-07 16:38:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 14:50:15
 * @Path m.benting.com.cn /src/account/Fans/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { injectV2, form, observer } from '@';
import { Form, Link } from '@components';
import { Layout } from '@_';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import store from './store';
import { typeNameDS, stateDS } from './ds';

const prefixCls = 'style-109692';

const Fans = (props, { $ }) => {
  const { form, onSubmit } = props;
  const { ww, _loaded: _loadedUserInfo } = $.getState('userInfo');
  const {
    typeName,
    goods,
    orderNo,
    proofImg,
    state,
    remark,
    authRemark,
    _loaded: _loadedFans
  } = $.getState('fans');

  if (!_loadedUserInfo || !_loadedFans) {
    return null;
  }

  const isPhysical = (form.getFieldValue('typeName') || [])[0] === '实体店';
  const isBindWW = ww !== '';
  const _remark = authRemark || remark;
  const _state = Utils.getLabel(stateDS, state);
  const isCanSubmit =
    isBindWW &&
    (!state ||
      _state === '审核不通过' ||
      _state === '大咖审核失败' ||
      _state === '小咖通过');

  let type = 'primary';
  let btnText;
  switch (_state) {
    case '等待审核':
      btnText = _state;
      break;

    case '审核不通过':
      btnText = '重新提交';
      break;

    case '重新提交资料':
      btnText = '重新提交资料，请等待审核';
      break;

    case '小咖通过':
      btnText = '小咖通过，申请升级大咖';
      break;

    case '大咖审核失败':
      btnText = '大咖审核失败，重新提交';
      break;

    case '移出粉丝队伍':
      type = 'danger';
      btnText = '移出粉丝队伍，请联系客服';
      break;

    default:
      btnText = '提交认证';
      break;
  }

  return (
    <Layout title="粉丝认证" bd={null}>
      <div className="wrap">
        <p className="t-48 l-66 t-b">粉丝认证</p>
      </div>
      <Form className={`${prefixCls}__form`} form={form} label>
        <Form.Input
          label="旺旺ID"
          name="ww"
          placeholder="-"
          initialValue={ww}
          disabled
          option={Const.rules.required}
          extra={
            !isBindWW && (
              <Link className="t-primary" href={Const.__ROUTER__.ww}>
                去绑定
              </Link>
            )
          }
        />
      </Form>
      <Form
        className="mt-d"
        form={form}
        label
        renderFooter={
          _remark && (
            <p className="t-24">
              <span className="t-sub">上次审核备注：</span>
              <span className="t-danger">{_remark}</span>
            </p>
          )
        }
      >
        <Form.Picker
          label="店铺"
          name="typeName"
          initialValue={typeName ? [typeName] : [typeNameDS[0].value]}
          disabled={!isCanSubmit}
          option={Const.rules.required}
          data={typeNameDS}
        />
        <Form.Input
          label="产品"
          name="goods"
          initialValue={goods}
          disabled={!isCanSubmit}
          option={Const.rules.required}
        />
        {!isPhysical && (
          <Form.Input
            label="订单编号"
            name="orderNo"
            initialValue={orderNo}
            disabled={!isCanSubmit}
            option={Const.rules.required}
            type="number"
          />
        )}
        {isPhysical && (
          <Form.Upload
            title={
              <>
                <p
                  className={classNames(
                    'c-form__label c-form__label-required t-34 l-48',
                    {
                      't-disabled': !isCanSubmit
                    }
                  )}
                >
                  上传图片
                </p>
                <p className="t-24 l-34 t-sub t-4">
                  请把实体店铺售后卡拍照并上传
                </p>
              </>
            }
            name="proofImg"
            initialValue={proofImg}
            disabled={!isCanSubmit}
            option={Const.rules.required}
          />
        )}
      </Form>
      <Form.Button
        type={type}
        disabled={!isCanSubmit}
        onClick={() =>
          onSubmit(form, values =>
            Utils.onConfirm('确认信息无误并提交?', () => $.do.submit(values)))
        }
      >
        {btnText}
      </Form.Button>

      <style jsx global>{`
        .style-109692 {
        }
        .${prefixCls}__form {
          margin-top: 0;
        }
      `}</style>
      <style jsx>{`
        .style-109692 {
        }
        .wrap {
          padding: ${Styles.space} ${Styles.wind};
          background: ${Styles.color_theme};
        }
      `}</style>
    </Layout>
  );
};

Fans.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(form(observer(Fans)));
