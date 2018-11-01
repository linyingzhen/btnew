/**
 * const prefixCls = 'style-146050';
 * const images = '/static/images/components/Result';
 * @Author: czy0729
 * @Date: 2018-08-12 18:26:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-07 12:18:06
 * @Path m.benting.com.cn /components/Result/index.js
 */
import React from 'react';
import classNames from 'classnames';
import Styles from '@styles';

const prefixCls = 'c-result';

export default class Result extends React.Component {
  static propsTypes = {};
  static defaultProps = {};

  render() {
    const { image, title, desc, titleStyle, className, style } = this.props;

    return (
      <div className={classNames(className, prefixCls)} style={style}>
        <div className="wrap-img">
          {image && <img className="img-thumb" src={image} alt="" />}
        </div>
        {title && (
          <p className="t-34 l-48 t-title t-c" style={titleStyle}>
            {title}
          </p>
        )}
        {desc && <p className="t-24 l-34 t-sub t-c mt-12">{desc}</p>}

        <style jsx>{`
          .c-result {
            min-height: 6rem;
            padding-bottom: ${Styles.bottom};
            overflow: hidden;
          }
          .wrap-img {
            min-height: 4.14rem;
            padding: ${Styles.lg} 0;
          }
          .img-thumb {
            display: block;
            width: 4rem;
            margin: 0 auto;
          }
        `}</style>
      </div>
    );
  }
}
