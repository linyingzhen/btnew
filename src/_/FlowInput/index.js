/**
 * const prefixCls = 'style-720004';
 * const images = '/static/images/src/_/FlowInput';
 * @Author: czy0729
 * @Date: 2018-07-02 15:33:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-16 15:40:02
 * @Path m.benting.com.cn /src/_/FlowInput/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { InputItem } from 'antd-mobile';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-720004';

export default class FlowInput extends React.Component {
  state = {
    value: '',
    focus: false,
    passwordView: false
  };

  componentWillReceiveProps(nextProps) {
    const { form, name } = nextProps;

    this.setState({
      value: form.getFieldValue(name)
    });
  }

  render() {
    const {
      form,
      type,
      label,
      name,
      placeholder,
      updatePlaceholder,
      initialValue,
      option,
      extra,
      className,
      ...other
    } = this.props;
    const { focus, value, passwordView } = this.state;
    const isPassword = type === 'password';
    const _type = isPassword && !passwordView ? type : 'text';
    let _extra;

    if (isPassword) {
      _extra = (
        <img
          src={
            passwordView
              ? `${Const.__IMG__}/icon/eye${Const.__IMG_DPR__}.png`
              : `${Const.__IMG__}/icon/eye-close${Const.__IMG_DPR__}.png`
          }
          onClick={() => this.setState({ passwordView: !passwordView })}
          alt=""
        />
      );
    }

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
          type={isPassword ? _type : type}
          name={name}
          updatePlaceholder={false}
          clear
          error={!!form.getFieldError(name)}
          extra={isPassword ? _extra : extra}
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
          .style-720004 {
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
          .${prefixCls} .am-input-error-extra {
            background-image: url(${Const.__IMG__}/icon/information${Const.__IMG_DPR__}.png) !important;
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
          .style-720004 {
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
