/**
 * const prefixCls = 'style-103209';
 * const images = '/static/images/static/js';
 * @Author: czy0729
 * @Mail: 402731062@qq.com
 * @Date: 2017-10-06 11:46:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-31 10:57:41
 * @Path bt_mb_new /static/js/init.js
 */
// Promise polyfill
if (!window.Promise) {
  document.writeln(
    '<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"></script>'
  );
}

// Baidu
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement('script');
  hm.src = 'https://hm.baidu.com/hm.js?77f4d18175e1d55e6d87415f5e2ffeeb';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(hm, s);
})();

(function() {
  function getQuery(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }

  // Wx
  if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
    document.writeln(
      '<script src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>'
    );
  }

  // Dev
  if (getQuery('dev') === 'true') {
    document.writeln('<script src="/static/js/vconsole.min.js"></script>');
  }
})();

// HD
!function(e){function t(a){if(i[a])return i[a].exports;var n=i[a]={exports:{},id:a,loaded:!1};return e[a].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=window;t["default"]=i.flex=function(e,t){var a=e||100,n=t||1,r=i.document,o=navigator.userAgent,d=o.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),l=o.match(/U3\/((\d+|\.){5,})/i),c=l&&parseInt(l[1].split(".").join(""),10)>=80,p=navigator.appVersion.match(/(iphone|ipad|ipod)/gi),s=i.devicePixelRatio||1;p||d&&d[1]>534||c||(s=1);var u=1/s,m=r.querySelector('meta[name="viewport"]');m||(m=r.createElement("meta"),m.setAttribute("name","viewport"),r.head.appendChild(m)),m.setAttribute("content","width=device-width,user-scalable=no,initial-scale="+u+",maximum-scale="+u+",minimum-scale="+u),r.documentElement.style.fontSize=a/2*s*n+"px"},e.exports=t["default"]}]);
flex(100, 1);

// PWA
if (typeof __DEV__ === 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(registration => {
      console.log(
        'ServiceWorker registration successful with scope: ',
        registration.scope
      );
    })
    .catch(err => {
      console.log('ServiceWorker registration failed: ', err);
    });
}
