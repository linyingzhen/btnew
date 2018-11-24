/**
 * const prefixCls = 'style-203104';
 * const images = '/static/images/common/decorator';
 * @Author: czy0729
 * @Date: 2018-11-13 10:24:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-13 16:38:03
 * @Path bt_mb_new /common/decorator/utils.js.git
 */
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import G from '@stores/g';

// 百度统计，手动推送
export const hmtCount = () => {
  try {
    if ('_hmt' in window) {
      window._hmt.push(['_trackPageview', window.location.pathname]);
    }
  } catch (ex) {
    console.warn(ex);
  }
};

// 微信注册页面
export const registerWx = async () => {
  try {
    let config = G.wxConfig[window.location.href];

    if (!config) {
      const data = await Api.PP('get_wx_js-sign', {
        url: window.location.href
      });

      if (data.code != 0) {
        return;
      }

      config = data.data;
      G.wxConfig[window.location.href] = config;
    }

    wx.config({
      // debug: true,
      appId: config.appId,
      timestamp: config.timestamp,
      nonceStr: config.nonceStr,
      signature: config.signature,
      jsApiList: Const.__JSAPI__
    });

    Utils.wxShareUpdate();
  } catch (ex) {
    console.warn(ex);
  }
};

// 获得请求函数引用，返回数组
export const getFetchFns = (fetchConfig, modes) => {
  const fns = [];

  if (typeof fetchConfig !== 'object' || !Array.isArray(modes)) {
    return fns;
  }

  modes.forEach(mode => {
    if (fetchConfig[mode]) {
      fetchConfig[mode].forEach((item, index) => {
        const fn = fetchConfig[mode][index];

        if (mode === 'static' && Array.isArray(fn)) {
          fns.push(fn[0]);
        } else {
          fns.push(fn);
        }
      });
    }
  });

  return fns;
};

// 从G继承数据
export const compareStatic = (fetchConfig, target) => {
  const fns = [];

  if (typeof fetchConfig !== 'object') {
    return fns;
  }

  // config有static
  if (fetchConfig.static) {
    fetchConfig.static.forEach(item => {
      let fn;
      let key;
      let gKey;
      if (Array.isArray(item)) {
        [fn, key, gKey] = item;
      } else {
        fn = item;
        key = item;
        gKey = item;
      }

      // 局部跟全局对比是否一致，不一致的话用全局替换
      const gState = G.getState(gKey || key);

      // 若是-1，getState结果为{}，需再次请求
      if (!Object.keys(gState).filter(item => item.indexOf('_') !== 0).length) {
        fns.push(fn);
      } else {
        const currentState = target.getState(key);

        if (!Utils.isObjectValueEqual(gState, currentState)) {
          target.setState(gState, key);
        }
      }
    });
  }

  return fns;
};

// 发起请求
export const doFetch = async (fns, target) => {
  if (!fns.length) {
    return null;
  }

  const res = Promise.all(
    fns.map(item => {
      const fn = target.fetch[Array.isArray(item) ? item[0] : item];
      if (typeof fn !== 'function') {
        console.error(
          `(injectV2.js > doFetch) function ${
            Array.isArray(item) ? item[0] : item
          } is not defined.`
        );
        return null;
      }

      return target.fetch[Array.isArray(item) ? item[0] : item](true);
    })
  );

  await res;

  // [LifeCycle]
  if (Const.__CLIENT__) {
    if (!target.params.__clientFetch) {
      if (typeof target.storeDidInitFetch === 'function') {
        target.storeDidInitFetch();
      } else if (typeof target.storeDidFetch === 'function') {
        target.storeDidFetch();
      }

      target.setParams({
        __clientFetch: true
      });
    } else if (typeof target.storeDidFetch === 'function') {
      target.storeDidFetch();
    }
  }

  return res;
};

// store本地化
export const setCache = target => {
  if (!target || !target.config) {
    return;
  }

  const { cache } = target.config;
  if (!cache || !Array.isArray(cache) || !cache.length) {
    return;
  }

  try {
    setTimeout(() => {
      const state = {};
      cache.forEach(item => {
        state[item] = target.toJS(item);

        if (typeof state[item] === 'object') {
          state[item]._from = 'ls';
        }
      });

      Utils.lsSet(`${Const.__LS_PREFIX__}${target.params.asPath}`, state);
    }, 8000);
  } catch (error) {
    console.warn('(injectV2.js > setCache) error');
  }
};

// 跳转到登录并删除store
let _confirming = false;
export const loginThenInitStore = asPath => {
  if (_confirming) {
    return;
  }

  _confirming = true;
  Utils.onConfirm(
    '该页面部分信息需要登录后才能正常显示，前往登录?',
    () => {
      G.setJump();
      Utils.router.push('/login');

      if (window.Stores && window.Stores[asPath]) {
        delete window.Stores[asPath];
      }

      _confirming = false;
    },
    undefined,
    () => {
      if (window.Stores && window.Stores[asPath]) {
        delete window.Stores[asPath];
      }

      _confirming = false;
    }
  );
};
