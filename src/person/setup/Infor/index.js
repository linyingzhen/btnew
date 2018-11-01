/**
 * const prefixCls = 'style-176625';
 * const images = '/static/images/src/person/setup/Infor';
 * @Author: lyz0720
 * @Date: 2018-09-28 12:22:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 13:34:30
 * @Path bt_mb_new /src/person/setup/Infor/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer, form } from '@';
import { Layout } from '@_';
import { Form, Link, Icon } from '@components';
import CityPicker from '@components/Form/CityPicker';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import store from './store';
import { sexDS } from './ds';

const prefixCls = 'style-176625';

const Infor = (props, { $ }) => {
  const { form, onSubmit } = props;
  const {
    birDay,
    changeName, // 这是代表还剩次数
    changeBir, // 这是代表还剩次数
    faceImg,
    niname,
    sex,
    userCity,
    userDistrict,
    userProvince,
    ww
  } = $.getState('userInfo');

  const nameDisabled = parseInt(changeName) === 0;
  const birDisabled = parseInt(changeBir) === 0;
  const isBindWW = ww !== '';

  return (
    <Layout title="我的资料" className={prefixCls}>
      <Form form={form}>
        <Form.Upload
          label="头像"
          name="faceImg"
          right
          initialValue={faceImg}
          option={Const.rules.required}
          data={{
            iswatermark: 1
          }}
        />
        <Form.Input
          label="昵称"
          name="niname"
          initialValue={niname}
          option={Const.rules.required}
          disabled={nameDisabled}
          extra={
            nameDisabled && (
              <Icon
                className="t-44 t-icon"
                type="information-circle"
                style={{ marginRight: '-0.04rem' }}
                onClick={() => {
                  if (!nameDisabled) {
                    return;
                  }

                  Utils.onConfirm(
                    '您已修改过昵称，可以联系客服修改或者提交反馈，前往反馈页面?',
                    () => Utils.router.push('/person/feedback')
                  );
                }}
              />
            )
          }
        />
        <Form.Picker
          label="性别"
          name="sex"
          initialValue={sex ? [sex] : ['0']}
          data={sexDS}
        />
        <Form.DatePicker
          label="生日"
          name="birDay"
          initialValue={
            birDay === '0-0-0' || !/^(\d+)-(\d+)-(\d+)$/g.test(birDay)
              ? ''
              : birDay
          }
          disabled={birDisabled}
          extra={
            birDisabled && (
              <Icon
                className="t-44 t-icon"
                type="information-circle"
                onClick={() => {
                  if (!nameDisabled) {
                    return;
                  }

                  Utils.onConfirm(
                    '您已修改过生日，可以联系客服修改或者提交反馈，前往反馈页面?',
                    () => Utils.router.push('/person/feedback')
                  );
                }}
              />
            )
          }
        />
        <CityPicker
          label="地区"
          name="userCity"
          initialValue={userCity ? [userProvince, userCity, userDistrict] : []}
          option={Const.rules.required}
        />
        <Form.Input
          label="旺旺ID"
          name="ww"
          initialValue={ww}
          placeholder=""
          extra={
            !isBindWW && (
              <Link className="t-primary" href={Const.__ROUTER__.ww}>
                去绑定
              </Link>
            )
          }
          disabled
        />
      </Form>
      <Form.Button
        type="primary"
        onClick={() => onSubmit(form, $.do.update)}
      >
        保存修改
      </Form.Button>

      <style jsx global>{`
        .style-176625 {
        }
        .${prefixCls} .c-form-upload__upload {
          width: 1rem !important;
          height: 1rem !important;
          border-radius: 50%;
        }
        .${prefixCls} .c-form__label {
          color: ${Styles.color_desc} !important;
        }
        .${prefixCls} .am-list-extra {
          flex-basis: 70% !important;
          color: ${Styles.color_desc} !important;
          text-align: right !important;
        }
        .${prefixCls} .am-input-control input {
          color: ${Styles.color_desc} !important;
          text-align: right;
        }
      `}</style>
    </Layout>
  );
};

Infor.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(form(observer(Infor)));
