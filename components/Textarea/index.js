/**
 * const prefixCls = 'style-153621';
 * const images = '/static/images/components/Textarea';
 * @Author: czy0729
 * @Date: 2018-07-05 17:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 17:02:07
 * @Path m.benting.com.cn /components/Textarea/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { TextareaItem } from 'antd-mobile';
import Const from '@const';
import Styles from '@styles';

const prefixCls = 'c-textarea';

const Textarea = props => {
  const { rows = 4, count = 200, className, ...other } = props;

  return (
    <React.Fragment>
      <TextareaItem
        className={classNames(prefixCls, className)}
        placeholder="说点是什么吧..."
        clear
        rows={rows}
        count={count}
        {...other}
      />

      <style jsx global>{`
        .c-textarea {
          width: 100%;
          padding: 0.08rem 0.16rem !important;
          background: ${Styles.color_theme};
          // border-bottom: 0.02rem solid ${Styles.color_border};
          border-radius: ${Styles.radius_xs};
        }
        .${prefixCls} .am-textarea-control {
          padding-top: 0;
          padding-bottom: 0;
        }
        .${prefixCls} .am-textarea-clear {
          margin-top: -0.16rem;
          background-color: transparent;
          background-image: url('${Const.__IMG__}/icon/clear${Const.__IMG_DPR__}.png');
        }
        .${prefixCls} textarea {
          color: ${Styles.color_desc};
          background: ${Styles.color_theme};
        }
      `}</style>
    </React.Fragment>
  );
};

export default Textarea;
