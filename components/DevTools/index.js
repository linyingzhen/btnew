/**
 * const prefixCls = 'style-111741';
 * const images = '/static/images/components/DevTools';
 * @Author: czy0729
 * @Date: 2018-10-31 17:13:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-31 17:55:04
 * @Path bt_mb_new /components/DevTools/index.js
 */
import React from 'react';
import DevTools from 'mobx-react-devtools';

const prefixCls = 'c-dev-tools';

const _DevTools = () => (
  <div className={prefixCls}>
    <DevTools />

    <style jsx global>{`
      .c-dev-tools {
      }
      /* 顶部按钮 */
      .${prefixCls} > div > div:first-child > div {
        width: 2.86rem;
        height: 0.52rem !important;
        border: 0.01rem solid #aaa !important;
      }
      .${prefixCls} button {
        width: 0.52rem !important;
        margin: 0 0.2rem !important;
        background-size: 0.32rem 0.32rem !important;
      }
      /* 渲染线条 */
      .${prefixCls} > div > div + div > div {
        position: relative;
        outline: 0 !important;
      }
      .${prefixCls} > div > div + div > div:before {
        content: '';
        position: absolute;
        top: 0.04rem;
        right: 0.04rem;
        bottom: 0.04rem;
        left: 0.04rem;
        border: 0.04rem solid rgba(182, 218, 146, 0.75);
      }
      .${prefixCls} > div > div + div > div > span {
        padding: 0 0.08rem 0.04rem !important;
        font-size: 0.24rem !important;
        line-height: 0.24rem !important;
      }
    `}</style>
  </div>
);

export default _DevTools;
