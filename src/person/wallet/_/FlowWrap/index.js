/**
 * const prefixCls = 'style-105627';
 * const images = '/static/images/src/person/wallet/_/FlowWrap';
 * @Author: czy0729
 * @Date: 2018-09-14 10:00:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-02 10:35:42
 * @Path m.benting.com.cn /src/person/wallet/_/FlowWrap/index.js
 */
import React from 'react';
import classNames from 'classnames';
import Utils from '@utils';

const prefixCls = 'style-105627';
const images = Utils.cdn('/static/images/src/person/wallet/_/FlowWrap');

const FlowWrap = ({ className, children }) => (
  <div className={classNames(prefixCls, className)}>
    {children}
    <img className="img-wave" src={`${images}/wave.png`} alt="" />

    <style jsx>{`
      .style-105627 {
        padding: 1.18rem 0 0 0;
        margin-top: -1rem;
        background-image: linear-gradient(
          90deg,
          rgba(90, 194, 255, 1),
          rgba(46, 142, 255, 1)
        );
        overflow: hidden;
      }
      .img-wave {
        width: 100%;
        min-height: 1.08rem;
        margin-bottom: -0.01rem;
        opacity: 0.4;
      }
    `}</style>
  </div>
);

export default FlowWrap;
