/**
 * const prefixCls = 'style-115779';
 * const images = '/static/images/src/account/Pwd';
 * @Author: czy0729
 * @Date: 2018-10-23 13:42:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 13:50:43
 * @Path bt_mb_new /src/account/Pwd/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer, form } from '@';
import { Layout } from '@_';
import { Form } from '@components';
import Const from '@const';
import Styles from '@styles';
import store from './store';

const prefixCls = 'style-115779';

const Pwd = (props, { $ }) => {
  const { form, onSubmit } = props;

  return (
    <Layout title="修改密码" bd={null}>
      <div className="wrap">
        <p className="t-48 l-66 t-b">修改密码</p>
      </div>
      <Form className={`${prefixCls}__form`} form={form} label>
        <Form.Input
          label="原密码"
          name="oldPwd"
          type="password"
          option={Const.rules.gen('password')}
          updatePlaceholder={false}
        />
        <Form.Input
          label="新密码"
          name="newPwd"
          type="password"
          option={Const.rules.gen('password')}
          updatePlaceholder={false}
        />
      </Form>
      <Form.Button onClick={() => onSubmit(form, $.do.updatePwd)}>
        提交
      </Form.Button>

      <style jsx global>{`
        .style-115779 {
        }
        .${prefixCls}__form {
          margin-top: 0;
          background: ${Styles.color_theme};
        }
      `}</style>
      <style jsx>{`
        .style-115779 {
        }
        .wrap {
          padding: ${Styles.space} ${Styles.wind};
          background: ${Styles.color_theme};
        }
      `}</style>
    </Layout>
  );
};

Pwd.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(form(observer(Pwd)));
