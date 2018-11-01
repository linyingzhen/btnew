/**
 * const prefixCls = 'style-113720';
 * const images = '/static/images';
 * @Author: czy0729
 * @Date: 2018-06-19 17:59:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-03 14:03:26
 * @Path m.benting.com.cn \.eslintrc.js
 */
import React from 'react';
import { createForm } from 'rc-form';
import Utils from '@utils';

/**
 * 项目约定表单格式化字段
 * @version 170512 1.0
 * @version 170603 1.1
 */
const formatValues = values => {
  const _values = { ...values };

  Object.keys(_values).forEach(key => {
    // moment格式化
    // if (_values[key] instanceof moment) {
    //   _values[key] = _values[key].format(Const.__DATE_MOMENT__);
    // }

    // 数组格式要用逗号分隔
    if (Array.isArray(_values[key])) {
      _values[key] = _values[key].join();

      // undefined要转为''
    } else if (_values[key] === undefined) {
      _values[key] = '';

      // 手机值去空
    } else if (
      key === 'm' ||
      key === 'mobile' ||
      key === 'phone' ||
      key === 'consignPhone'
    ) {
      _values[key] = _values[key].replace(/\s/g, '');
    }
  });

  return _values;
};

/**
 * 验证返回的err是false时，执行next
 * @version 170420 1.0
 * @version 170501 1.1 转换Moment结构的值
 * @param {Object} values rc-form传过来的值
 * @param {Func}   next   下一步的函数
 * @param {Bool}   format 是否需要转换数据
 */
const onOk = (values, next = Function.prototype, format = true) => {
  if (format) {
    next(formatValues(values));
  } else {
    next(values);
  }
};

/**
 * 表单验证，验证后执行next
 * @version 170420 1.0
 * @version 180227 1.1 错误提示
 */
const onValidate = (
  form,
  next = Function.prototype,
  e,
  onErr = Function.prototype
) => {
  if (e) {
    e.preventDefault();
  }

  form.validateFields((err, values) => {
    if (err) {
      Utils.light('请检查并完善信息');
      onErr(err);
      return;
    }

    onOk(values, next);
  });
};

/**
 * onValidate & onOk 快捷方法
 * @version 170420 1.0
 */
const onSubmit = (form, next = Function.prototype, format, e) => {
  onValidate(form, values => onOk(values, next, format), e);
};

const formDecorator = ComposedComponent =>
  createForm()(props => (
    <ComposedComponent
      onValidate={onValidate}
      onOk={onOk}
      onSubmit={onSubmit}
      {...props}
    />
  ));

formDecorator.onValidate = onValidate;
formDecorator.onOk = onOk;
formDecorator.onSubmit = onSubmit;

export default formDecorator;
