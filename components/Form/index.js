/**
 * const prefixCls = 'style-156658';
 * const images = '/static/images/components/Form';
 * @Author: czy0729
 * @Date: 2018-07-02 14:29:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-07 16:04:38
 * @Path m.benting.com.cn /components/Form/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { List } from 'antd-mobile';
import Const from '@const';
import Styles from '@styles';
import Button from './Button';
import Captcha from './Captcha';
import Input from './Input';
import MoneyInput from './MoneyInput';
import Picker from './Picker';
import DatePicker from './DatePicker';
import Textarea from './Textarea';
import Upload from './Upload';

const prefixCls = 'c-form';

const Form = props => {
  const {
    form,
    onSubmit,
    id = 'form',
    renderHeader,
    label,
    className,
    children,
    style,
    ...other
  } = props;

  return (
    <form
      className={classNames(prefixCls, className, {
        [`${prefixCls}_has-header`]: !!renderHeader,
        [`${prefixCls}_no-label`]: !label
      })}
      id={id}
      style={style}
      onSubmit={onSubmit}
    >
      <List renderHeader={renderHeader} {...other}>
        {React.Children.map(children, (item, index) => {
          if (!item) {
            return null;
          }

          return React.cloneElement(item, {
            key: index,
            form
          });
        })}
      </List>

      <style jsx global>{`
        .c-form {
          margin-top: ${Styles.distance};
        }
        .${prefixCls}_has-header {
          margin-top: 0;
        }
        .${prefixCls}_no-label .am-input-label {
          width: auto !important;
          margin-right: 0.24rem;
        }
        .${prefixCls}__label {
          display: inline-block;
          position: relative;
        }
        .${prefixCls}__label-required:after {
          content: '*';
          display: inline-block;
          position: absolute;
          top: 50%;
          margin-left: 0.08rem;
          margin-top: -0.2rem;
          font-family: SimSun;
          font-size: 0.24rem;
          line-height: 0.34rem;
          color: ${Styles.color_danger};
        }
        .${prefixCls} .am-list-header {
          background-color: transparent;
        }
        .${prefixCls} .am-list-body {
          border-top: 0;
          border-bottom: 0;
        }
        .${prefixCls} .am-list-body:before,
        .${prefixCls} .am-list-body:after {
          display: none !important;
        }
        .${prefixCls} .am-list-line {
          border-bottom: 0.01rem solid ${Styles.color_border};
        }
        .${prefixCls}
          .am-list-body
          > .am-list-item:nth-last-child(1)
          .am-list-line {
          border-bottom: 0 !important;
        }
        .${prefixCls} .am-list-content {
          padding-top: 0.16rem !important;
          padding-bottom: 0.16rem !important;
        }
        .${prefixCls} textarea {
          font-size: ${Styles.font_form} !important;
          color: ${Styles.color_desc} !important;
        }
        .${prefixCls} textarea::-webkit-input-placeholder {
          color: ${Styles.color_sub} !important;
        }
        .${prefixCls} .am-textarea-clear {
          background-position: center;
          background-color: transparent !important;
          background-image: url(${Const.__IMG__}/icon/clear${Const.__IMG_DPR__}.png);
        }
        .${prefixCls} .am-list-item.am-textarea-error .am-textarea-error-extra {
          background-image: url(${Const.__IMG__}/icon/information${Const.__IMG_DPR__}.png);
        }
      `}</style>
    </form>
  );
};

Form.propTypes = {
  form: PropTypes.object.isRequired
};
Form.Button = Button;
Form.Captcha = Captcha;
Form.Input = Input;
Form.MoneyInput = MoneyInput;
Form.Picker = Picker;
Form.DatePicker = DatePicker;
Form.Textarea = Textarea;
Form.Upload = Upload;

export default Form;
