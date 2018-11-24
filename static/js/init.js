/**
 * const prefixCls = 'style-103209';
 * const images = '/static/images/static/js';
 * @Author: czy0729
 * @Mail: 402731062@qq.com
 * @Date: 2017-10-06 11:46:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-16 14:53:57
 * @Path bt_mb_new /static/js/init.js
 */
(function() {
  // Promise polyfill
  if (!window.Promise) {
    document.writeln(
      '<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"></script>'
    );
  }

  // Wx
  if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
    document.writeln(
      '<script src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>'
    );
  }

  // PWA
  if (typeof __DEV__ === 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js?v=181116')
      .then(function(r) {
        console.log(
          'ServiceWorker registration successful with scope: ',
          r.scope
        );
      })
      .catch(function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
  }

  // Dev
  function getQuery(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }

  if (getQuery('dev') === 'true') {
    document.writeln('<script src="/static/js/vconsole.min.js"></script>');
  }

  // Baidu
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?403f56cd6fa2fc5dc28a4ce8ec614ed0';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(hm, s);
  })();

  // Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'UA-92309684-3');
})();
