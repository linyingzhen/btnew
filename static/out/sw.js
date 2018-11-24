/**
 * const prefixCls = 'style-209675';
 * const images = '/static/images/static/out';
 * @Author: czy0729
 * @Mail: 402731062@qq.com
 * @Date: 2018-08-28 15:28:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-16 14:53:31
 * @Path m.benting.com.cn /static/out/sw-181028.js
 */
importScripts('https://g.alicdn.com/kg/workbox/3.3.0/workbox-sw.js');

if (workbox) {
  workbox.setConfig({
    debug: false,
    modulePathPrefix: 'https://g.alicdn.com/kg/workbox/3.3.0/'
  });
  workbox.skipWaiting();
  workbox.clientsClaim();

  // 开发环境hot-loader:仅网络
  // workbox.routing.registerRoute(
  //   function(event) {
  //     if (~event.url.href.indexOf('/on-demand-entries-ping/')) {
  //       return true;
  //     }
  //     return false;
  //   },
  //   workbox.strategies.networkOnly({})
  // );

  // 静态html:网络优先
  // const cacheList = ['/', '/nido', '/discovery', '/bbs'];
  // workbox.routing.registerRoute(
  //   function(event) {
  //     // 需要缓存的HTML路径列表
  //     if (~cacheList.indexOf(event.url.pathname)) {
  //       return true;
  //     }
  //     return false;
  //   },
  //   workbox.strategies.networkFirst({
  //     cacheName: 'html-cache',
  //     plugins: [
  //       new workbox.expiration.Plugin({
  //         maxEntries: 10
  //       })
  //     ]
  //   })
  // );

  // 静态js:缓存优先
  const regJS = /(t\/font_.*\.js$)|(\/rmsportal\/wzWaWInUcXErDyTwvySY.js)/;
  workbox.routing.registerRoute(
    function(event) {
      return regJS.test(event.url.href);
    },
    workbox.strategies.cacheFirst({
      cacheName: 'js-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 10,
          maxAgeSeconds: 30 * 24 * 60 * 60
        })
      ]
    })
  );

  // next.js编译文件:缓存优先 (开发环境的不匹配)
  const regNextJs = /^https:\/\/.*\/_next\/static\/.*\.js$/;
  workbox.routing.registerRoute(
    function(event) {
      return regNextJs.test(event.url.href);
    },
    workbox.strategies.cacheFirst({
      cacheName: 'next-js-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60
        })
      ]
    })
  );

  // 静态缓存:缓存优先
  // 例[https://www.benting.com.cn/static/images/src/_/Level/1@3x.png]
  const regStatic = /^(https:\/\/).*\.(?:css|png|jpg|jpeg|gif|svg)$/;
  workbox.routing.registerRoute(
    function(event) {
      // 百度统计使用图片请求方式, 排除掉
      if (~event.url.href.indexOf('https://hm.baidu.com/hm.gif')) {
        return false;
      }

      return regStatic.test(event.url.href);
    },
    workbox.strategies.cacheFirst({
      cacheName: 'static-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60
        })
      ]
    })
  );

  // oss图片:缓存优先,交替检测更新
  // staleWhileRevalidate
  // 例[https://api.nidosport.com/file/getimg/357344/thumb]
  const regOSS = /^(https:\/\/).*.com\/file\/getimg\//;
  workbox.routing.registerRoute(
    function(event) {
      return regOSS.test(event.url.href);
    },
    workbox.strategies.cacheFirst({
      cacheName: 'oss-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60
        })
      ]
    })
  );
}
