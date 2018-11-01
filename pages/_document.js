/**
 * const prefixCls = 'style-109942';
 * const images = '/static/images/pages';
 * @Author: czy0729
 * @Date:   2018-06-14 18:08:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-30 23:37:23
 * @Path m.benting.com.cn /pages/_document.js
 */
import React from 'react';
import Document, { Main, NextScript } from 'next/document';
import { Head } from '@components/_/next@7.0.1/document';
import Const from '@const';
import Utils from '@utils';

export default class extends Document {
  render() {
    return (
      <html lang="zh-CN">
        <Head>
          <link rel="dns-prefetch" href={Const.__API__} />
          <link rel="dns-prefetch" href={Const.__NEW_API__} />
          <link rel="dns-prefetch" href={Const.__IMG_API__} />
          <link rel="dns-prefetch" href={Const.__CDN_URL__} />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favor.ico" type="image/x-icon" />
          <link rel="stylesheet" href={Const.__ICONFONT__} />
          {Const.__DEV__ && (
            <link rel="stylesheet" href="/static/css/dev.css" />
          )}
          <script src="https://os.alipayobjects.com/rmsportal/wzWaWInUcXErDyTwvySY.js" />
          {Const.__DEV__ && <script src="/static/js/dev.js" />}
          <script src="/static/js/init.js?v=181031" />
          <script src={Const.__ICONFONT_COLOR__} />
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
