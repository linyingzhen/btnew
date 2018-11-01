/**
 * const prefixCls = 'style-199619';
 * const images = '/static/images/components/Form';
 * @Author: czy0729
 * @Date: 2018-09-03 16:42:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-03 16:47:26
 * @Path m.benting.com.cn /components/Form/Button.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import Input from './Input';
import Button from '../Button';

const prefixCls = 'c-form-captcha';

export default class Captcha extends React.Component {
  static propsTypes = {
    smsType: PropTypes.oneOf[('normal', 'register', 'login')],
    mobileName: PropTypes.string
  };

  static defaultProps = {
    smsType: 'normal',
    mobileName: 'mobile'
  };

  state = {
    timeout: 0
  };

  componentWillUnmount() {
    if (this.timeoutId) clearInterval(this.timeoutId);
  }

  doSend = async () => {
    const { form, mobileName, smsType } = this.props;

    let api;
    switch (smsType) {
      case 'normal':
        api = 'do_send_captcha';
        break;

      case 'normal-DB':
        api = 'do_send_captcha-DB';
        break;

      case 'register':
        api = 'do_send_register_captcha';
        break;

      case 'login':
        api = 'do_send_login_captcha';
        break;

      case 'pwd':
        api = 'do_send_pwd_captcha';
        break;

      default:
        break;
    }

    await Api.P(api, {
      m: form.getFieldValue(mobileName).replace(/\s/g, '')
    });

    Utils.light();
    this.setSendTimeout();
  };

  setSendTimeout = async () => {
    await this.setState({
      timeout: 60
    });

    this.timeoutId = setInterval(() => {
      const { timeout } = this.state;
      if (timeout) {
        const next = timeout - 1;

        this.setState({
          timeout: next
        });

        if (next === 0) {
          clearInterval(this.timeoutId);
          this.timeoutId = undefined;
        }
      }
    }, 1000);
  };

  timeoutId;

  renderButton() {
    const { form, mobileName } = this.props;
    const { timeout } = this.state;

    const value = form.getFieldValue(mobileName);
    const error = form.getFieldError(mobileName);
    const disabled = !value || !!error || !!timeout;

    return (
      <Button
        type="primary"
        inline
        size="sm"
        disabled={disabled}
        onClick={this.doSend}
      >
        {timeout ? `${timeout}秒` : '获取验证码'}
      </Button>
    );
  }

  render() {
    const {
      extra,
      option,
      mobileName,
      smsType,
      className,
      ...other
    } = this.props;

    return (
      <div className={prefixCls}>
        <Input
          className={className}
          option={Const.rules.gen('number')}
          type="number"
          maxLength={6}
          extra={this.renderButton()}
          updatePlaceholder={false}
          {...other}
        />

        <style jsx global>{`
          .c-form-captcha {
          }
          .${prefixCls} .am-list-line {
            overflow: initial;
          }
          .${prefixCls} .am-input-extra {
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: initial;
          }
        `}</style>
      </div>
    );
  }
}
