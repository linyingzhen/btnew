/* eslint react/prop-types:1 */
/**
 * const prefixCls = 'style-503244';
 * const images = '/static/images/components/CountDown';
 * @Author: czy0729
 * @Date: 2018-06-23 13:14:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-01 23:55:32
 * @Path m.benting.com.cn /components/CountDown/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Flex } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'c-count-down';

export default class CountDown extends React.Component {
  static propTypes = {
    theme: PropTypes.bool, // 是否带样式
    now: PropTypes.number, // 通常传递服务器时间
    beginTime: PropTypes.number, // 倒数结束时间戳
    left: PropTypes.node, // 左侧内容
    onEnd: PropTypes.func, // 结束回调
    className: PropTypes.string,
    children: PropTypes.node // 倒计时结束后显示内容
  };

  static defaultProps = {
    theme: true,
    now: Utils.getTimestamp(),
    beginTime: 0,
    left: null,
    onEnd: Function.prototype,
    className: null,
    children: null
  };

  state = {
    now: parseInt(this.props.now)
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      const { beginTime, onEnd } = this.props;
      const { now } = this.state;

      this.setState({
        now: now + 1
      });

      if (now + 1 > parseInt(beginTime)) {
        clearInterval(this.interval);
        onEnd();
      }
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.now) {
      this.setState({
        now: nextProps.now
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  interval;

  render() {
    const { theme, left, beginTime, className, children } = this.props;
    const { now } = this.state;

    if (!beginTime) {
      return null;
    }

    let isWaiting;
    let h = 99;
    let m = 59;
    let s = 59;
    const _beginTime = parseInt(beginTime);

    if (now < _beginTime) {
      isWaiting = true;

      const distance = _beginTime - now;
      h = Math.floor(distance / 3600);
      m = Math.floor((distance - h * 3600) / 60);
      s = Math.floor(distance - h * 3600 - m * 60);
    }

    if (h < 10) h = `0${h}`;
    if (m < 10) m = `0${m}`;
    if (s < 10) s = `0${s}`;

    if (isWaiting) {
      if (theme) {
        return (
          <Flex className={classNames(prefixCls, className)}>
            {left}
            <span className="item">{h}</span>
            <span className="split">:</span>
            <span className="item">{m}</span>
            <span className="split">:</span>
            <span className="item">{s}</span>

            <style jsx>{`
              .c-count-down {
              }
              .item {
                width: 0.36rem;
                height: 0.5rem;
                font-size: 0.24rem;
                line-height: 0.5rem;
                text-align: center;
                color: ${Styles.color_void};
                background: #404040;
                border-radius: 0.04rem;
              }
              .split {
                margin: 0 0.02rem;
              }
            `}</style>
          </Flex>
        );
      }

      let short;
      const _h = parseInt(h);
      if (_h) {
        if (_h > 24) {
          const d = parseInt(_h / 24);
          short = `${d}天${_h - d * 24}时`;
        } else {
          short = `${_h}时${parseInt(m)}分`;
        }
      } else {
        short = `${parseInt(m)}分${parseInt(s)}秒`;
      }

      return (
        <div className={classNames(prefixCls, className)}>
          {left}
          {short}
        </div>
      );
    }

    return (
      <div className={classNames(prefixCls, className)}>
        {left}
        {children}
      </div>
    );
  }
}
