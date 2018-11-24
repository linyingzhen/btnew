/**
 * const prefixCls = 'style-133888';
 * const images = '/static/images/components/Form';
 * @Author: czy0729
 * @Date: 2018-07-26 17:13:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-15 16:47:06
 * @Path m.benting.com.cn /components/Form/Textarea.js
 */
import React from 'react';
import classNames from 'classnames';
import { TextareaItem } from 'antd-mobile';
import Styles from '@styles';
import utils from './utils';

const prefixCls = 'c-form-textarea';

const Textarea = props => {
  const {
    form,
    name,
    title,
    label,
    placeholder = '请输入',
    initialValue,
    option,
    className,
    children,
    ...other
  } = props;

  const formProps =
    name &&
    form.getFieldProps(name, {
      initialValue,
      ...option
    });

  return (
    <>
      <TextareaItem
        {...formProps}
        className={classNames(prefixCls, className)}
        title={utils.getLabelDecorator(option)(title || label)}
        name={name}
        placeholder={placeholder}
        rows={4}
        clear
        autoHeight
        error={!!form.getFieldError(name)}
        {...other}
      />

      <style jsx global>{`
        .c-form-textarea {
        }
        .${prefixCls} .am-textarea-label {
          font-size: ${Styles.font_form};
        }
      `}</style>
    </>
  );
};

export default Textarea;
