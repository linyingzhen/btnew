/**
 * const prefixCls = 'style-150941';
 * const images = '/static/images/src/service/Index';
 * @Author: czy0729
 * @Date: 2018-09-03 12:28:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-12 17:43:15
 * @Path m.benting.com.cn /src/service/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer, form } from '@';
import { Form } from '@components';
import AffixTabs from '@components/AffixTabs/default';
import { Layout } from '@_';
import Const from '@const';
import G from '@stores/g';
import store from './store';
import { tabsDS, shopDS } from './ds';

const prefixCls = 'style-150941';

@injectV2(store)
@form
@observer
export default class Service extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  // hack:部分手机点击上传框没反应
  handleUploadPic = () => {
    document.querySelector(`.${prefixCls} input[type=file]`).click();
  };

  renderRegister() {
    const mounted = G.getState('mounted');
    if (!mounted) {
      return null;
    }

    const { $ } = this.context;
    const { form } = this.props;

    let isLogin;
    if (Const.__CLIENT__) {
      isLogin = !!G.getState('tk');
    }

    if (isLogin) {
      return null;
    }

    return (
      <Form
        id="register"
        className="mb-d"
        label
        form={form}
        renderHeader={() => (
          <p className="t-28 l-40 t-sub">
            <span>需先登录，</span>
            <span className="t-primary" onClick={$.do.loginThenBack}>
              点击登录
            </span>
            <span>或在下方一并注册</span>
          </p>
        )}
      >
        <Form.Input
          label="手机号"
          name="mobile"
          option={Const.rules.gen('mobile')}
          type="phone"
          updatePlaceholder={false}
        />
        <Form.Captcha
          label="验证码"
          name="code"
          option={Const.rules.required}
          placeholder="6位短信验证码"
          updatePlaceholder={false}
          smsType="register"
        />
        <Form.Input
          label="密码"
          name="pwd"
          option={Const.rules.required}
          placeholder="8-16位密码"
          type="password"
          updatePlaceholder={false}
        />
      </Form>
    );
  }

  renderForm() {
    const { form, onSubmit } = this.props;
    const { $ } = this.context;
    const { page } = $.getState('_tabs');

    const isPhysical = page === 1;
    let isLogin = true;
    if (Const.__CLIENT__) {
      isLogin = !!G.getState('tk');
    }

    return (
      <React.Fragment>
        <Form
          id="service"
          label
          form={form}
          renderHeader={() => (
            <p className="t-28 l-40 t-sub">
              审核通过后，电子售后凭证和积分将会在7天内发放
            </p>
          )}
        >
          {!isPhysical && (
            <Form.Picker
              label="店铺"
              name="shopName"
              initialValue={[shopDS[0].value]}
              option={Const.rules.required}
              data={shopDS}
            />
          )}
          {!isPhysical && (
            <Form.Input
              label="订单号"
              type="number"
              name="orderNo"
              option={Const.rules.required}
            />
          )}
          {isPhysical && (
            <Form.Upload
              title={
                <>
                  <p className="t-34 l-48">上传图片</p>
                  <p className="t-24 l-34 t-danger mt-8">
                    请把实体店铺售后卡拍照并上传
                  </p>
                </>
              }
              name="cardImg"
              extra={<span onClick={this.handleUploadPic}>选择</span>}
              option={Const.rules.required}
            />
          )}
        </Form>
        <Form.Button
          type="main"
          onClick={() => {
            if (isLogin) {
              onSubmit(form, $.do.submit);
            } else {
              onSubmit(form, $.do.registerThenSubmit);
            }
          }}
        >
          提交
        </Form.Button>
      </React.Fragment>
    );
  }

  render() {
    const { $ } = this.context;
    const { page } = $.getState('_tabs');

    return (
      <Layout className={prefixCls} title="售后中心">
        <AffixTabs
          tabs={tabsDS}
          page={page}
          onTabClick={$.page.onTabClick}
        />
        {this.renderRegister()}
        {this.renderForm()}
      </Layout>
    );
  }
}
