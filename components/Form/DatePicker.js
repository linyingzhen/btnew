/**
 * const prefixCls = 'style-322963';
 * const images = '/static/images/components/Form';
 * @Author: czy0729
 * @Date: 2018-10-16 10:07:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-15 17:27:00
 * @Path m.benting.com.cn /components/Form/DatePicker.js
 */
import React from 'react';
import classNames from 'classnames';
import { DatePicker as AMDatePicker } from 'antd-mobile';
import Const from '@const';
import Styles from '@styles';
import List from '../List';
import utils from './utils';

const prefixCls = 'c-form-date-picker';

const DatePicker = props => {
  const {
    form,
    option,
    name,
    label,
    title,
    initialValue,
    mode = 'date',
    format,
    minDate,
    maxDate,
    align,
    extra,
    placeholder,
    className,
    ...other
  } = props;

  const _initialValue = initialValue
    ? new Date(initialValue.replace(/\\-/g, '/'))
    : undefined;
  const isAlignLeft = align === 'left';
  const value = form.getFieldValue(name);

  return (
    <AMDatePicker
      mode={mode}
      format={format}
      title={title || label}
      minDate={minDate === null ? undefined : minDate || new Date('1900/1/1')}
      maxDate={maxDate === null ? undefined : maxDate || new Date(Date.now())}
      extra={isAlignLeft ? extra || placeholder : undefined}
      {...form.getFieldProps(name, {
        initialValue: _initialValue,
        ...option
      })}
      {...other}
    >
      <List.Item
        className={classNames(
          prefixCls,
          className,
          utils.getFormItemCls(name),
          {
            [`${prefixCls}_has-value`]: !!value,
            [`${prefixCls}_error`]: !!form.getFieldError(name),
            [`${prefixCls}_align-left`]: isAlignLeft
          }
        )}
        arrow="horizontal"
      >
        {label && utils.getLabelDecorator(option)(label)}
        {!isAlignLeft && extra && <div className="extra">{extra}</div>}

        <style jsx global>{`
          .c-form-date-picker {
          }
          /* 仿错误提示 */
          .${prefixCls}_error .am-list-extra {
            position: relative;
          }
          .${prefixCls}_error .am-list-extra:before {
            content: '';
            position: absolute;
            top: 50%;
            right: 0;
            width: 0.42rem;
            height: 0.42rem;
            ${Styles._bg};
            background-image: url(${Const.__IMG__}/icon/information@${Const.__DPR__}x.png);
            transform: translateY(-50%);
          }
          .${prefixCls} .extra {
            position: absolute;
            top: 50%;
            right: ${Styles.wind};
            margin-right: -0.04rem;
            background: ${Styles.color_theme};
            transform: translateY(-50%);
          }
          .${prefixCls} .am-list-content > span {
            color: ${Styles.color_title};
          }
          .${prefixCls} .am-list-extra {
            font-size: ${Styles.font_form} !important;
            color: ${Styles.color_sub} !important;
          }
          .${prefixCls}_has-value .am-list-extra {
            color: ${Styles.color_desc} !important;
          }
          .${prefixCls}_align-left .am-list-content {
            flex: initial !important;
            width: 1.7rem !important;
            margin-right: 0.1rem;
          }
          .${prefixCls}_align-left .am-list-extra {
            flex: 1;
            text-align: left !important;
          }
        `}</style>
      </List.Item>
    </AMDatePicker>
  );
};

export default DatePicker;
