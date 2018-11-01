/**
 * const prefixCls = 'style-188194';
 * const images = '/static/images/components/Animate';
 * @Author: czy0729
 * @Date: 2018-08-21 11:50:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-21 11:52:33
 * @Path m.benting.com.cn /components/Animate/Wrap.js
 */
import React from 'react';
import Animate from './index';

export default class Wrap extends React.Component {
  state = {
    show: false
  };

  componentDidMount() {
    this.setState({
      show: true
    });
  }

  render() {
    const { children, ...other } = this.props;
    const { show } = this.state;

    return <Animate {...other}>{show && children}</Animate>;
  }
}
