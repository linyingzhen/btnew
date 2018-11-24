/**
 * const prefixCls = 'style-553306';
 * const images = '/static/images/components/Form';
 * @Author: czy0729
 * @Date: 2018-08-11 16:11:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-15 17:11:28
 * @Path m.benting.com.cn /components/Form/Picker.js
 */
import React from 'react';
import classNames from 'classnames';
import { Picker as AMPicker } from 'antd-mobile';
import Const from '@const';
import Styles from '@styles';
import List from '../List';
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
        [`${prefixCls}_disabled`]: disabled,
        [`${prefixCls}_error`]: !!form.getFieldError(name)
      })}
    >
      <AMPicker
        {...form.getFieldProps(name, {
          initialValue,
          ...option
        })}
        cols={1}
        title={title || label}
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
