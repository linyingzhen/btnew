/**
 * const prefixCls = 'style-886544';
 * const images = '/static/images/src/_/Layout';
 * @Author: czy0729
 * @Date: 2018-06-20 11:16:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-10 15:56:39
 * @Path m.benting.com.cn \src\_\Layout\index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Page } from '@components';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import Header from './_Header';
import TabBar from './_TabBarScroll';
import UI from './_UI';

const prefixCls = 'src-layout';

@observer
export default class Layout extends React.Component {
  static contextTypes = {
    asPath: PropTypes.string
  };

  renderHeader() {
    const {
      title,
      titleThumb,
      hide,
      hideBack,
      headerStyle,
      bd,
      ft
    } = this.props;

    if (hide) {
      return null;
    }

    return (
      <Header
        title={title}
        titleThumb={titleThumb}
        hideBack={hideBack}
        bd={bd}
        ft={ft}
        style={headerStyle}
      />
    );
  }

  render() {
    const { asPath } = this.context;
    const {
      className,
      header,
      theme,
      wrapClassName,
      wrapStyle,
      title,
      style,
      children
    } = this.props;

    if (title && Const.__CLIENT__) {
      document.title = title;
    }

    let _style;
    if (theme === 'fullTheme') {
      // 满屏白底
      _style = {
        minHeight: '100vh',
        paddingBottom: 0,
        background: Styles.color_theme
      };
    }

    // UC浏览器需要加max-height，否则字体会被无故放大
    return (
      <Page
        className={classNames(prefixCls, className, {
          uc: Utils.isUC()
        })}
        style={{
          ..._style,
          ...style
        }}
      >
        {header || this.renderHeader()}
        <div
          key={asPath}
          className={classNames(`${prefixCls}__children`, wrapClassName)}
          style={{
            position: 'relative',
            ...wrapStyle
          }}
        >
          {children}
        </div>
        <TabBar />
        <UI />
      </Page>
    );
  }
}
