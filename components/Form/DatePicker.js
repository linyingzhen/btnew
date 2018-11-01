/**
 * const prefixCls = 'style-322963';
 * const images = '/static/images/components/Form';
 * @Author: czy0729
 * @Date: 2018-10-16 10:07:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 12:49:21
 * @Path m.benting.com.cn /components/Form/DatePicker.js
 */
import React from 'react';
import classNames from 'classnames';
import { DatePicker as AMDatePicker } from 'antd-mobile';
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
    initialValue,
    mode = 'date',
    format,
    minDate,
    maxDate,
    align,
    extra,
    className,
    ...other
  } = props;

  const _initialValue = initialValue
    ? new Date(initialValue.replace(/\\-/g, '/'))
    : undefined;

  return (
    <AMDatePicker
      mode={mode}
      format={format}
      title={label}
      minDate={minDate === null ? undefined : minDate || new Date('1900/1/1')}
      maxDate={maxDate === null ? undefined : maxDate || new Date(Date.now())}
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
            [`${prefixCls}_align-left`]: align === 'left'
          }
        )}
        arrow="horizontal"
      >
        {label && utils.getLabelDecorator(option)(label)}
        {extra && <div className="extra">{extra}</div>}

        <style jsx global>{`
          .c-form-date-picker {
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
