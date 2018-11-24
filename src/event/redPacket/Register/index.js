/**
 * const prefixCls = 'style-293578';
 * const images = '/static/images/src/event/redPacket/Register';
 * @Author: czy0729
 * @Date: 2018-11-19 10:17:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-19 10:19:23
 * @Path bt_mb_new /src/event/redPacket/Register/index.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { inject, form, observer } from '@';
import { Form, Animate } from '@components';
import { Layout } from '@_';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import store from './store';
import { images } from './ds';

const prefixCls = 'styles-293578';

export default
@inject(store)
@form
@observer
class Register extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  componentDidMount() {
    Utils.wxHideMenuItems();

    if (Utils.getQuery('openId')) {
      Utils.router.replace('/event/red_packet/register');
    }
  }

  renderFloat() {
    const { $ } = this.context;
    const { amount } = $.getState();

    return (
      <div className="mask">
        <img className="img-3" src={`${images}/3.png`} />
        <div className="desc text-center">
          <p className="p-l">{amount / 100}元</p>
          <p className="text-sm mt-sm">恭喜您</p>
          <p className="text-sm mt-xs">获得本汀【{amount / 100}】元红包</p>
        </div>
        <div
          className="btn-close"
          onClick={() => {
            if (!Utils.wxClose()) {
              $.setState({
                float: false
              });
            }
          }}
        />

        <style jsx>{`
          .styles-293578 {
          }
          .mask {
            position: absolute;
            z-index: 99;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.48);
          }
          .img-3 {
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            width: 80%;
            margin-top: 32%;
            margin-left: 10%;
          }
          .desc {
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
            width: 80%;
            margin-top: 36%;
            margin-left: 10%;
          }
          .p-l {
            font-size: 0.56rem;
            color: #cf381e;
            font-weight: bold;
          }
          .btn-close {
            position: absolute;
            z-index: 3;
            top: 0;
            left: 0;
            width: 54%;
            padding-bottom: 12%;
            margin-top: 84%;
            margin-left: 23%;
          }
        `}</style>
      </div>
    );
  }

  render() {
    const { $ } = this.context;
    const { float, registered } = $.getState();
    const { form, onSubmit } = this.props;

    const { openId } = $.getParams().params;
    const isGet = $.getParams().params.isGet == 1;

    let btnText;
    let disabled = true;
    if (Const.__WX__) {
      if (isGet) {
        btnText = '该微信号已领取';
      } else {
        if (openId) {
          btnText = '立即领取';
          disabled = false;
        } else {
          btnText = '请从本汀官方公众号里面进入';
        }
      }
    } else {
      btnText = '请使用微信打开页面';
    }

    return (
      <Layout className={prefixCls} title="本汀注册送红包" hide>
        <div className="wrap">
          <img className="t-img img-1" src={`${images}/1.png`} />
          <Form className={`${prefixCls}__form`} form={form}>
            {!disabled && (
              <Form.Input
                name="mobile"
                option={Const.rules.gen('mobile')}
                type="phone"
                placeholder="您的手机号"
                updatePlaceholder={false}
                onBlur={() => {
                  let mobile = form.getFieldValue('mobile') || '';
                  mobile = mobile.replace(/ /g, '');

                  if (!Utils.validate(mobile, 'mobile')) {
                    return;
                  }

                  $.checkMobile(mobile);
                }}
              />
            )}
            {!disabled && (
              <Form.Captcha
                name="code"
                mobileName="mobile"
                option={Const.rules.required}
                placeholder="验证码"
                updatePlaceholder={false}
                smsType="register"
              />
            )}
            {!registered && (
              <Form.Input
                name="pwd"
                option={Const.rules.required}
                placeholder="8-16位的新密码"
                type="password"
                updatePlaceholder={false}
              />
            )}
          </Form>
          <Form.Button
            className="mb-sm"
            onClick={() => onSubmit(form, $.doRegister)}
          >
            {btnText}
          </Form.Button>
        </div>
        <Animate type="fade">{float && this.renderFloat()}</Animate>

        <style jsx global>{`
          .styles-293578 {
            padding-bottom: 0 !important;
          }
          .${prefixCls}__form {
            padding-right: 0.24rem;
          }
          .${prefixCls} .am-list-item.am-input-item {
            height: auto !important;
            margin-bottom: 0.24rem;
          }
          .${prefixCls} .am-list-line {
            padding: 0 0.24rem;
            background: #f9f9f9;
            border: 0.01rem solid ${Styles.color_border} !important;
            border-radius: 0.16rem;
          }
          .${prefixCls}
            .c-form
            .am-list-body
            > .am-list-item:nth-last-child(1)
            .am-list-line {
            border: 0.01rem solid ${Styles.color_border} !important;
          }
          .${prefixCls} .am-button {
            background: #d6a664;
            border: 0 !important;
            border-radius: 0.16rem;
          }
        `}</style>
        <style jsx>{`
          .styles-293578 {
          }
          .wrap {
            position: relative;
            min-height: 100vh !important;
            background-color: #fff;
            background-position: bottom;
            background-image: url(${images}/2png);
            background-size: contain;
            background-repeat: no-repeat;
          }
          .img-1 {
            width: 100%;
          }
          .img-2 {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
          }
        `}</style>
      </Layout>
    );
  }
}
