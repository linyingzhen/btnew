/**
 * const prefixCls = 'style-212658';
 * const images = '/static/images/pages';
 * @Author: czy0729
 * @Date: 2018-08-20 11:59:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-12 14:40:35
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

  // componentDidMount() {
  //   const { isRead } = G.getState('tmall181111');

  //   if (!isRead) {
  //     UI.showMask({
  //       children: (
  //         <div className="t-c">
  //           <Icon
  //             key="1"
  //             className="t-64 t-void"
  //             type="fail-circle"
  //             onClick={() => {
  //               G.doSetReadTmall();
  //               UI.hideMask();
  //             }}
  //           />
  //           <Flex
  //             key="2"
  //             className="mt-40"
  //             direction="column"
  //             style={{ height: '7rem', background: '#fff' }}
  //           >
  //             <img
  //               key="21"
  //               src={`${Const.__IMG__}/20181111.png`}
  //               alt=""
  //               style={{ width: '5.8rem', height: '2.7rem' }}
  //             />
  //             <p
  //               key="22"
  //               className="t-36 t-b mt-16"
  //               style={{ color: '#F2C27C' }}
  //             >
  //               “天猫双十一送钱人人有份”活动
  //             </p>
  //             <p key="23" className="t-44 t-b" style={{ color: '#DE9C3B' }}>
  //               现金券已发放
  //             </p>
  //             <Button
  //               key="24"
  //               type="danger"
  //               style={{ width: '90%', margin: '1rem 0 0 0' }}
  //               onClick={() => {
  //                 G.doSetReadTmall();
  //                 UI.hideMask();
  //                 Utils.router.push('/person/prize');
  //               }}
  //             >
  //               马上看看
  //             </Button>
  //           </Flex>
  //         </div>
  //       )
  //     });
  //   }
  // }

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
