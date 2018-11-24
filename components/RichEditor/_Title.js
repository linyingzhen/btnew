/**
 * const prefixCls = 'style-135473';
 * const images = '/static/images/components/RichEditor';
 * @Author: czy0729
 * @Date: 2018-07-11 23:39:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-10 17:11:14
 * @Path m.benting.com.cn /components/RichEditor/_Title.js
 */
import React from 'react';
import classNames from 'classnames';
import { TextareaItem } from 'antd-mobile';
import Styles from '@styles';

const prefixCls = 'style-135473';

const _Title = props => {
  const { value, onChange, className } = props;

  return (
    <div className={classNames(prefixCls, className)}>
      <TextareaItem
        placeholder="请输入标题"
        autoHeight
        clear
        value={value}
        onChange={onChange}
      />

      <style jsx global>{`
        .style-135473 {
          margin: 0 ${Styles.wind} !important;
          border-bottom: 0.02rem solid ${Styles.color_border};
        }
        .${prefixCls} .am-textarea-item {
          padding-left: 0 !important;
        }
        .${prefixCls} .am-textarea-clear {
          margin-top: 0;
        }
        .${prefixCls} textarea {
          font-size: ${Styles.t_34};
          line-height: 0.48rem;
        }
        .${prefixCls} textarea::-webkit-input-placeholder {
          color: ${Styles.color_sub};
        }
      `}</style>
    </div>
  );
};

export default _Title;
