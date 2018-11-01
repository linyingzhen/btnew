/**
 * const prefixCls = 'style-490823';
 * const images = '/static/images/components/Global';
 * @Author: czy0729
 * @Date: 2018-06-20 16:57:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 20:24:31
 * @Path m.benting.com.cn \components\Global\index.js
 */
import React from 'react';
import Styles from '@styles';

export default () => (
  <React.Fragment>
    <style jsx global>{`
      /* 全局基本重设 */
      * {
        padding: 0;
        margin: 0;
        outline: 0;
        box-sizing: border-box;
        -webkit-overflow-scrolling: touch;
        -webkit-font-smoothing: antialiased;
      }
      html,
      body,
      font,
      input,
      select,
      button,
      p,
      textarea {
        font-family: ${Styles.font_family};
        font-size: 0.28rem;
        font-weight: ${Styles.font_normal};
        line-height: 1;
      }
      html,
      body {
        width: 100%;
      }
      body {
        color: ${Styles.color_desc};
        overflow-x: hidden;
        background: ${Styles.color_bg};
        -webkit-touch-callout: none;
        -webkit-text-size-adjust: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-user-select: none;
      }
      img {
        display: inline-block;
        vertical-align: top;
        outline-width: 0;
      }
      a {
        color: inherit;
      }
      /* 在X5新内核Blink中，在排版页面的时候，会主动对字体进行放大，会检测页面中的主字体，
        当某一块字体在我们的判断规则中，认为字号较小，并且是页面中的主要字体，并且是页面中的主要字体，
        就会采取主动放大的操作。然而这不是我们想要的，可以采取给最大高度解决。*/
      .uc div,
      .uc p,
      .uc span,
      .uc a,
      .uc button,
      .uc input,
      .uc textarea,
      .uc img,
      .uc i,
      .uc ul,
      .uc li,
      .uc form,
      .uc label {
        max-height: 100000px;
      }

      /* ==================== antd-mobile reset v2 ==================== */
      /* <List.Item> : 样式 */
      .am-list-body:before,
      .am-list-body:after {
        content: initial !important;
      }
      .am-list-item {
        padding-left: ${Styles.wind} !important;
      }
      .am-list-item .am-list-line:after {
        content: initial !important;
      }
      .am-list-item .am-list-line {
        padding-right: ${Styles.wind} !important;
        border-bottom: ${Styles.border} !important;
      }
      .am-list-body > .am-list-item:nth-last-child(1) .am-list-line {
        border-bottom: 0 !important;
      }
      .am-list-item .am-list-line .am-list-content {
        padding-top: 0.24rem !important;
        padding-bottom: 0.24rem !important;
        line-height: 1;
        color: inherit;
      }
      .am-list-item .am-list-line .am-list-extra {
        line-height: 1;
      }
      .am-list-item .am-list-thumb:first-child {
        margin-right: 0.24rem;
      }

      /* <Badge> : 样式 */
      .am-badge-dot {
        background: ${Styles.color_danger};
      }

      /* <List> : renderHeader 和 renderFooter */
      .am-list-header {
        padding: ${Styles.sm} 0.32rem;
        background: transparent;
      }
      .am-list-footer {
        padding: ${Styles.sm} 0.32rem;
        // background: ${Styles.color_bg};
      }

      /* <Toast> : 样式 偏上一点 */
      .am-toast:not(.am-toast-nomask) .am-toast-notice {
        margin-top: -2.2rem;
      }
      .am-toast:not(.am-toast-nomask) .am-toast-notice .am-toast-text {
        padding: 0.4rem 0.64rem;
        background-color: rgba(58, 58, 58, 0.8);
      }

      /* <Toast> : 样式 无遮罩轻提示 */
      .am-toast.am-toast-nomask {
        position: fixed;
        top: 86%;
      }
      .am-toast.am-toast-nomask .am-toast-text {
        background-color: rgba(58, 58, 58, 0.8);
      }

      /* <ActionSheet> : 样式 扁平风格 */
      .am-action-sheet {
        padding: ${Styles.sm};
        background-color: transparent;
      }
      .am-action-sheet-button-list-item {
        background-color: ${Styles.color_theme};
      }
      .am-action-sheet-button-list-item:first-child {
        border-top-left-radius: ${Styles.radius_xs};
        border-top-right-radius: ${Styles.radius_xs};
      }
      .am-action-sheet-button-list-item:nth-last-child(2) {
        border-bottom-left-radius: ${Styles.radius_xs};
        border-bottom-right-radius: ${Styles.radius_xs};
      }
      .am-action-sheet-button-list-item:last-child {
        border-radius: ${Styles.radius_xs};
      }
      .am-action-sheet-cancel-button-mask {
        display: none;
      }

      /* <ActionSheet> : Share样式 扁平风格 */
      .am-action-sheet.am-action-sheet-share {
        padding: ${Styles.sm};
        background-color: transparent;
      }
      .am-action-sheet.am-action-sheet-share .am-action-sheet-message {
        margin: 0;
        padding: 0.32rem;
        background-color: ${Styles.color_bg};
        border-top-left-radius: ${Styles.radius_xs};
        border-top-right-radius: ${Styles.radius_xs};
      }
      .am-action-sheet.am-action-sheet-share .am-action-sheet-share-list {
        border-top: 0.01rem solid ${Styles.color_border};
        background-color: ${Styles.color_bg};
        border-bottom-left-radius: ${Styles.radius_xs};
        border-bottom-right-radius: ${Styles.radius_xs};
      }
      .am-action-sheet.am-action-sheet-share
        .am-action-sheet-share-list-item:last-child {
        opacity: 0;
        width: 0.08px;
        overflow: hidden;
      }
      .am-action-sheet.am-action-sheet-share
        .am-action-sheet-share-cancel-button {
        margin-top: ${Styles.sm};
        border-radius: ${Styles.radius_xs};
      }

      /* <InputItem> : 金额键盘动画统一 */
      .am-number-keyboard-wrapper {
        transition-duration: 0.3s;
        transition-timing-function: ease-in-out;
      }

      /* <Modal> : 全屏modal */
      .am-modal-wrap {
        z-index: ${Styles.z_modal_wrap};
      }

      /* <Search> */
      .am-search {
        background-color: #fff !important;
      }
      .am-search-input {
        background-color: ${Styles.color_bg} !important;
      }
      .am-search-input-start .am-search-input-synthetic-ph {
        width: 2.56rem !important;
        padding-left: ${Styles.wind} !important;
      }
      .am-search-clear-show {
        margin-top: 0.12rem;
        margin-right: ${Styles.wind};
      }

      /* <Stepper> */
      .am-stepper {
        padding: 0;
        border: ${Styles.border};
      }
      .am-stepper-handler {
        width: 0.72rem;
        height: 0.72rem;
        border: 0;
        border-radius: 0;
      }
      .am-stepper-handler-down {
        border-right: ${Styles.border};
      }
      .am-stepper-handler-up {
        border-left: ${Styles.border};
      }

      /* ==================== utils v2 ==================== */
      /* margin-top */
      .mt-4 {
        margin-top: 0.04rem !important;
      }
      .mt-6 {
        margin-top: 0.06rem !important;
      }
      .mt-xs,
      .mt-8 {
        margin-top: 0.08rem !important;
      }
      .mt-10 {
        margin-top: 0.1rem !important;
      }
      .mt-12 {
        margin-top: 0.12rem !important;
      }
      .mt-14 {
        margin-top: 0.14rem !important;
      }
      .mt-d,
      .mt-sm,
      .mt-16 {
        margin-top: 0.16rem !important;
      }
      .mt-18 {
        margin-top: 0.18rem !important;
      }
      .mt-20 {
        margin-top: 0.2rem !important;
      }
      .mt-22 {
        margin-top: 0.22rem !important;
      }
      .mt-24 {
        margin-top: 0.24rem !important;
      }
      .mt-28 {
        margin-top: 0.28rem !important;
      }
      .mt-md,
      .mt-32 {
        margin-top: 0.32rem !important;
      }
      .mt-36 {
        margin-top: 0.36rem !important;
      }
      .mt-40 {
        margin-top: 0.4rem !important;
      }
      .mt-42 {
        margin-top: 0.42rem !important;
      }
      .mt-44 {
        margin-top: 0.44rem !important;
      }
      .mt-48 {
        margin-top: 0.48rem !important;
      }
      .mt-52 {
        margin-top: 0.52rem !important;
      }
      .mt-56 {
        margin-top: 0.56rem !important;
      }
      .mt-60 {
        margin-top: 0.6rem !important;
      }
      .mt-lg,
      .mt-64 {
        margin-top: 0.64rem !important;
      }
      .mt-72 {
        margin-top: 0.72rem !important;
      }
      .mt-80 {
        margin-top: 0.8rem !important;
      }
      .mt-96 {
        margin-top: 0.96rem !important;
      }
      .mt-128 {
        margin-top: 1.28rem !important;
      }

      /* margin-left */
      .ml-4 {
        margin-left: 0.04rem !important;
      }
      .ml-xs,
      .ml-8 {
        margin-left: 0.08rem !important;
      }
      .ml-12 {
        margin-left: 0.12rem !important;
      }
      .ml-sm,
      .ml-16 {
        margin-left: 0.16rem !important;
      }
      .ml-20 {
        margin-left: 0.2rem !important;
      }
      .ml-24 {
        margin-left: 0.24rem !important;
      }
      .ml-md,
      .ml-32 {
        margin-left: 0.32rem !important;
      }
      .ml-42 {
        margin-left: 0.42rem !important;
      }
      .ml-48 {
        margin-left: 0.48rem !important;
      }
      .ml-54 {
        margin-left: 0.54rem !important;
      }

      /* margin-bottom */
      .mb-d {
        margin-bottom: ${Styles.distance};
      }
      .mb-md {
        margin-bottom: ${Styles.md};
      }

      /* margin-right */
      .mr-xs {
        margin-right: 0.08rem !important;
      }
      .mr-sm,
      .mr-16 {
        margin-right: 0.16rem !important;
      }
      .mr-32 {
        margin-right: 0.32rem !important;
      }

      /* font-size */
      .t-20 {
        font-size: ${Styles.t_20} !important;
        line-height: 1.5;
      }
      .t-22 {
        font-size: ${Styles.t_22} !important;
        line-height: 1.5;
      }
      .t-24 {
        font-size: ${Styles.t_24} !important;
        line-height: 1.5;
      }
      .t-26 {
        font-size: ${Styles.t_26} !important;
        line-height: 1.5;
      }
      .t-sm,
      .t-28 {
        font-size: ${Styles.t_28} !important;
        line-height: 1.5;
      }
      .t-30 {
        font-size: ${Styles.t_30} !important;
        line-height: 1.5;
      }
      .t-32 {
        font-size: ${Styles.t_32} !important;
        line-height: 1.5;
      }
      .t-34 {
        font-size: ${Styles.t_34} !important;
        line-height: 1.5;
      }
      .t-36 {
        font-size: ${Styles.t_36} !important;
        line-height: 1.5;
      }
      .t-40 {
        font-size: ${Styles.t_40} !important;
        line-height: 1.5;
      }
      .t-44 {
        font-size: ${Styles.t_44} !important;
        line-height: 1.5;
      }
      .t-48 {
        font-size: ${Styles.t_48} !important;
        line-height: 1.5;
      }
      .t-52 {
        font-size: ${Styles.t_52} !important;
        line-height: 1.5;
      }
      .t-56 {
        font-size: ${Styles.t_56} !important;
        line-height: 1.5;
      }
      .t-64 {
        font-size: ${Styles.t_64} !important;
        line-height: 1.5;
      }
      .t-72 {
        font-size: ${Styles.t_72} !important;
        line-height: 1.5;
      }

      /* line-height */
      .l-28 {
        min-height: 0.28rem;
        line-height: 0.28rem !important;
      }
      .l-32 {
        min-height: 0.32rem;
        line-height: 0.32rem !important;
      }
      .l-34 {
        min-height: 0.34rem;
        line-height: 0.34rem !important;
      }
      .l-36 {
        min-height: 0.36rem;
        line-height: 0.36rem !important;
      }
      .l-40 {
        min-height: 0.4rem;
        line-height: 0.4rem !important;
      }
      .l-42 {
        min-height: 0.42rem;
        line-height: 0.42rem !important;
      }
      .l-44 {
        min-height: 0.44rem;
        line-height: 0.44rem !important;
      }
      .l-48 {
        min-height: 0.48rem;
        line-height: 0.48rem !important;
      }
      .l-50 {
        min-height: 0.5rem;
        line-height: 0.5rem !important;
      }
      .l-56 {
        min-height: 0.56rem;
        line-height: 0.56rem !important;
      }
      .l-64 {
        min-height: 0.64rem;
        line-height: 0.64rem !important;
      }
      .l-66 {
        min-height: 0.66rem;
        line-height: 0.66rem !important;
      }
      .l-80 {
        min-height: 0.8rem;
        line-height: 0.8rem !important;
      }
      .l-100 {
        min-height: 1rem;
        line-height: 1rem !important;
      }

      /* min-height */
      .mh-96 {
        min-height: 0.96rem;
      }

      /* color */
      .t-primary {
        color: ${Styles.color_primary} !important;
      }
      .t-danger {
        color: ${Styles.color_danger} !important;
      }
      .t-warning {
        color: ${Styles.color_warning} !important;
      }
      .t-success {
        color: ${Styles.color_success} !important;
      }
      .t-void {
        color: #fff !important;
      }
      .t-title {
        color: ${Styles.color_title} !important;
      }
      .t-sub {
        color: ${Styles.color_sub} !important;
      }
      .t-icon {
        color: ${Styles.color_icon} !important;
      }
      .t-disabled {
        color: ${Styles.color_disabled} !important;
      }
      .t-event {
        color: ${Styles.color_event} !important;
      }
      .t-gold {
        color: ${Styles.color_gold} !important;
      }
      .t-lingdong {
        color: ${Styles.color_lingdong} !important;
      }

      /* text other */
      .t-b {
        font-weight: ${Styles.font_bold} !important;
      }
      .t-m {
        font-weight: ${Styles.font_medium} !important;
      }
      .t-c {
        text-align: center !important;
      }
      .t-r {
        text-align: right !important;
      }
      .t-c1 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-wrap: break-word;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .t-c2 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-wrap: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .t-c4 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-wrap: break-word;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }

      /* letter-spacing */
      // .ls-o1 {
      //   letter-spacing: -0.01rem;
      // }
      .ls-1 {
        letter-spacing: 0.01rem;
      }

      /* other useful */
      .p-w {
        padding-left: ${Styles.wind};
        padding-right: ${Styles.wind};
      }
      .p-sw {
        padding: ${Styles.space} ${Styles.wind} !important;
      }
      .pull-right {
        float: right;
      }
      .user-select {
        -webkit-user-select: text !important;
      }
      .border {
        border: ${Styles.border};
      }
      .del {
        text-decoration: line-through;
      }

      /* ==================== tool v2 ==================== */
      /* 180701 wrap */
      .tool-wrap {
        padding: 0.32rem ${Styles.wind} 0.48rem;
        background: ${Styles.color_theme};
      }
      .tool-wrap-no-bottom {
        padding: 0.32rem ${Styles.wind} 0.04rem;
        background: ${Styles.color_theme};
      }
      .tool-wrap-no-top {
        padding: 0 ${Styles.wind} ${Styles.bottom};
        background: ${Styles.color_theme};
      }
      .tool-wind {
        padding-left: ${Styles.wind};
        padding-right: ${Styles.wind};
      }
      .tool-wrap-scroll {
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
        transform: translateZ(0);
      }
      .tool-wrap-empty {
        display: flex;
        justify-content: center;
        align-content: center;
        min-height: 50vw;
        background: ${Styles.color_theme};
      }

      /* 180911 fixed底 */
      .tool-fixed {
        position: fixed !important;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 0;
      }

      /* 增大Icon的点击面积 */
      .tool-wrap-icon {
        display: inline-block;
        padding: 0.16rem;
      }

      /* 170524 Emoji样式 */
      .tool-emoji {
        width: 0.4rem !important;
        height: 0.4rem !important;
        vertical-align: top !important;
      }

      /* 170620 老虎洋葱样式 */
      .tool-emoji-lg {
        min-width: 0.8rem;
        min-height: 0.8rem;
        margin-top: 0.04rem;
        margin-right: 0.02rem;
        vertical-align: bottom !important;
      }

      /* 180710 <List> */
      .tool-list-sm .am-list-item .am-list-line .am-list-content {
        padding-top: 0.16rem !important;
        padding-bottom: 0.16rem !important;
      }

      /* 180719 <List> 有间隔 */
      .tool-list-split .am-list-body {
        background-color: transparent;
        border-top: 0;
      }
      .tool-list-split .am-list-body:after {
        border-bottom: 0;
      }
      .tool-list-split .am-list-item {
        margin-top: ${Styles.distance};
      }
      .tool-list-split .am-list-item:first-child {
        margin-top: 0;
      }
      .tool-list-split .am-list-body div:not(:last-child) .am-list-line:after {
        content: initial;
        border-bottom: 0;
      }
      .tool-list-split .am-list-line.am-list-line-wrap {
        border-bottom: 0 !important;
      }

      /* 180711 动画 旋转 */
      .tool-animate-rotate {
        animation: animate-rotate 2s linear infinite;
      }
      @keyframes animate-rotate {
        0% {
          transform: rotate(360deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }

      /* 180906 动画 大小渐变 */
      .tool-animate-scale {
        transition: transform 0.16s ease-in-out;
      }
      .tool-animate-scale:active {
        transform: scale(0.92);
      }

      /* 181007 链接 */
      .tool-link {
        color: ${Styles.color_primary};
        text-decoration: underline;
      }

      /* ==================== 遗漏 ==================== */
      .mb-xs {
        margin-bottom: ${Styles.xs} !important;
      }
      .mb-lg {
        margin-bottom: ${Styles.lg} !important;
      }
    `}</style>
  </React.Fragment>
);
