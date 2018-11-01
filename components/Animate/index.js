/**
 * const prefixCls = 'style-339513';
 * const images = '/static/images/components/Animate';
 * @Author: czy0729
 * @Date: 2018-06-24 18:13:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-21 12:31:50
 * @Path m.benting.com.cn /components/Animate/index.js
 */
import React from 'react';
import classNames from 'classnames';
import Animate from 'rc-animate';

const prefixCls = 'c-animate';

const _Animate = props => {
  const { type = 'fade', className, children } = props;

  return (
    <React.Fragment>
      <Animate
        className={classNames(prefixCls, className)}
        transitionName={type}
      >
        {children}
      </Animate>

      <style jsx global>{`
        .c-animate {
        }

        /* ==================== top ==================== */
        .${prefixCls} .top-enter,
        .${prefixCls} .top-appear,
        .${prefixCls} .top-leave {
          animation-duration: 0.24s;
          animation-fill-mode: both;
          animation-timing-function: ease-in-out;
          animation-play-state: paused;
        }
        .${prefixCls} .top-enter,
        .${prefixCls} .top-appear {
          transform: translate3d(0, -100%, 0);
        }
        .${prefixCls} .top-leave {
          transform: translate3d(0, 0, 0);
        }
        .${prefixCls} .top-enter.top-enter-active,
        .${prefixCls} .top-appear.top-appear-active {
          animation-name: topin;
          animation-play-state: running;
        }
        .${prefixCls} .top-leave.top-leave-active {
          animation-name: topout;
          animation-play-state: running;
        }
        @keyframes topin {
          0% {
            transform: translate3d(0, -100%, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes topout {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(0, -100%, 0);
          }
        }

        /* ==================== bottom ==================== */
        .${prefixCls} .bottom-enter,
        .${prefixCls} .bottom-appear,
        .${prefixCls} .bottom-leave {
          animation-duration: 0.3s;
          animation-fill-mode: both;
          animation-timing-function: ease-in-out;
          animation-play-state: paused;
        }
        .${prefixCls} .bottom-enter,
        .${prefixCls} .bottom-appear {
          transform: translate3d(0, 100%, 0);
        }
        .${prefixCls} .bottom-leave {
          transform: translate3d(0, 0, 0);
        }
        .${prefixCls} .bottom-enter.bottom-enter-active,
        .${prefixCls} .bottom-appear.bottom-appear-active {
          animation-name: bottomin;
          animation-play-state: running;
        }
        .${prefixCls} .bottom-leave.bottom-leave-active {
          animation-name: bottomout;
          animation-play-state: running;
        }
        @keyframes bottomin {
          0% {
            transform: translate3d(0, 100%, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes bottomout {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(0, 100%, 0);
          }
        }

        /* ==================== left ==================== */
        .${prefixCls} .left-enter,
        .${prefixCls} .left-appear,
        .${prefixCls} .left-leave {
          animation-duration: 0.3s;
          animation-fill-mode: both;
          animation-timing-function: ease-in-out;
          animation-play-state: paused;
        }
        .${prefixCls} .left-enter,
        .${prefixCls} .left-appear {
          transform: translate3d(100%, 0, 0);
        }
        .${prefixCls} .left-leave {
          transform: translate3d(0, 0, 0);
        }
        .${prefixCls} .left-enter.left-enter-active,
        .${prefixCls} .left-appear.left-appear-active {
          animation-name: leftin;
          animation-play-state: running;
        }
        .${prefixCls} .left-leave.left-leave-active {
          animation-name: leftout;
          animation-play-state: running;
        }
        @keyframes leftin {
          0% {
            transform: translate3d(100%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes leftout {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(100%, 0, 0);
          }
        }

        /* ==================== fade ==================== */
        .${prefixCls} .fade-enter,
        .${prefixCls} .fade-appear,
        .${prefixCls} .fade-leave {
          animation-duration: 0.24s;
          animation-fill-mode: both;
          animation-play-state: paused;
          animation-timing-function: ease-in;
        }
        .${prefixCls} .fade-leave {
          animation-duration: 0.16s;
        }
        .${prefixCls} .fade-enter,
        .${prefixCls} .fade-appear {
          opacity: 0;
        }
        .${prefixCls} .fade-enter.fade-enter-active,
        .${prefixCls} .fade-appear.fade-appear-active {
          animation-name: fadein;
          animation-play-state: running;
        }
        .${prefixCls} .fade-leave.fade-leave-active {
          animation-name: fadeout;
          animation-play-state: running;
        }
        @keyframes fadein {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes fadeout {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        /* ==================== fade-float ==================== */
        .${prefixCls} .fade-float-enter,
        .${prefixCls} .fade-float-appear,
        .${prefixCls} .fade-float-leave {
          animation-duration: 0.24s;
          animation-fill-mode: both;
          animation-play-state: paused;
        }
        .${prefixCls} .fade-float-leave {
          animation-duration: 0.16s;
        }
        .${prefixCls} .fade-float-enter,
        .${prefixCls} .fade-float-appear {
          opacity: 0;
        }
        .${prefixCls} .fade-float-enter.fade-float-enter-active,
        .${prefixCls} .fade-float-appear.fade-float-appear-active {
          animation-name: fadeFloatIn;
          animation-play-state: running;
        }
        .${prefixCls} .fade-float-leave.fade-float-leave-active {
          animation-name: fadeFloatOut;
          animation-play-state: running;
        }
        @keyframes fadeFloatIn {
          0% {
            opacity: 0;
            transform: translate3d(0, 16%, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes fadeFloatOut {
          0% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
          100% {
            opacity: 0;
            transform: translate3d(0, 16%, 0);
          }
        }
      `}</style>
    </React.Fragment>
  );
};

export default _Animate;
