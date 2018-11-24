/**
 * SPA主要逻辑装饰器
 * const prefixCls = 'style-925556';
 * const images = '/static/images/common/decorator';
 * @Version [X] v3.1 180801 优化流程：static里面的方法也会每次执行，只不过不请求也返回带数据promise
 * @Version v3.2 181004 加入storeDidFetch
 * @Version v3.3 181010 加入storeDidInitFetch来细化钩子
 * @Version v3.4 181023 修复storeDidMount在Client端页面初始化时调用2次的问题
 * @Version v3.5 181029 加入store本地化，运行时机在storeDidInitFetch
 * @Version v3.6 181113 调整传入的第二个参数，可以传入login代表页面需要检查登录，非登录屏蔽请求
 * @Author: czy0729
 * @Date: 2018-07-15 16:34:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-13 16:23:25
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
import Const from '@const';
import Utils from '@utils';
import G from '@stores/g';
import Ui from '@stores/ui';
import {
  hmtCount,
  registerWx,
  getFetchFns,
  compareStatic,
  doFetch,
  setCache,
  loginThenInitStore
} from './utils';

const InjectDecorator = (
  Store,
  { login = false, cache = true } = {}
) => ComposedComponent =>
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
              // 服务器端没有token，login一定不请求
              if (!login) {
                await doFetch(mustFetchFns, this.$);
              }
            }
          } else if (login && !Utils.checkLogin()) {
            // 客户端处理没登录
            loginThenInitStore(asPath);
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
              const localState = this.$[defaultKey][item];
              const serverState = $[defaultKey][item];
              let state = serverState;
              let updateLoaded = false;

              // 判断服务器渲染的数据_from === 'ls'，若未不覆盖本地缓存数据
              // #todo 服务器有数据以服务器为主，其次以本地为主，最后以默认为主
              if (typeof localState === 'object' && localState._from === 'ls') {
                updateLoaded = serverState._loaded;
                state = {
                  _from: 'ls'
                };
              }

              this.$.setState(state, item, updateLoaded);
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

            if (login && !Utils.checkLogin()) {
              loginThenInitStore(asPath);
            } else if (igoreFetch && igoreFetch.length) {
              doFetch(igoreFetch, this.$);
            }

            if (Const.__WX__) {
              registerWx();
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
        if (this.$ && this.$.computed) {
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

        if (!$) {
          return;
        }

        // 页面是PUSH进来的，要告诉store重置数据和重置scrollTop
        if (Utils.getPageTransition()) {
          if ($.setRefresh) {
            $.setRefresh();
          }
          hmtCount();
        }

        if (Const.__WX__) {
          registerWx();
        }

        // [LifeCycle]storeDidMount
        if (typeof $.storeDidMount === 'function') {
          $.storeDidMount(this.props);
        }
      }

      // 5
      componentDidMount() {
        const { isServer, asPath } = this.props;
        const { fetch = {} } = this.$;
        const { config } = fetch;
        const { top, __refresh } = this.$.getParams();

        // 服务器端首次切换到客户端的时候，不应该请求
        if (!isServer) {
          if (login && !Utils.checkLogin()) {
            loginThenInitStore(asPath);
          } else {
            const fns = getFetchFns(
              config,
              __refresh ? ['every', 'update'] : ['every']
            );

            doFetch(fns, this.$);
          }
        }

        if (__refresh) {
          this.$.setParams({ __refresh: false });
        }

        // 当store有top值时，设置页面滚动位置
        document.documentElement.scrollTop = top;
        document.body.scrollTop = top;

        // set cache
        setCache(this.$);
      }

      // 2
      componentWillUpdate(nextProps) {
        const { isServer } = nextProps;
        if (isServer) {
          return;
        }

        const { $ } = nextProps;

        if (!$) {
          return;
        }

        // 页面是PUSH进来的，要告诉store重置数据和重置scrollTop
        if (Utils.getPageTransition()) {
          if ($.setRefresh) {
            $.setRefresh();
          }
          hmtCount();
        }

        if (Const.__WX__) {
          registerWx();
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

      // 当前页面对应Store引用
      $;

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
