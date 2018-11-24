/**
 * const prefixCls = 'style-109942';
 * const images = '/static/images/pages';
 * @Author: czy0729
 * @Date:   2018-06-14 18:08:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-16 15:20:28
 * @Path m.benting.com.cn /pages/_document.js
 */
import React from 'react';
import Document, { Main, NextScript } from 'next/document';
import { Head } from '@components/_/next@7.0.2/document';
import Const from '@const';
import Utils from '@utils';

export default class extends Document {
  render() {
    return (
      <html lang="zh-CN">
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="apple-mobile-web-app-title" content="本汀官网" />
          <meta name="keywords" content="鱼竿，鱼线，渔具，本汀" />
          <meta
            name="description"
            content="本汀由旅日华人李东尼创立于日本福井县，1987年根植于中国宝岛台湾，2011年登陆中国大陆市场，发展迅速，现成为中国独树一帜的实力台钓品牌。本汀官网是很多汀友一起互相学习和交流的平台，为各位钓友提供各种钓鱼福利、钓鱼实用技巧，祝愿各位钓友天天爆护。"
          />
          <meta name="theme-color" content="#2e8eff" />
          <meta name="baidu-site-verification" content="NAqsxwVcJn" />
          <link rel="dns-prefetch" href={Const.__API__} />
          <link rel="dns-prefetch" href={Const.__NEW_API__} />
          <link rel="dns-prefetch" href={Const.__IMG_API__} />
          <link rel="dns-prefetch" href={Const.__CDN_URL__} />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favor.ico" type="image/x-icon" />
          <link
            rel="apple-touch-icon"
            href="/static/images/common/icon-192x192.png"
          />
          <link rel="stylesheet" href={Const.__ICONFONT__} />
          {Const.__DEV__ && (
            <link rel="stylesheet" href="/static/css/dev.css" />
          )}
          {Const.__DEV__ && <script src="/static/js/dev.js" />}
          <script src="https://os.alipayobjects.com/rmsportal/wzWaWInUcXErDyTwvySY.js" />
          <script src="/static/js/init.js?v=181116" />
          <script src="/static/js/hd.min.js?v=181105" />
          <script src={Const.__ICONFONT_COLOR__} />
          <script
            src="https://www.googletagmanager.com/gtag/js?id=UA-92309684-3"
            async
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div
            dangerouslySetInnerHTML={{
              __html: `<!-- generate html at ${Utils.date(
                'Y-m-d H:i:s',
                Utils.getTimestamp()
              )} -->`
            }}
          />
        </body>
      </html>
    );
  }
}
