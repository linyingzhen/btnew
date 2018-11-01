
/* eslint-disable react/sort-comp */
/**
 * const prefixCls = 'style-190546';
 * const images = '/static/images/common/decorator';
 * @Author: czy0729
 * @Date: 2018-06-19 18:20:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-05 13:43:25
 * @Path m.benting.com.cn \common\decorator\inject.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { paramsKey, defaultKey } from '@stores/common';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import G from '@stores/g';
import Ui from '@stores/ui';

// 获得请求函数引用，返回数组
const getFetchFns = (initFetch, modes) => {
  const fns = [];

  if (typeof initFetch !== 'object' || !Array.isArray(modes)) {
    return fns;
  }

  modes.forEach(mode => {
    if (initFetch[mode]) {
      initFetch[mode].forEach((item, index) => {
        const fn = initFetch[mode][index];

        if (mode === 'static') {
          fns.push(fn[0]);
        } else {
          fns.push(fn);
        }
      });
    }
  });

  return fns;
};

// 继承G
const compareStatic = (initFetch, target) => {
  const fns = [];

  if (typeof initFetch !== 'object') {
    return fns;
  }

  ['static'].forEach(mode => {
    if (initFetch[mode]) {
      initFetch[mode].forEach(item => {
        const [fn, key, gKey] = item;

        // 局部跟全局对比是否一致，不一致的话用全局替换
        const gState = G.getState(gKey || key);

        // 若是-1，getState结果为{}，需再次请求
        if (
          !Object.keys(gState).filter(item => item.indexOf('_') !== 0).length
        ) {
          fns.push(fn);
        } else {
          const currentState = target.getState(key);

          if (!Utils.isObjectValueEqual(gState, currentState)) {
            target.setState(gState, key);
          }
        }
      });
    }
  });

  return fns;
};

const fetch = (fns, target) =>
  Promise.all(
    fns.map(item => target[Array.isArray(item) ? item[0] : item](true))
  );

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
            __timestamp: Utils.getTimestamp(),
            top: 0,
            isServer,
            params: query,
            pathname,
            asPath
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
              __timestamp: Utils.getTimestamp(),
              isServer,
              params: query,
              pathname,
              asPath
            });

            // [LifeCycle]storeInit
            if (typeof this.$.storeInit === 'function') {
              this.$.storeInit();
            }
          } else {
            // [CLIENT]进入旧页面
            this.$ = window.Stores[asPath];

            // 若cache为false，会创建一个新的store替换
            if (cache && this.$) {
              const { initFetch } = this.$;

              compareStatic(initFetch, this.$);
              // #todo every

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
        const { initFetch } = this.$;

        if (typeof initFetch === 'object') {
          let fns = [];

          // 服务器端肯定是首次，全部请求
          if (isServer) {
            fns = getFetchFns(initFetch, ['static', 'one', 'update', 'every']);
          } else {
            fns = [
              ...compareStatic(initFetch, this.$),
              ...getFetchFns(initFetch, ['one'])
            ];
          }

          if (isServer) {
            // 分离出需要ssr的请求
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
              await fetch(mustFetchFns, this.$);
            }
          } else {
            // 客户端不需要阻塞，不阻塞会显示loading动画，阻塞会导致不能马上切换页面
            fetch(fns, this.$);
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
          $,
          isServer,
          igoreFetch,
          params,
          pathname,
          asPath
        } = this.props;

        // 服务器切到客户端的流程
        if (isServer && typeof window !== 'undefined') {
          this.$ = new Store({
            params,
            pathname,
            asPath
          });
          this.$.setParams({
            ...$[paramsKey],
            isServer: false
          });

          // 把打印在源代码的SERVER端的state复制到CLIENT端
          Object.keys($[defaultKey] || {}).forEach(item => {
            this.$.setState($[defaultKey][item], item);
          });
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

            if (igoreFetch.length) fetch(igoreFetch, this.$);
            if (Const.__WX__) this.registerWx();
          }

          if (!window.Stores[asPath]) {
            window.Stores[asPath] = this.$;

            if (this.$.storeDidMount) this.$.storeDidMount(this.props);
          }
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
        if (isServer && Const.__SERVER__) return;

        const { $ } = this.props;

        // 页面是PUSH进来的，要告诉store重置数据和重置scrollTop
        if (Utils.getPageTransition()) {
          if ($.setRefresh) $.setRefresh();
          this.hmtCount();
        }

        if (Const.__WX__) this.registerWx();

        // [LifeCycle]storeDidMount
        if (typeof $.storeDidMount === 'function') $.storeDidMount(this.props);
      }

      // 5
      componentDidMount() {
        // const { isServer } = this.props;
        const { initFetch } = this.$;
        const { top, __refresh } = this.$.getParams();
        const fns = getFetchFns(
          initFetch,
          __refresh ? ['every', 'update'] : ['every']
        );

        fetch(fns, this.$);
        if (__refresh) this.$.setParams({ __refresh: false });

        // 当store有top值时，设置页面滚动位置
        document.documentElement.scrollTop = top;
        document.body.scrollTop = top;
      }

      // 2
      componentWillUpdate(nextProps) {
        const { isServer } = nextProps;
        if (isServer) return;

        const { $ } = nextProps;

        // 页面是PUSH进来的，要告诉store重置数据和重置scrollTop
        if (Utils.getPageTransition()) {
          if ($.setRefresh) $.setRefresh();
          this.hmtCount();
        }

        if (Const.__WX__) this.registerWx();

        // [LifeCycle]storeDidMount
        if (typeof $.storeDidMount === 'function') $.storeDidMount(this.props);
      }

      // 5
      componentDidUpdate() {
        const { isServer } = this.props;
        if (isServer && !Const.__DEV__) return;

        const { initFetch } = this.$;
        const { top, __refresh } = this.$.getParams();
        let fns = [];

        // [DEV]开发环境无条件全部请求
        if (Const.__DEV__) {
          fns = getFetchFns(initFetch, ['static', 'one', 'update', 'every']);
        } else {
          fns = getFetchFns(
            initFetch,
            __refresh ? ['every', 'update'] : ['every']
          );
        }

        fetch(fns, this.$);
        if (__refresh) this.$.setParams({ __refresh: false });

        // 当store有top值时，设置页面滚动位置
        document.documentElement.scrollTop = top;
        document.body.scrollTop = top;
      }

      // 6
      componentWillUnmount() {
        const { isServer } = this.props;
        if (isServer) return;

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
          // console.log(ex);
        }
      };

      // 微信注册页面
      registerWx = async () => {
        let config = G.wxConfig[window.location.href];

        if (!config) {
          const data = await Api.PP('get_wx_js-sign', {
            url: window.location.href
          });

          if (data.code != 0) return;

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
