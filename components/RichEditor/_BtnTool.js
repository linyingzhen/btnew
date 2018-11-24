/**
 * const prefixCls = 'style-163940';
 * const images = '/static/images/components/RichEditor';
 * @Author: czy0729
 * @Date: 2018-11-07 00:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-10 17:05:12
 * @Path bt_mb_new /components/RichEditor/_BtnTool.js.git
 */
import React from 'react';
import classNames from 'classnames';
import Styles from '@styles';
import Icon from '../Icon';

const prefixCls = 'style-163940';

const _BtnTool = props => {
  const { type, className, ...other } = props;

  return (
    <div
      className={classNames(prefixCls, className, 'tool-animate-scale')}
      {...other}
    >
      <Icon className="t-28" type={type} />

      <style jsx>{`
        .style-163940 {
          display: inline-block;
          width: 0.56rem;
          height: 0.56rem;
          text-align: center;
          line-height: 0.56rem;
          border: 0.01rem solid ${Styles.color_desc};
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default _BtnTool;
