/**
 * const prefixCls = 'style-456382';
 * const images = '/static/images/src/_/FlowCaptcha';
 * @Author: czy0729
 * @Date: 2018-07-03 17:29:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-04 00:03:21
 * @Path m.benting.com.cn /src/_/FlowCaptcha/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InputItem } from 'antd-mobile';
import { Button } from '@components';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-456382';

export default class FlowCaptcha extends React.Component {
  static propsTypes = {
    smsType: PropTypes.oneOf[('normal', 'register', 'login')],
    mobileName: PropTypes.string
  };

  static defaultProps = {
    smsType: 'normal',
    mobileName: 'mobile'
  };

  state = {
    value: '',
    focus: false,
    timeout: 0
  };

  componentWillReceiveProps(nextProps) {
    const { form, name } = nextProps;

    this.setState({
      value: form.getFieldValue(name)
    });
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearInterval(this.timeoutId);
    }
  }

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

    const mobile = form.getFieldValue(mobileName) || '';
    await Api.P(api, {
      m: mobile.replace(/\s/g, '')
    });

    Utils.light('已发送');
    this.setSendTimeout();
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
        size="sm"
        inline
        disabled={disabled}
        onClick={this.doSend}
      >
        {timeout ? `${timeout}秒` : '获取验证码'}
      </Button>
    );
  }

  render() {
    const {
      form,
      label,
      name,
      placeholder,
      updatePlaceholder,
      initialValue,
      option,
      extra,
      smsType,
      mobileName,
      className,
      ...other
    } = this.props;
    const { focus, value } = this.state;

    const rcFormProps = form.getFieldProps(name, {
      initialValue,
      ...option
    });
    const { onChange, ...otherRcFormProps } = rcFormProps;

    return (
      <div
        id={prefixCls}
        className={classNames(prefixCls, className, {
          [`${prefixCls}_focused`]: focus,
          [`${prefixCls}_has-value`]: !!value
        })}
      >
        <InputItem
          className={`${prefixCls}__ipt`}
          type="number"
          name={name}
          updatePlaceholder={false}
          clear
          error={!!form.getFieldError(name)}
          extra={this.renderButton()}
          onFocus={() =>
            this.setState({
              focus: true
            })
          }
          onBlur={() =>
            this.setState({
              focus: false
            })
          }
          onErrorClick={() => Utils.light(form.getFieldError(name).join('，'))}
          onChange={value => {
            this.setState({ value });
            onChange(value);
          }}
          {...otherRcFormProps}
          {...other}
        />
        <span className="p-placeholder">{placeholder}</span>

        <style jsx global>{`
          .style-456382 {
          }
          #${prefixCls} .am-list-line {
            padding-right: 0.04rem !important;
            border-bottom: ${Styles.border} !important;
          }
          .${prefixCls} .am-list-item {
            padding-left: 0 !important;
          }
          .${prefixCls} .am-input-clear {
            background-color: transparent !important;
            background-position: center;
            background-image: url(${Const.__IMG__}/icon/clear${Const.__IMG_DPR__}.png);
          }
          .${prefixCls} .am-input-extra {
            margin-left: 0.16rem;
          }
          .${prefixCls} .am-list-line:before {
            content: ' ';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 0.01rem;
            background: #000;
            transition: width 0.3s;
          }
          .${prefixCls} .am-input-extra {
            margin-top: -0.14rem;
            overflow: initial;
          }
          .${prefixCls}.${prefixCls}_focused .am-list-line:before {
            width: 100%;
          }
          .${prefixCls}.${prefixCls}_focused .p-placeholder,
          .${prefixCls}.${prefixCls}_has-value .p-placeholder {
            bottom: 0.88rem;
            font-size: 0.24rem;
          }
          .${prefixCls}__ipt {
            position: absolute;
            z-index: 1;
            bottom: 0;
            left: 0;
            width: 100%;
            background: transparent;
          }
        `}</style>
        <style jsx>{`
          .style-456382 {
            position: relative;
            height: 1.6rem;
          }
          .p-placeholder {
            position: absolute;
            z-index: 0;
            bottom: 0.27rem;
            left: 0;
            font-size: 0.34rem;
            color: ${Styles.color_sub};
            user-select: none;
            transition: all 0.3s;
          }
        `}</style>
      </div>
    );
  }
}
