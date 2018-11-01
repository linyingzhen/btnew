/**
 * const prefixCls = 'style-153620';
 * const images = '/static/images/components/Header';
 * @Author: czy0729
 * @Date: 2018-06-20 17:34:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-26 13:37:37
 * @Path m.benting.com.cn \components\Header\index.js
 */
import React from 'react';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { Flex } from '@components';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import Icon from '../Icon';

const prefixCls = 'c-header';

export default class Header extends React.Component {
  state = {
    freeze: false,
    open: true,
    fixed: false
  };

  componentDidMount() {
    if (Const.__CLIENT__) {
      const scroll = (fn = Function.prototype) => {
        let beforeScrollTop =
          document.body.scrollTop || document.documentElement.scrollTop;

        this.onScroll = debounce(() => {
          const afterScrollTop =
            document.body.scrollTop || document.documentElement.scrollTop;
          const delta = afterScrollTop - beforeScrollTop;

          if (delta === 0) {
            return false;
          }

          const direction = delta > 0 ? 'down' : 'up';

          // 向下要超过160px才触发
          if (direction === 'down' && afterScrollTop < 160) {
            return false;
          }

          // 向上滚动距离要超过320px才触发，到顶必定触发
          if (
            direction === 'up' &&
            Math.abs(delta) < 320 &&
            afterScrollTop !== 0
          ) {
            return false;
          }

          fn(direction, afterScrollTop);
          beforeScrollTop = afterScrollTop;

          return true;
        }, 50);

        // window.addEventListener('scroll', this.onScroll, false);
        window.addEventListener('scroll', this.onScroll, { passive: true });
      };

      scroll((direction, afterScrollTop) => {
        const { pathname } = this.props;
        const { freeze, open, fixed } = this.state;

        // 检测是否在顶
        if (afterScrollTop > 0) {
          if (!fixed) {
            this.setState({
              fixed: true
            });
          }
        } else if (fixed) {
          this.setState({
            fixed: false
          });
        }

        if (this.currentPathname === undefined) {
          this.currentPathname = pathname;
        }

        if (this.currentPathname !== pathname) {
          this.currentPathname = pathname;
          this.setState({
            freeze: true
          });
        } else if (direction === 'down' && (open || freeze)) {
          this.setState({
            freeze: false,
            open: false
          });
        } else if (direction === 'up' && (!open || freeze)) {
          this.setState({
            freeze: false,
            open: true
          });
        }
      });
    }
  }

  componentWillUnmount() {
    if (Const.__CLIENT__) {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  onScroll;
  currentPathname;

  render() {
    const {
      show,
      title,
      titleThumb,
      hd,
      bd,
      ft,
      hideBack,
      style = {},
      children,
      className,
      ...other
    } = this.props;
    const { freeze, open, fixed } = this.state;

    if (!show) {
      return null;
    }

    let cls;
    if (Const.__SERVER__) {
      cls = classNames(`${prefixCls}__wrap`, `${prefixCls}__wrap_open`);
    } else {
      cls = classNames(`${prefixCls}__wrap`, {
        [`${prefixCls}__wrap_freeze`]: freeze,
        [`${prefixCls}__wrap_open`]: freeze
          ? document.body.scrollTop === 0
          : open,
        [`${prefixCls}__wrap_fixed`]: fixed
      });
    }

    if (children) {
      return (
        <div
          className={classNames(prefixCls, className)}
          style={style}
          {...other}
        >
          <Flex className={cls} style={style}>
            {children}
          </Flex>

          <style jsx global>{`
            .c-header {
              background: ${Styles.color_theme};
            }
            .${prefixCls} .am-flexbox {
              overflow: initial;
            }
            .${prefixCls}__wrap {
              position: fixed;
              z-index: ${Styles.z_header};
              top: 0;
              left: 0;
              right: 0;
              background: ${Styles.color_theme};
              transform: translate3d(0, -104%, 0);
              transition: transform 0.16s ease-in-out;
            }
            .${prefixCls}__wrap_freeze {
              transition: initial !important;
            }
            .${prefixCls}__wrap_open {
              transform: translateZ(0);
            }
            .${prefixCls}__wrap_fixed {
              box-shadow: 0 0.02rem 0.08rem rgba(0, 0, 0, 0.16);
            }
          `}</style>
        </div>
      );
    }

    return (
      <div className={classNames(prefixCls, className)} style={style}>
        {hideBack ? (
          <Flex className={cls} style={style}>
            <Flex className={`${prefixCls}__hd t-40 l-56 t-b`}>
              {titleThumb}
              {title}
            </Flex>
            <Flex.Item className={`${prefixCls}__bd`} />
            <Flex className={`${prefixCls}__ft`} justify="end">
              {ft}
            </Flex>
          </Flex>
        ) : (
          <Flex className={cls} style={style}>
            <Flex className={`${prefixCls}__hd`}>
              {hd || (
                <Icon
                  className="t-34 t-b"
                  type="left"
                  style={{
                    color: style.color || Styles.color_title
                  }}
                  onClick={Utils.router.back}
                />
              )}
            </Flex>
            <Flex.Item className={`${prefixCls}__bd t-34 l-48 t-c1`}>
              {bd !== undefined ? bd : title}
            </Flex.Item>
            <Flex className={`${prefixCls}__ft`} justify="end">
              {ft}
            </Flex>
          </Flex>
        )}

        <style jsx global>{`
          .c-header {
            height: 1rem;
            padding: 0.24rem ${Styles.wind};
            background: ${Styles.color_theme};
          }
          .${prefixCls} .am-flexbox {
            overflow: initial;
          }
          .${prefixCls}__wrap {
            position: fixed;
            z-index: ${Styles.z_header};
            top: 0;
            left: 0;
            right: 0;
            height: 1rem;
            padding: 0.24rem ${Styles.wind};
            background: ${Styles.color_theme};
            transform: translate3d(0, -104%, 0);
            transition: all 0.16s ease-in-out;
          }
          .${prefixCls}__wrap_freeze {
            transition: initial !important;
          }
          .${prefixCls}__wrap_open {
            transform: translateZ(0);
          }
          .${prefixCls}__wrap_fixed {
            box-shadow: 0 0.02rem 0.08rem rgba(0, 0, 0, 0.16);
          }
          .${prefixCls}__hd {
            min-width: 1.16rem;
          }
          .${prefixCls}__bd {
            margin-left: 0 !important;
            text-align: center;
          }
          .${prefixCls}__ft {
            min-width: 1.16rem;
          }
        `}</style>
      </div>
    );
  }
}
