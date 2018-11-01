/**
 * const prefixCls = 'style-212658';
 * const images = '/static/images/pages';
 * @Author: czy0729
 * @Date: 2018-08-20 11:59:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-31 17:57:08
 * @Path m.benting.com.cn /pages/_app.js
 */
import React from 'react';
import App, { Container } from 'next/app';
import Const from '@const';
import { Global } from '@components';
// import DevTools from '@components/DevTools';

export default class MyApp extends App {
  // static async getInitialProps({ Component, ctx }) {
  //   let pageProps = {};

  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx);
  //   }

  //   return { pageProps };
  // }

  componentDidCatch() {
    // 报错清除localStorage页面缓存
    if (typeof localStorage !== 'undefined') {
      [
        `${Const.__LS_PREFIX__}/`,
        `${Const.__LS_PREFIX__}/nido`,
        `${Const.__LS_PREFIX__}/discovery`,
        `${Const.__LS_PREFIX__}/bbs`,
        `${Const.__LS_PREFIX__}/video`,
        `${Const.__LS_PREFIX__}/topic`
      ].forEach(item => {
        localStorage.removeItem(item);
      });
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        {/* <DevTools /> */}
        <Global />
        <Component {...pageProps} />
      </Container>
    );
  }
}
