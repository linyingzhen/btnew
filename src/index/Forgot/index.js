/**
 * const prefixCls = 'style-195468';
 * const images = '/static/images/src/index/Forgot';
 * @Author: czy0729
 * @Date: 2018-07-04 10:07:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-04 10:10:39
 * @Path m.benting.com.cn /src/index/Forgot/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, form, observer } from '@';
import { Form, Button } from '@components';
import { Layout, FlowInput, FlowCaptcha } from '@_';
import Const from '@const';
import store from './store';

const prefixCls = 'style-195468';

@injectV2(store)
@form
@observer
export default class Forgot extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  render() {
    const { $ } = this.context;
    const { form, onSubmit } = this.props;

    return (
      <Layout className={prefixCls} title="找回密码" theme="fullTheme">
        <img
          className="img-logo"
          src={`${Const.__IMG__}/logo-horizon${Const.__IMG_DPR__}.png`}
          alt=""
        />
        <p className="t-48 l-66 t-b mt-16">找回密码</p>
        <Form className="mt-52" form={form}>
          <FlowInput
            type="phone"
            name="m"
            option={Const.rules.gen('mobile')}
            placeholder="手机号"
          />
          <FlowCaptcha
            name="code"
            option={Const.rules.required}
            placeholder="验证码"
            smsType="pwd"
            mobileName="m"
          />
          <FlowInput
            name="newPwd"
            option={Const.rules.required}
            placeholder="8-16位新密码"
            type="password"
          />
        </Form>
        <Button
          className="mt-52"
          type="main"
          onClick={() => onSubmit(form, $.do.find)}
        >
          找回
        </Button>

        <style jsx global>{`
          .style-195468 {
            padding: 0.6rem 0.48rem;
          }
        `}</style>
        <style jsx>{`
          .style-195468 {
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
