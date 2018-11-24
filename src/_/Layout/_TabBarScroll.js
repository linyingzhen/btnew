/**
 * const prefixCls = 'style-144253';
 * const images = '/static/images/src/_/Layout';
 * @Author: czy0729
 * @Date: 2018-07-09 18:25:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-12 16:51:36
 * @Path m.benting.com.cn /src/_/Layout/_TabBarScroll.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { observer } from '@';
import { Flex, Link } from '@components';
import Const from '@const';
import Styles from '@styles';
import { fixedBottomMap, menuDS } from './ds';

const prefixCls = 'style-144253';
const allPaths = [];
menuDS.forEach(item => item.includes.forEach(i => allPaths.push(i, `${i}/`)));

@observer
export default class _TabBar extends React.Component {
  static contextTypes = {
    pathname: PropTypes.string
  };

  state = {
    freeze: false,
    open: true,
    transition: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        transition: true
      });
    }, 200);

    const scroll = (fn = Function.prototype) => {
      let beforeScrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      this.onScroll = debounce(() => {
        const afterScrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        const delta = afterScrollTop - beforeScrollTop;

        if (delta === 0) {
          return false;
        }

        const direction = delta > 0 ? 'down' : 'up';

        // [部分页面]到底要显示Tabbar，可以把触发up模拟相同效果
        if (fixedBottomMap[Const.__PATH_CURRENT__.asPath]) {
          const bodyHeight = document.body.clientHeight;
          const { clientHeight } = document.documentElement;

          if (
            direction === 'down' &&
            afterScrollTop > bodyHeight - clientHeight - 20
          ) {
            fn('up');
            beforeScrollTop = afterScrollTop;

            return true;
          }
        }

        // 向下要超过160px才触发
        if (direction === 'down' && afterScrollTop < 160) {
          return false;
        }

        // 向上滚动距离要超过240px才触发，到顶必定触发
        if (
          direction === 'up' &&
          Math.abs(delta) < 240 &&
          afterScrollTop !== 0
        ) {
          return false;
        }

        fn(direction);
        beforeScrollTop = afterScrollTop;

        return true;
      }, 80);

      window.addEventListener('scroll', this.onScroll, { passive: true });
    };

    scroll(direction => {
      const { pathname } = this.context;
      const { freeze, open } = this.state;

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

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll;
  currentPathname;

  render() {
    const { pathname } = this.context;
    const { freeze, open, transition } = this.state;
    const hidden = !allPaths.includes(pathname);

    if (hidden) {
      return null;
    }

    let cls;
    if (Const.__SERVER__) {
      cls = classNames(`${prefixCls}__wrap`, `${prefixCls}__wrap_open`);
    } else {
      cls = classNames({
        [`${prefixCls}__wrap`]: true,
        [`${prefixCls}__wrap_freeze`]: freeze,
        [`${prefixCls}__wrap_open`]: freeze
          ? document.body.scrollTop === 0
          : open,
        [`${prefixCls}__wrap_transition`]: transition
      });
    }

    return (
      <div className={classNames(prefixCls, cls)}>
        <Flex justify="around">
          {menuDS.map((item, index) => {
            const isCurrent =
              item.includes.includes(pathname) ||
              item.includes.includes(`${pathname}/`);

            return (
              <Link
                key={item.label}
                className={`${prefixCls}__item`}
                href={item.href}
                login={item.login}
                prefetch
              >
                <div className="t-c">
                  {isCurrent ? item.iconActive : item.icon}
                </div>
                <p
                  className={classNames('t-20 l-32 t-c', {
                    't-sub': !isCurrent,
                    't-title': index <= 1 && isCurrent,
                    't-primary': index > 1 && isCurrent
                  })}
                >
                  {item.label}
                </p>
              </Link>
            );
          })}
        </Flex>

        <style jsx global>{`
          .style-144253 {
            position: fixed;
            z-index: ${Styles.z_tabbar};
            bottom: 0;
            width: 100%;
            padding: 0.12rem ${Styles.wind};
            background: ${Styles.color_theme};
            border-top: ${Styles.border};
            transform: translate3d(0, 100%, 0);
          }
          .${prefixCls}__wrap_freeze {
            transition: initial !important;
          }
          .${prefixCls}__wrap_transition {
            transition: transform 0.16s ease-in-out;
          }
          .${prefixCls}__wrap_open {
            transform: translate3d(0, 0, 0) !important;
            transition: transform 0.08s ease-in-out;
          }
        `}</style>
      </div>
    );
  }
}
