/**
 * const prefixCls = 'style-198943';
 * const images = '/static/images/components/Form';
 * @Author: czy0729
 * @Date: 2018-07-02 14:53:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-16 10:04:47
 * @Path m.benting.com.cn /components/Form/Input.js
 */
import React from 'react';
import classNames from 'classnames';
import { InputItem, Modal } from 'antd-mobile';
import Const from '@const';
import Styles from '@styles';
import utils from './utils';

const prefixCls = 'c-form-input';

class Input extends React.Component {
  state = {
    passwordView: false
  };

  render() {
    const {
      form,
      option,
      name,
      label,
      initialValue,
      type,
      extra,
      className,
      ...other
    } = this.props;
    const { passwordView } = this.state;

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

    return (
      <InputItem
        {...form.getFieldProps(name, {
          initialValue,
          ...option
        })}
        className={classNames(prefixCls, utils.getFormItemCls(name), className)}
        name={name}
        clear
        placeholder="请输入"
        updatePlaceholder
        error={!!form.getFieldError(name)}
        type={isPassword ? _type : type}
        extra={isPassword ? _extra : extra}
        onErrorClick={() =>
          Modal.alert('提示', form.getFieldError(name).join('，'))
        }
        {...other}
      >
        {label && utils.getLabelDecorator(option)(label)}

        <style jsx global>{`
          .c-form-input {
          }
          .${prefixCls} input {
            font-size: 0.3rem !important;
            color: ${Styles.color_desc} !important;
          }
          .${prefixCls} input::-webkit-input-placeholder {
            color: ${Styles.color_sub} !important;
          }
          .${prefixCls} .am-input-clear {
            background-color: transparent !important;
            background-position: center;
            background-image: url(${Const.__IMG__}/icon/clear${Const.__IMG_DPR__}.png);
          }
          .${prefixCls} .am-input-error-extra {
            background-image: url(${Const.__IMG__}/icon/information${Const.__IMG_DPR__}.png) !important;
          }
          /* disabled > label */
          .${prefixCls}.am-input-disabled .am-input-label {
            color: ${Styles.color_disabled};
          }
          /* disabled > label */
          .${prefixCls} input:disabled {
            color: ${Styles.color_sub} !important;
          }
        `}</style>
      </InputItem>
    );
  }
}

export default Input;
