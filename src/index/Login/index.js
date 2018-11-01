/**
 * const prefixCls = 'style-180287';
 * const images = '/static/images/src/index/Login';
 * @Author: czy0729
 * @Date: 2018-07-02 10:00:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 02:50:10
 * @Path m.benting.com.cn /src/index/Login/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, form, observer } from '@';
import { Flex, Form, Button, Link } from '@components';
import { Layout, FlowInput } from '@_';
import Const from '@const';
import Utils from '@utils';
import store from './store';
import { lsKey } from './ds';

const prefixCls = 'style-180287';

@injectV2(store)
@form
@observer
export default class Login extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  componentDidMount() {
    const { form } = this.props;
    const lsData = Utils.lsGet(lsKey);

    form.setFieldsValue({
      account: lsData.account || '',
      pwd: lsData.pwd || ''
    });
  }

  render() {
    const { $ } = this.context;
    const { form, onSubmit } = this.props;

    return (
      <Layout className={prefixCls} title="登录" theme="fullTheme">
        <img
          className="img-logo"
          src={`${Const.__IMG__}/logo-horizon${Const.__IMG_DPR__}.png`}
          alt=""
        />
        <p className="t-48 l-66 t-b mt-18">欢迎登录本汀官网</p>
        <Form className="mt-64" form={form}>
          <FlowInput
            name="account"
            option={Const.rules.required}
            placeholder="手机号/灵动账户"
          />
          <FlowInput
            name="pwd"
            option={Const.rules.required}
            placeholder="密码"
            type="password"
          />
        </Form>
        <Flex className="mt-52" justify="between">
          <p className="t-30 l-42">
            <span className="t-sub">还没有账号？</span>
            <Link href="/register">
              <span>立即注册</span>
            </Link>
          </p>
          <Link href="/forgot">
            <span className="t-30 l-42">忘记密码</span>
          </Link>
        </Flex>
        <Button
          className="mt-64"
          type="main"
          onClick={() => onSubmit(form, $.do.login)}
        >
          登录
        </Button>
        {/* <div className="t-c mt-96">
          <p className="t-30 l-42 t-sub t-c">使用快捷登录</p>
          <Icon className="t-56 mt-24" type="baidu-circle-fill" />
        </div> */}

        <style jsx global>{`
          .style-180287 {
            padding: 0.6rem 0.48rem;
          }
        `}</style>
        <style jsx>{`
          .style-180287 {
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
