/**
 * const prefixCls = 'style-592589';
 * const images = '/static/images/components/Lazy';
 * @Author: czy0729
 * @Date: 2018-08-29 15:52:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-29 16:36:43
 * @Path m.benting.com.cn /components/Lazy/index.js
 */
import React from 'react';
import LazyLoad from 'react-lazyload';

const Lazy = props => {
  const {
    height = '0.01rem',
    throttle = 160,
    offset = 160,
    once = true,
    onDidMount = Function.prototype,
    children,
    ...other
  } = props;

  return (
    <LazyLoad
      height={height}
      throttle={throttle}
      offset={offset}
      once={once}
      {...other}
    >
      <Wrap onDidMount={onDidMount}>{children}</Wrap>
    </LazyLoad>
  );
};

class Wrap extends React.Component {
  componentDidMount() {
    const { onDidMount } = this.props;

    onDidMount();
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

export default Lazy;
