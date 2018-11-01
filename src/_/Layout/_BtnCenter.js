/**
 * const prefixCls = 'style-544384';
 * const images = '/static/images/src/_/Layout';
 * @Author: czy0729
 * @Date: 2018-07-25 11:51:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 15:57:46
 * @Path m.benting.com.cn /src/_/Layout/_BtnCenter.js
 */
import React from 'react';
import classNames from 'classnames';
import { Animate, Icon, Link } from '@components';
import Styles from '@styles';
import UI from '@stores/ui';
import { centerMenuDS } from './ds';

const prefixCls = 'style-544384';
const btnWidth = '1.16rem';

export default class BtnCenter extends React.Component {
  state = {
    open: false,
    showMenu: false,
    styleWrap: {
      width: btnWidth,
      height: btnWidth
    },
    styleBg: {
      width: btnWidth,
      height: btnWidth
    }
  };

  componentWillUnmount() {
    const { open } = this.state;

    if (open) {
      UI.hideMask();
    }
  }

  toggleOpen = () => {
    const { open } = this.state;

    if (open) {
      this.setState({
        open: false,
        showMenu: false,
        styleBg: {
          width: btnWidth,
          height: btnWidth
        }
      });
      setTimeout(() => {
        this.setState({
          styleWrap: {
            width: btnWidth,
            height: btnWidth
          }
        });
      }, 360);
      UI.hideMask();
    } else {
      this.setState({
        open: true,
        showMenu: true,
        styleWrap: {
          width: '100vw',
          height: '5.4rem',
          overflow: 'hidden'
        },
        styleBg: {
          width: '200vw',
          height: '200vw',
          background: '#fff'
          // background: '#1c6ed9'
        }
      });
      UI.showMask({
        style: {
          zIndex: Styles.z_tabbar - 1
        },
        onClick: this.toggleOpen
      });
    }
  };

  render() {
    const { className } = this.props;
    const { open, showMenu, styleWrap, styleBg } = this.state;

    return (
      <div className={classNames(prefixCls, className)}>
        <div className="wrap-bg" style={styleWrap}>
          <div className="bg" style={styleBg} />
          <Animate type="fade-float">
            {showMenu && (
              <div className="wrap-menu">
                {centerMenuDS.map(item => (
                  <Link
                    key={item.label}
                    className={`${prefixCls}__menu-item t-c`}
                    href={item.href}
                    login
                  >
                    <Icon
                      type={item.icon}
                      color
                      style={{ width: '0.64rem', height: '0.64rem' }}
                    />
                    <p className="t-28 l-42 mt-8">{item.label}</p>
                  </Link>
                ))}
              </div>
            )}
          </Animate>
          <Icon
            className={classNames(`${prefixCls}__icon-plus t-56`, {
              't-void': !open,
              [`${prefixCls}__icon-plus_active`]: open
            })}
            type="plus"
            onClick={this.toggleOpen}
          />
        </div>

        <style jsx>{`
          .style-544384 {
          }
          .wrap-bg {
            display: inline-block;
            vertical-align: top;
            position: relative;
          }
          .bg {
            display: inline-block;
            vertical-align: top;
            position: absolute;
            bottom: 0.64rem;
            left: 50%;
            background: ${Styles.color_primary};
            border-radius: 50%;
            transform: translate3d(-50%, 50%, 0);
            transition: all 0.4s;
          }
          .wrap-menu {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            padding: 0.8rem ${Styles.wind} 0;
          }
          :global(.${prefixCls}__menu-item) {
            display: inline-block;
            width: 25%;
            margin-bottom: 0.56rem;
          }
          :global(.${prefixCls}__icon-plus) {
            position: absolute;
            bottom: 0.38rem;
            left: 50%;
            transform: translateX(-50%);
            transition: all 0.4s;
          }
          :gloabl(.${prefixCls}__icon-plus_active) {
            transform: translateX(-50%) scale(0.8) rotate(45deg);
          }
        `}</style>
      </div>
    );
  }
}
