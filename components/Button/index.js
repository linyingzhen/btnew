/**
 * const prefixCls = 'style-112370';
 * const images = '/static/images/components/Button';
 * @Author: czy0729
 * @Date: 2018-07-03 22:56:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 20:11:50
 * @Path m.benting.com.cn /components/Button/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { Button } from 'antd-mobile';
import Styles from '@styles';

const prefixCls = 'c-button';

const _Button = props => {
  const {
    className,
    type = 'default',
    ghost,
    size,
    disabled,
    radius,
    children,
    ...other
  } = props;

  return (
    <React.Fragment>
      <Button
        className={classNames(prefixCls, className, {
          [`${prefixCls}_${type}`]: !disabled,
          [`${prefixCls}_${size}`]: !!size,
          [`${prefixCls}_ghost`]: ghost,
          [`${prefixCls}_disabled`]: disabled,
          [`${prefixCls}_radius`]: !!radius
        })}
        disabled={disabled}
        {...other}
      >
        {children}
      </Button>

      <style jsx global>{`
        /* reset */
        .c-button {
          position: relative;
          height: 0.88rem;
          font-size: 0.3rem;
          line-height: 0.88rem;
          border-radius: 0.02rem;
        }
        .${prefixCls}:before {
          content: initial !important;
        }
        .${prefixCls}:after {
          ${Styles._full};
          content: '';
          background: rgba(0, 0, 0, 0);
          transition: all 0.16s;
        }
        .${prefixCls}.am-button-inline {
          min-width: 0.96rem;
          padding: 0 0.16rem;
        }

        /* active */
        .am-button-active.${prefixCls}:not(.${prefixCls}_disabled):after {
          background: rgba(0, 0, 0, 0.24);
        }
        .am-button-active.${prefixCls}.${prefixCls}_default:after {
          background: transparent;
        }

        /* type */
        .${prefixCls}_disabled {
          color: ${Styles.color_void};
          background: #d8d8d8 !important;
          opacity: 1 !important;
        }
        .${prefixCls}_default {
          border: ${Styles.border} !important;
        }
        .${prefixCls}_main {
          color: ${Styles.color_void};
          background: ${Styles.color_main} !important;
        }
        .${prefixCls}_dark {
          color: ${Styles.color_void};
          background: rgba(0, 0, 0, 0.56) !important;
        }
        .${prefixCls}_primary {
          color: ${Styles.color_void};
          background: ${Styles.color_primary} !important;
        }
        .${prefixCls}_danger {
          color: ${Styles.color_void};
          background: ${Styles.color_danger} !important;
        }
        .${prefixCls}_warning {
          color: ${Styles.color_void};
          background: ${Styles.color_warning} !important;
        }
        .${prefixCls}_success {
          color: ${Styles.color_void};
          background: ${Styles.color_success} !important;
        }
        .${prefixCls}_wait {
          color: ${Styles.color_void};
          background: ${Styles.color_wait} !important;
        }
        .${prefixCls}_event {
          background: ${Styles.color_event} !important;
        }

        /* ghost */
        .${prefixCls}_main.${prefixCls}_ghost {
          color: ${Styles.color_main};
          background: ${Styles.color_theme} !important;
          border: 0.02rem solid ${Styles.color_main} !important;
        }
        .${prefixCls}_dark.${prefixCls}_ghost {
          color: rgba(0, 0, 0, 0.56);
          background: rgba(0, 0, 0, 0.16) !important;
          border: 0.02rem solid rgba(0, 0, 0, 0.56) !important;
        }
        .${prefixCls}_primary.${prefixCls}_ghost {
          color: ${Styles.color_primary};
          background: ${Styles.color_theme} !important;
          border: 0.02rem solid ${Styles.color_primary} !important;
        }
        .am-button-active.${prefixCls}_primary.${prefixCls}_ghost:after {
          background: rgba(37, 117, 255, 0.24);
        }
        .${prefixCls}_danger.${prefixCls}_ghost {
          color: ${Styles.color_danger};
          background: ${Styles.color_theme} !important;
          border: 0.02rem solid ${Styles.color_danger} !important;
        }
        .am-button-active.${prefixCls}_danger.${prefixCls}_ghost:after {
          background: rgba(255, 65, 73, 0.24);
        }
        .${prefixCls}_success.${prefixCls}_ghost {
          color: ${Styles.color_success};
          background: ${Styles.color_theme} !important;
          border: 0.02rem solid ${Styles.color_success} !important;
        }
        .am-button-active.${prefixCls}_success.${prefixCls}_ghost:after {
          background: rgba(6, 219, 65, 0.24);
        }

        /* size & inline */
        .${prefixCls}_xs {
          height: 0.42rem;
          font-size: 0.2rem;
          line-height: 0.42rem;
        }
        .am-button-inline.${prefixCls}_xs {
          padding: 0 0.17rem;
        }
        .${prefixCls}_sm {
          height: 0.56rem;
          font-size: 0.24rem;
          line-height: 0.56rem;
        }

        /* radius */
        .${prefixCls}_radius {
          border-radius: 0.08rem;
        }
      `}</style>
    </React.Fragment>
  );
};

export default _Button;
