/**
 * const prefixCls = 'style-553306';
 * const images = '/static/images/components/Form';
 * @Author: czy0729
 * @Date: 2018-08-11 16:11:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 12:47:43
 * @Path m.benting.com.cn /components/Form/Picker.js
 */
import React from 'react';
import classNames from 'classnames';
import { Picker as AMPicker, List } from 'antd-mobile';
import Styles from '@styles';
import utils from './utils';

const prefixCls = 'c-form-picker';

const Picker = props => {
  const {
    form,
    option,
    name,
    title,
    label,
    initialValue,
    extra,
    placeholder,
    disabled,
    className,
    ...other
  } = props;

  const _extra = extra || placeholder; // 注意，Picker的占位是用extra非placeholder，为了项目内统一作映射
  const active = form.getFieldValue(name) && form.getFieldValue(name)[0];

  return (
    <div
      className={classNames(prefixCls, className, {
        [`${prefixCls}_disabled`]: disabled
      })}
    >
      <AMPicker
        {...form.getFieldProps(name, {
          initialValue,
          ...option
        })}
        cols={1}
        title={label || title}
        disabled={disabled}
        extra={_extra}
        {...other}
      >
        <List.Item
          className={classNames({
            [`${prefixCls}__list-item`]: true,
            [utils.getFormItemCls(name)]: true,
            [`${prefixCls}__list-item_active`]: active
          })}
          arrow="horizontal"
        >
          {label && (
            <div className="am-input-label am-input-label-5">
              {utils.getLabelDecorator(option)(label)}
            </div>
          )}
        </List.Item>
      </AMPicker>

      <style jsx global>{`
        .c-form-picker {
        }
        .${prefixCls}_disabled .am-input-label {
          color: ${Styles.color_disabled};
        }
        .${prefixCls}__list-item .am-list-content {
          flex: initial !important;
        }
        /* extra 居左 */
        .${prefixCls}__list-item .am-list-extra {
          flex: 1;
          font-size: ${Styles.font_form} !important;
          text-align: left !important;
          color: ${Styles.color_sub} !important;
        }
        .${prefixCls}__list-item_active .am-list-extra {
          color: ${Styles.color_desc} !important;
        }
        .${prefixCls}_disabled .am-list-extra {
          color: ${Styles.color_sub} !important;
        }
      `}</style>
    </div>
  );
};

export default Picker;
