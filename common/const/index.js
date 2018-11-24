/**
 * const prefixCls = 'style-275969';
 * const images = '/static/images/common/const';
 * @Author: czy0729
 * @Date: 2018-06-20 16:13:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-16 09:26:10
 * @Path m.benting.com.cn \common\const\index.js
 */
import {
  __RELEASE__,
  __PROJECT__,
  __WEB__,
  __WEB_BT__,
  __WEB_NIDO__,
  __API__,
  __NEW_API__,
  __IMG_API__,
  __WSS__
} from '../../env';
import rules from './rules';
import { checkDeviceType } from './utils';

const __server__ = typeof window === 'undefined'; // 是否服务器端
const __wx__ =
  (!__server__ &&
    navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) ||
  false;
const __dpr__ = (!__server__ && window.devicePixelRatio) || 2; // 像素比

// 是否使用七牛静态资源
const cdnUsed = false;
const cdnUrl = 'https://static.nidosport.com';
const __images__ = cdnUsed
  ? `${cdnUrl}/images/common`
  : '/static/images/common';

const Const = {
  /* ==================== iconfont ==================== */
  __ICONFONT__: 'https://at.alicdn.com/t/font_728495_pyjkn55lkkm.css',
  __ICONFONT_COLOR__: 'https://at.alicdn.com/t/font_739329_1xdlns6pf4h.js',

  /* ==================== base ==================== */
  __RELEASE__, // 是否正式环境
  __PROJECT__, // 项目唯一标识
  __WEB__: __server__ ? __WEB__ : window.location.origin, // 本站域名
  __WEB_BT__, // 本汀域名
  __WEB_NIDO__, // 灵动域名
  __API__, // CI地址
  __NEW_API__, // LUMEN地址
  __IMG_API__, // 图片OSS地址
  __WSS__, // websocket地址
  __CDN_URL__: cdnUrl, // 七牛静态图片域名

  /* ==================== env ==================== */
  __DEV__: process.env.NODE_ENV !== 'production', // 是否开发环境
  __SERVER__: __server__, // 是否服务端
  __CLIENT__: !__server__, // 是否客户端
  __WX__: __wx__, // 是否微信环境
  __IOS__: checkDeviceType() === 'ios', // 是否IOS环境
  __CDN_USED__: cdnUsed, // 是否启用七牛静态图片

  /* ==================== frontend ==================== */
  __LS_PREFIX__: `${__PROJECT__}_`, // localstorage键值前缀
  __DATE__: 'y-m-d H:i', // 日期格式
  __LIMIT__: 10, // 分页每页条数
  __LIMIT_SM__: 4, // 分页每页条数(小)
  __DPR__: __dpr__, // 设备像素比

  // 默认路由结构
  __PATH_CURRENT__: {
    pathname: '/',
    asPath: '/',
    query: {}
  },
  __PATH_LAST__: {
    pathname: '/',
    asPath: '/',
    query: {}
  },

  // 空列表默认结构
  __EMPTY__: {
    list: [],
    pageinfo: {
      limit: 10,
      page: 0,
      pagetotal: 0,
      recordtotal: 0
    },
    _loaded: false
  },

  /* ==================== path ==================== */
  __IMG__: __images__, // 全局公用图片目录
  __IMAGES__: __images__, // 全局公用图片目录(别名)
  __IMG_DEFAULT__: `${__images__}/logo-default.png`, // 默认图片
  __IMG_DPR__: '@3x', // 图片倍率
  __IMG_DEFAULT_THUMB__:
    'https://api.nidosport.com/static/uploads/png/20170519/591e5f9e2c2bc_thumb.png', // 灵动默认图片(待废弃)
  __IMG_EMPTY__: 'static/uploads/png/20170519/591e5f9e2c2bc.png', // 默认图片(待废弃)
  __EMOJI_PATH__: `${__images__}/emoji`, // emoji目录

  /* ==================== param ==================== */
  __AMAP_KEY__: '391ea18afd825f915a99f50df946bf03', // 高德地图KEY

  // 部分常用验证、绑定路由
  __ROUTER__: {
    fans: '/account/fans', // 粉丝认证
    ww: '/account/ww', // 绑定旺旺
    bank: '/account/bank', // 绑定银行卡,
    pwd: '/account/pwd' // 修改密码
  },

  // 微信JSSDK使用方法
  __JSAPI__: [
    'chooseWXPay',
    'getNetworkType',
    'openLocation',
    'getLocation',
    'hideMenuItems',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'scanQRCode'
  ],

  /* ==================== share ==================== */
  __SHARE_TITLE__: '本汀官网，欢迎您加入汀友会！',
  __SHARE_DESC__:
    '创始于1976年，本汀将陪伴着每一位同好在寻觅心灵那一汪碧水和快乐直至永恒！',
  __SHARE_IMG__: `${cdnUrl}/images/common/share_image.jpg`,

  /* ==================== rc-rule ==================== */
  rules,

  /* ==================== Components ==================== */
  imgLazyTemp: new Set()
};

export default Const;

if (!__server__) {
  window.Const = Const;
}
