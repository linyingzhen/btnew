/**
 * const prefixCls = 'style-909290';
 * const images = '/static/images/common/const';
 * @Author: czy0729
 * @Date: 2018-07-02 15:04:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-07 14:22:03
 * @Path m.benting.com.cn /common/const/rules.js
 */
import React from 'react';
import classNames from 'classnames';

class Utils {
  /**
   * 构造一个根据name生成的表单项目唯一类名
   * @version 170311 1.0
   * @param  {String} *name
   * @return {String}
   */
  getFormItemCls(name) {
    return `c-form_${name}`;
  }

  /**
   * 构造必填label
   * @version 170208 1.0
   * @param  {Element} content
   * @return {Element}
   */
  getLabel(content, isRequired) {
    return (
      <span
        className={classNames('c-form__label', {
          'c-form__label-required': isRequired,
          't-30': content.length <= 4,
          't-28': content.length > 4
        })}
      >
        {content}
      </span>
    );
  }

  /**
   * 根据option，构造label
   * @version 170208 1.0
   * @param  {Object} option
   * @return {Func}
   */
  getLabelDecorator(option = { rules: [] }) {
    let required = false;

    option.rules.forEach(item => {
      if (item.required) {
        required = true;

        return false;
      }
      return true;
    });

    return content => this.getLabel(content, required);
  }
}

export default new Utils();
