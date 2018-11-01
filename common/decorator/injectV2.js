/* eslint-disable react/sort-comp */
/**
 * const prefixCls = 'style-925556';
 * const images = '/static/images/common/decorator';
 * @Version #todo v3.1 180801 优化流程：static里面的方法也会每次执行，只不过不请求也返回带数据promise
 * @Version v3.2 181004 加入storeDidFetch
 * @Version v3.3 181010 加入storeDidInitFetch来细化钩子
 * @Version v3.4 181023 修复storeDidMount在Client端页面初始化时调用2次的问题
 * @Author: czy0729
 * @Date: 2018-07-15 16:34:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 00:02:29
 * @Path m.benting.com.cn /common/decorator/inject@v2.js
 * ==========================================================================================
 * store生命周期 (尽量少用，使用前先思考逻辑是否正确)
 * S -> SERVER, C -> CLIENT
 * 1.[S & C]storeInit      store实例创建后马上调用，只会调用一次（警告：不要在此周期发请求，因涉及token，服务端不存在token）
 * 2.[C]storeDidMount      store挂载到window后调用；每次进入页面都调用
 * 3.[C]storeDidInitFetch  store挂载到window后，第一批请求完毕后调用，#todo 若没有CLIENT端请求也调用一次
 * 4.[C]storeDidFetch      每批请求完毕后调用；与storeDidFetch同时存在时，第一批请求完毕后不调用
 * 5.[C]storeWillUnmount   页面退出后调用，注意相同路由不同参数之间跳转并不会触发
 * 6.[C]storeWillDestory   #todo store销毁前调用
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { paramsKey, defaultKey } from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import G from '@stores/g';
import Ui from '@stores/ui';

// 获得请求函数引用，返回数组
const getFetchFns = (fetchConfig, modes) => {
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
const compareStatic = (fetchConfig, target) => {
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
const doFetch = (fns, target) => {
  if (!fns.length) {
    return null;
  }

  return Promise.all(
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
  ).then(values => {
    // [LifeCycle]
    if (Const.__CLIENT__) {
      if (!target.params.__clientFetch) {
        if (typeof target.storeDidInitFetch === 'function') {
          target.storeDidInitFetch(values);
        } else if (typeof target.storeDidFetch === 'function') {
          target.storeDidFetch(values);
        }

        target.setParams({
          __clientFetch: true
        });
      } else if (typeof target.storeDidFetch === 'function') {
        target.storeDidFetch(values);
      }
    }
  });
};

const InjectDecorator = (Store, cache = true) => ComposedComponent =>
  observer(
    class extends React.Component {
      static childContextTypes = {
        $: PropTypes.object,
        pathname: PropTypes.string,
        asPath: PropTypes.string
      };

      // 1
      static async getInitialProps(context) {
        const { pathname, query, req } = context;
        let { asPath } = context;
        const isServer = !!req;
        const igoreFetch = []; // 存放服务器忽略的请求

        // Stores的key值，过滤掉query
        const queryIndex = asPath.indexOf('?');
        if (queryIndex !== -1) {
          asPath = asPath.substring(0, queryIndex);
        }

        /* ==================== init ==================== */
        if (isServer) {
          // [SERVER]首次执行
          this.$ = new Store({
            params: query,
            pathname,
            asPath
          });

          // 写入私有辅助属性，首屏不需要设置刷新状态了
          this.$.setParams({
            ...this.$.initParams,
            top: 0,
            isServer,
            params: query,
            pathname,
            asPath,
            __timestamp: Utils.getTimestamp(),
            __clientFetch: false
          });

          // [LifeCycle]storeInit
          if (typeof this.$.storeInit === 'function') {
            this.$.storeInit();
          }
        } else {
          // 存在首次从没有inject的页面跳转到inject页面的情况
          if (!window.Stores) {
            window.Stores = {
              g: G,
              ui: Ui
            };
          }

          // [CLIENT]进入新页面
          if (!window.Stores[asPath]) {
            this.$ = new Store({
              params: query,
              pathname,
              asPath
            });

            // 客户端进入新页面，设置刷新标志
            this.$.setRefresh({
              ...this.$.initParams,
              isServer,
              params: query,
              pathname,
              asPath,
              __timestamp: Utils.getTimestamp()
            });

            // [LifeCycle]storeInit
            if (typeof this.$.storeInit === 'function') {
              this.$.storeInit();
            }
          } else {
            // [CLIENT]进入旧页面
            this.$ = window.Stores[asPath];

            // 若cache为false，会创建一个新的store替换旧store
            if (cache && this.$) {
              const { fetch = {} } = this.$;
              const { config } = fetch;

              compareStatic(config, this.$);
              // #todo Every

              return {
                $: this.$,
                isServer,
                igoreFetch,
                params: query,
                pathname,
                asPath
              };
            }
          }
        }

        /* ==================== fetch ==================== */
        // [SERVER]首次执行
        // [CLIENT]进入新页面
        const { fetch = {} } = this.$;
        const { config } = fetch;

        if (typeof config === 'object') {
          let fns = [];

          // 服务器端肯定是首次，全部请求
          if (isServer) {
            fns = getFetchFns(config, ['static', 'one', 'update', 'every']);
          } else {
            fns = [
              ...compareStatic(config, this.$),
              ...getFetchFns(config, ['one'])
            ];
          }

          if (isServer) {
            // 分离出需要SSR的请求
            const mustFetchFns = [];
            fns.forEach(item => {
              if (Array.isArray(item)) {
                if (item[1]) {
                  mustFetchFns.push(item[0]);
                } else {
                  igoreFetch.push(item[0]);
                }
              } else {
                igoreFetch.push(item);
              }
            });

            if (mustFetchFns.length) {
              await doFetch(mustFetchFns, this.$);
            }
          } else {
            // 客户端不需要阻塞，不阻塞会显示loading动画，阻塞会导致不能马上切换页面
            doFetch(fns, this.$);
          }
        }

        /* ==================== destroy ==================== */
        // #todo

        /* ==================== return ==================== */
        return {
          $: this.$,
          isServer,
          igoreFetch,
          params: query,
          pathname,
          asPath
        };
      }

      // 4
      getChildContext() {
        const {
          $, // 打印在源代码的Store
          isServer,
          igoreFetch,
          params,
          pathname,
          asPath
        } = this.props;

        // 服务器切到客户端的流程
        if (isServer && typeof window !== 'undefined') {
          // dev环境hotUpdate会遇到的点
          if (window.Stores && window.Stores[asPath]) {
            this.$ = window.Stores[asPath];
          } else {
            this.$ = new Store({
              params,
              pathname,
              asPath
            });

            // 把打印在源代码的SERVER端的params复制到CLIENT端
            this.$.setParams({
              ...$[paramsKey],
              isServer: false
            });

            // 把打印在源代码的SERVER端的state复制到CLIENT端
            Object.keys($[defaultKey] || {}).forEach(item => {
              this.$.setState($[defaultKey][item], item, false);
            });
          }
        } else {
          this.$ = $;
        }

        // store挂载到window
        if (typeof window !== 'undefined') {
          if (!window.Stores) {
            // G的初始化
            window.Stores = {
              g: G,
              ui: Ui
            };

            if (igoreFetch.length) {
              doFetch(igoreFetch, this.$);
            }

            if (Const.__WX__) {
              this.registerWx();
            }
          }

          if (!window.Stores[asPath]) {
            window.Stores[asPath] = this.$;

            // [v3.4]
            if (isServer && this.$.storeDidMount) {
              this.$.storeDidMount(this.props);
            }
          }
        }

        // map computed，computed都是根据另一些值来算一个值，不需要set
        if (this.$.computed) {
          Object.keys(this.$.computed).forEach(item => {
            // 服务器端只有静态数据才能转成字符串，打印在源代码上，所以不能getter
            if (Const.__SERVER__) {
              this.$[item] = this.$.computed[item]();
            } else {
              Object.defineProperty(this.$, item, {
                get: this.$.computed[item],
                enumerable: false,
                configurable: true
              });
            }
          });

          delete this.$.computed;
        }

        return {
          $: this.$,
          pathname,
          asPath
        };
      }

      // 2
      componentWillMount() {
        const { isServer } = this.props;
        if (isServer && Const.__SERVER__) {
          return;
        }

        const { $ } = this.props;

        // 页面是PUSH进来的，要告诉store重置数据和重置scrollTop
        if (Utils.getPageTransition()) {
          if ($.setRefresh) {
            $.setRefresh();
          }
          this.hmtCount();
        }

        if (Const.__WX__) {
          this.registerWx();
        }

        // [LifeCycle]storeDidMount
        if (typeof $.storeDidMount === 'function') {
          $.storeDidMount(this.props);
        }
      }

      // 5
      componentDidMount() {
        const { isServer } = this.props;
        const { fetch = {} } = this.$;
        const { config } = fetch;
        const { top, __refresh } = this.$.getParams();

        // 服务器端首次切换到客户端的时候，不应该请求
        if (!isServer) {
          const fns = getFetchFns(
            config,
            __refresh ? ['every', 'update'] : ['every']
          );

          doFetch(fns, this.$);
        }

        if (__refresh) {
          this.$.setParams({ __refresh: false });
        }

        // 当store有top值时，设置页面滚动位置
        document.documentElement.scrollTop = top;
        document.body.scrollTop = top;
      }

      // 2
      componentWillUpdate(nextProps) {
        const { isServer } = nextProps;
        if (isServer) {
          return;
        }

        const { $ } = nextProps;

        // 页面是PUSH进来的，要告诉store重置数据和重置scrollTop
        if (Utils.getPageTransition()) {
          if ($.setRefresh) {
            $.setRefresh();
          }
          this.hmtCount();
        }

        if (Const.__WX__) {
          this.registerWx();
        }

        // [LifeCycle]storeDidMount
        if (typeof $.storeDidMount === 'function') {
          $.storeDidMount(this.props);
        }
      }

      // 5
      componentDidUpdate() {
        const { isServer } = this.props;
        if (isServer && !Const.__DEV__) {
          return;
        }

        const { fetch = {} } = this.$;
        const { config } = fetch;
        const { top, __refresh } = this.$.getParams();
        let fns = [];

        // [DEV]开发环境无条件全部请求
        if (Const.__DEV__) {
          fns = getFetchFns(config, ['static', 'one', 'update', 'every']);
        } else {
          fns = getFetchFns(
            config,
            __refresh ? ['every', 'update'] : ['every']
          );
        }

        doFetch(fns, this.$);
        if (__refresh) {
          this.$.setParams({ __refresh: false });
        }

        // 当store有top值时，设置页面滚动位置
        document.documentElement.scrollTop = top;
        document.body.scrollTop = top;
      }

      // 6
      componentWillUnmount() {
        if (Const.__SERVER__) {
          return;
        }

        // [LifeCycle]storeWillUnmount
        if (typeof this.$.storeWillUnmount === 'function') {
          this.$.storeWillUnmount();
        }

        if (!cache) {
          const { asPath } = this.props;
          delete window.Stores[asPath];
        } else {
          // 页面退出时，记住页面滚动位置
          this.$.setParams({
            top: document.documentElement.scrollTop || document.body.scrollTop
          });
        }
      }

      // 百度统计，手动推送
      hmtCount = () => {
        try {
          if ('_hmt' in window) {
            window._hmt.push(['_trackPageview', window.location.pathname]);
          }
        } catch (ex) {
          console.warn(ex);
        }
      };

      // 微信注册页面
      registerWx = async () => {
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
      };

      $; // 当前页面对应Store引用

      // 3
      render() {
        const { pathname, asPath, params } = this.props;

        // 客户端每次切换页面时缓存当前路由，用于跳转返回
        if (Const.__CLIENT__) {
          Const.__PATH_CURRENT__ = {
            pathname,
            asPath,
            query: params
          };
        }

        return <ComposedComponent {...this.props} />;
      }
    }
  );

export default InjectDecorator;
