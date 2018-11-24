/**
 * const prefixCls = 'style-101253';
 * const images = '/static/images/src/index/Register';
 * @Author: czy0729
 * @Date: 2018-07-03 17:09:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-14 15:16:43
 * @Path m.benting.com.cn /src/index/Register/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, form, observer } from '@';
import { Form, Button } from '@components';
import { Layout, FlowInput, FlowCaptcha } from '@_';
import Const from '@const';
import store from './store';

const prefixCls = 'style-101253';

@injectV2(store)
@form
@observer
export default class Register extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  render() {
    const { $ } = this.context;
    const { form, onSubmit } = this.props;

    return (
      <Layout className={prefixCls} title="本汀注册" theme="fullTheme">
        <img
          className="img-logo"
          src={`${Const.__IMG__}/logo-horizon${Const.__IMG_DPR__}.png`}
          alt=""
        />
        <p className="t-48 l-66 t-b mt-16">欢迎注册本汀账号</p>
        <Form className="mt-52" form={form}>
          <FlowInput
            type="phone"
            name="mobile"
            option={Const.rules.gen('mobile')}
            placeholder="手机号"
          />
          <FlowCaptcha
            name="code"
            option={Const.rules.required}
            placeholder="验证码"
            smsType="register"
            mobileName="mobile"
          />
          <FlowInput
            name="pwd"
            option={Const.rules.required}
            placeholder="8-16位密码"
            type="password"
          />
          <FlowInput
            type="number"
            name="invCode"
            placeholder="6位邀请码（选填）"
          />
        </Form>
        <Button
          className="mt-52"
          type="main"
          onClick={() => onSubmit(form, $.do.register)}
        >
          注册
        </Button>

        <style jsx global>{`
          .style-101253 {
            padding: 0.6rem 0.48rem;
          }
        `}</style>
        <style jsx>{`
          .style-101253 {
          }
          .img-logo {
            width: 1.52rem;
            height: 0.64rem;
          }
        `}</style>
      </Layout>
    );
  }
}
