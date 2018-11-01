/**
 * const prefixCls = 'style-148737';
 * const images = '/static/images/components/WaterMark';
 * @Author: czy0729
 * @Date: 2018-10-07 10:10:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-07 10:41:08
 * @Path m.benting.com.cn /components/WaterMark/index.js
 */
import React from 'react';
import { getSVGTextBase64 } from './ds';

const prefixCls = 'c-water-mark';

export default class WaterMark extends React.Component {
  svgWaterMark;

  render() {
    const { text, style, children } = this.props;

    if (!this.svgWaterMark) {
      this.svgWaterMark = getSVGTextBase64(text, style);
    }

    return (
      <div className={prefixCls}>
        {children}

        <style jsx global>{`
          .c-water-mark:after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-image: url(${this.svgWaterMark});
            pointer-events: none;
          }
        `}</style>
      </div>
    );
  }
}
