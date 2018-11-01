/**
 * const prefixCls = 'style-198531';
 * const images = '/static/images/components/Form';
 * @Author: czy0729
 * @Date: 2018-08-11 16:36:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-17 15:19:00
 * @Path m.benting.com.cn /components/Form/MoneyInput.js
 */
import React from 'react';
import classNames from 'classnames';
import { InputItem, Modal } from 'antd-mobile';
import utils from './utils';

const prefixCls = 'c-form-money-input';

class Input extends React.Component {
  prev = '';

  moneyNatural = v => {
    if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
      if (v === '.') {
        return '0.';
      }

      if (!v) {
        return '';
      }

      return this.prev;
    }

    this.prev = v;

    return v;
  };

  moneyInt = (v = '') => {
    const _v = v.replace('.', '');

    return _v == 0 ? '' : _v;
  };

  onChange = value => {
    const { form, name, format, max = 99999 } = this.props;

    const _value =
      format === 'int' ? this.moneyInt(value) : this.moneyNatural(value);

    form.setFieldsValue({
      [name]: parseFloat(_value) > parseFloat(max) ? max : _value
    });
  };

  render() {
    const {
      extra,
      focused,
      form,
      format,
      initialValue,
      label,
      max,
      name,
      option,
      type,
      onChange,
      className,
      ...other
    } = this.props;

    // if (Const.__SERVER__) {
    //   return null;
    // }

    return (
      <InputItem
        {...form.getFieldProps(name, {
          initialValue,
          ...option
        })}
        className={classNames(prefixCls, utils.getFormItemCls(name), className)}
        name={name}
        clear
        extra={extra}
        placeholder="请输入"
        updatePlaceholder
        error={!!form.getFieldError(name)}
        // type="money"
        onChange={this.onChange}
        onErrorClick={() =>
          Modal.alert('提示', form.getFieldError(name).join('，'))
        }
        {...other}
      >
        {label && utils.getLabelDecorator(option)(label)}
      </InputItem>
    );
  }
}

export default Input;
