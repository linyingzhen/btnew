/* eslint-disable no-multi-spaces, key-spacing */
/**
 * const prefixCls = 'style-175969';
 * const images = '/static/images';
 * @Author: czy0729
 * @Date: 2018-08-05 19:41:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 19:45:36
 * @Path m.benting.com.cn /env.js
 */
const RELEASE_ENV  = 'development';
// const RELEASE_ENV = 'production';

const RELEASE      = RELEASE_ENV === 'production';
const PROJECT      = 'BENTING';

const WEB          = 'http://benting.tw-bt.com';
const WEB_BT       = 'https://www.tw-bt.com';
const WEB_NIDO     = 'https://www.nidosport.com';
const API          = 'https://api.nidosport.com';
const NEW_API      = 'https://service.nidosport.com';
const WSS          = 'wss://api.nidosport.com/wss';
const IMG_API      = 'http://nidoimg.tw-bt.com';

const DEV_WEB      = 'https://newbttest.benting.com.cn';
const DEV_WEB_BT   = 'https://bttest.benting.com.cn';
const DEV_WEB_NIDO = 'https://ldtest.benting.com.cn';
const DEV_API      = 'https://ci-api.benting.com.cn';
const DEV_NEW_API  = 'https://lm-api.benting.com.cn';
const DEV_WSS      = 'wss://ci-api.benting.com.cn/wss';
const DEV_IMG_API  = 'http://osstest.benting.com.cn';

const appEnv = {
  __PORT__         : 8104,
  __PROJECT__      : PROJECT,
  __RELEASE__      : RELEASE,
  __RELEASE_ENV__  : RELEASE_ENV,
  __WEB__          : RELEASE ? WEB : DEV_WEB,
  __WEB_BT__       : RELEASE ? WEB_BT : DEV_WEB_BT,
  __WEB_NIDO__     : RELEASE ? WEB_NIDO : DEV_WEB_NIDO,
  __API__          : RELEASE ? API : DEV_API,
  __NEW_API__      : RELEASE ? NEW_API : DEV_NEW_API,
  __IMG_API__      : RELEASE ? IMG_API : DEV_IMG_API,
  __WSS__          : RELEASE ? WSS : DEV_WSS
};

exports = appEnv;
module.exports = appEnv;
