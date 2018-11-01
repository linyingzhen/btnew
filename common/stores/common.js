/* eslint-disable no-console */
/**
 * const prefixCls = 'style-111534';
 * const images = '/static/images/common/stores';
 * @Author: czy0729
 * @Date: 2018-06-20 09:17:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-15 13:06:49
 * @Path m.benting.com.cn \common\stores\common.js
 */
import {
  configure,
  // useStrict,
  extendObservable,
  action,
  toJS,
  isObservableArray,
  isObservableObject
} from 'mobx';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';

configure({ enforceActions: true });
// useStrict(true);

export const defaultKey = 'state';
export const paramsKey = '__params';
export const updateKey = '__refresh';
export const fetchConfigKey = '__fetch';

class store {
  /* ==================== init ==================== */
  /**
   * 初始化Params
   * @version 170703 1.0
   * @param  {Object} *params
   * @return {Void}
   */
  initParams(params = {}) {
    this[paramsKey] = params;
  }

  /**
   * 判断配置，从localStorage里初始化state
   * @version 170213 1.0
   * @version 170313 1.1 过滤参数
   * @param  {Object}   defaultState 初始值
   * @param  {String[]} filter       过滤键值，强制使用defaultState
   * @return {Object}
   */
  initState(defaultState = {}, filter = []) {
    const { cache, namespace } = this.config || {};

    const filterState = {};
    filter.forEach(item => {
      filterState[item] = defaultState[item];
    });

    return cache && namespace
      ? { ...defaultState, ...Utils.lsGet(namespace), ...filterState }
      : { ...defaultState, ...filterState };
  }

  /**
   * 初始化Fetch配置
   * @version 170703 1.0
   * @version 170706 1.1 initFetch时需要设置refresh为true，否则会导致update重复调用两次
   * @param  {Object} *config 初始值 shape({ static, one, update, every })
   * @return {Void}
   */
  initFetch(fetchConfig = {}) {
    this.setParams({
      [updateKey]: true
    });
    this[fetchConfigKey] = fetchConfig;
  }

  /* ==================== set ==================== */
  /**
   * 设置params
   * @version 170530 1.0
   * @version 170704 1.1 使用this[paramsKey]，将废弃this.params
   * @param  {Object} params
   * @return {Void}
   */
  setParams(params) {
    if (!this[paramsKey]) {
      this[paramsKey] = {};
    }

    this[paramsKey] = {
      ...this[paramsKey],
      ...params
    };
  }

  /**
   * setState 增量添加
   * @version 170216 1.0
   * @version 170319 1.1 set之前做了比较
   * @version 170428 1.3 处理key不存在的情况
   * @version 170502 1.4 结构非对象的情况
   * @version 170812 1.5 _loaded可以被覆盖
   * @version 170814 1.6 setState默认设置_timestamp
   * // @version 171011 1.7 _igore 默认值_igore为true时，setState时_loaded一直为false，需要手动设置为true
   * @version 180515 2.0 可以debug
   * @param  {Any}    *data 值
   * @param  {String} key   键值
   * @return {Void}
   */
  @action
  setState(data, key = defaultKey) {
    let prevState;
    let _data = data;

    if (this.debug) {
      prevState = this.toJS(key);
    }

    let isStateChange = false;
    let value;
    if (typeof _data === 'object') {
      if (_data === null) _data = {};

      // 现在后端不可能返回这种结构，待废弃
      if (Array.isArray(_data)) {
        value = {
          _loaded: true,
          list: _data
        };
      } else {
        value = {
          _loaded: true,
          ..._data
        };
      }

      if (!this.is(this.getState(key), value)) {
        if (!this.state[key]) {
          // 键值不存在，要创建一个观察的对象
          extendObservable(this.state, {
            [key]: {}
          });
        } else {
          this.state[key] = {
            ...this.state[key],
            ...value
          };
        }
        isStateChange = true;
      }
    } else {
      if (!(key in this.state)) {
        // 键值不存在，要创建一个观察的对象
        extendObservable(this.state, {
          [key]: _data
        });
      } else {
        this.state[key] = _data;
      }
      isStateChange = true;
    }

    if (this.debug && isStateChange) {
      console.info(Utils.date('H:i:s', new Date().valueOf() / 1000), '|', key);
      console.log(prevState);
      console.log(value);
      console.log(
        '----------------------------------------------------------------------------------------'
      );
    }
  }

  /**
   * 完全替换一个key
   * @version 170518 1.0
   * @param  {String} key  键值
   * @param  {Any}    data 替换成的值
   * @return {Void}
   */
  @action
  clearState(key = defaultKey, data = {}) {
    extendObservable(this.state, {
      [key]: data
    });
  }

  /**
   * 设置刷新标志位
   * @version 170727 1.0
   * @version 170813 1.1 刷新时需要把scrollTop设置为0
   * @return {Void}
   */
  @action
  setRefresh(params) {
    this.setParams({
      [updateKey]: true,
      top: 0,
      ...params
    });
  }

  /* ==================== get ==================== */
  /**
   * Params里浅拷贝取值
   * @version 170703 1.0
   * @param  {String} key 键值
   * @return {Any}
   */
  getParams(key) {
    return key ? this[paramsKey][key] : this[paramsKey];
  }

  /**
   * Stores里浅拷贝取值
   * 切记不能直接取state，delete等操作后会把store的引用都删掉
   * @version 170312 1.0
   * @version 170428 1.1 处理key不存在的情况
   * @version 170821 1.2 区分ObservableArray和object
   * @version 170824 1.3 可以直接返回引用
   * @param  {String} key     键值
   * @param  {Bool}   isOrgin 是否返回引用
   * @return {Object}
   */
  getState(key = defaultKey, isOrgin = false) {
    if (!(key in this.state)) {
      // 键值不存在，要创建一个观察的对象
      extendObservable(this.state, {
        [key]: {}
      });

      return this.state[key];
    }

    if (isOrgin) {
      return this.state[key];
    }

    if (isObservableArray(this.state[key])) {
      return [...this.state[key]];
    }

    if (isObservableObject(this.state[key])) {
      // return { ...this.state[key] };
      return this.state[key] || {};
    }

    return this.state[key] || '';
  }

  /* ==================== fetch ==================== */
  /**
   * 请求后自动入Store
   * @version 170318 1.0
   * @version 170521 1.1 调整参数位置，使更好使用
   * @param  {String}  *api   api键值
   * @param  {String}  key    键值
   * @param  {Object}  query  参数
   * @param  {Object}  config 扩展参数(暂时没用)
   * @return {Promise}
   */
  async fetchThenSetState(api, key = defaultKey, query, config) {
    const state = this.getState(key);

    const result = Api.P(api, query, {
      show: !state._loaded,
      ...config
    });

    const data = await result;

    this.setState(data, key);

    return result;
  }

  /**
   * 请求列表数据后自动入Store，会自动判断请求且合并下一页的数据
   * @version 170517 1.0
   * @version 170520 1.1 #todo自动记录第一条数据的生成时间，并且之后的请求的数据要小于这个生成时间
   * @version 170701 1.2 修复没有保存_.order的问题
   * @version 170726 1.3 添加数据查询截止时间戳逻辑，只适用于时间倒序列表
   * @version 180529 1.4 refresh确保是Boolean，防止直接传到onClick里面e被当做true的情况
   * @param  {String}  *api          api名字
   * @param  {String}  key           保存值的键值
   * @param  {Object}  query         请求参数
   * @param  {Boolean} refresh       是否强制从第一页重新请求
   * @param  {String}  createTimeKey 数据查询截止时间戳
   * @return {Promise}
   */
  async fetchListThenSetState(
    api,
    key = defaultKey,
    query = {},
    refresh = false,
    createTimeKey
  ) {
    const state = this.getState(key);
    let _refresh = refresh;

    if (_refresh !== true && _refresh !== false) {
      _refresh = false;
    }

    // 判断是否还有下一页
    if (!_refresh && state._loaded && !state._hasMore) return false;

    // 加载过的数据会强制使用store里面保存的query，以使请求数据合并后不会错乱
    let _query;
    if (_refresh || !state._loaded) {
      // 首次请求
      _query = {
        _: {
          page: 1,
          limit: Const.__LIMIT__
        },
        ...query
      };
    } else {
      // 二次请求，正常情况下只有page变化
      _query = {
        ...state._query,
        _: {
          ...state._query._,
          page: state._query._.page + 1
        }
      };

      // v1.3 数据查询截止时间戳
      if (createTimeKey) {
        const createTime = state.list[0][createTimeKey];

        if (createTime) {
          if (_query._.search) {
            _query._.search[`${createTimeKey}[<=]`] = createTime;
          } else {
            _query._.search = {
              [`${createTimeKey}[<=]`]: createTime
            };
          }
        }
      }
    }

    const result = Api.P(api, _query, {
      show: !state._loaded
    });

    const data = await result;

    // 合并之前的data.list
    const { list = [] } = state;

    // 为后端写安全兼容代码，以保持前端全局列表结构一致
    const _list = _refresh ? data.list : [...list, ...data.list];

    const _hasMore = data.pageinfo
      ? data.pageinfo.pagetotal > data.pageinfo.page
      : false;

    const __query = {
      ..._query,
      _: {
        page: data.pageinfo ? data.pageinfo.page : 1,
        limit: data.pageinfo ? data.pageinfo.limit : 10,
        order: _query._.order || {},
        search: _query._.search || {}
      }
    };

    this.setState(
      {
        // 以下是后端正常参数
        pageinfo: {
          page: 1,
          limit: Const.__LIMIT__,
          pagetotal: 1,
          recordtotal: 1
        },
        ...data,
        list: _list,

        // 以下是辅助参数
        _loaded: true,
        _hasMore,
        _query: __query,
        _timestamp: Utils.getTimestamp()
      },
      key
    );

    return result;
  }

  /**
   * 请求一条列表数据并替换掉Stores中对应的数据
   * 假如列表对应这项不存在，不执行
   * @version 170520 1.0
   * @version 170527 1.1 [要测试]假如本身有数据，但是请求回来又没数据，认为数据已删除，要把该数据删除
   * @version 170724 1.2 如果不传searchKey，以search第一个键值名作为查找标志
   * @param  {String}  *api      api名字
   * @param  {String}  *key      保存值的键值
   * @param  {Object}  *search   约定搜索条件(暂时只支持一个键值搜索，多出的会忽略)
   * @param  {Object}  searchKey 查找标志键值
   * @return {Promise}
   */
  async updateOneThenSetState(api, key = defaultKey, search = {}, searchKey) {
    const state = this.getState(key);

    if (!state || !state.list) return false;

    // 20170724 如果不传searchKey，以search第一个键值名作为查找标志
    let _searchKey = searchKey;
    if (!_searchKey) [_searchKey] = Object.keys(search);

    // (重要) 假如列表对应这项不存在，不执行
    const findIndex = state.list.findIndex(
      item => item[_searchKey] == search[_searchKey]
    );

    if (!state._loaded || findIndex === -1) return false;

    // 构造请求参数
    const _query = {
      ...state._query,
      _: {
        page: 1,
        limit: 1,
        search
      }
    };

    const result = Api.P(api, _query, {
      show: !state._loaded
    });

    const data = await result;

    const list = [...state.list];
    if (data.list.length) {
      const index = state.list.findIndex(
        item => item[_searchKey] === search[_searchKey]
      );

      // 替换调目标项
      list.splice(index, 1, data.list[0]);
    } else {
      // 认为数据已删除，要把该数据删除
      list.splice(findIndex, 1);
    }

    // 更新入库
    this.setState({ list }, key);

    return result;
  }

  /* ==================== tool ==================== */
  /**
   * 比较下一个值是否跟当前值相同
   * @version 170319 1.0
   * @version 170727 1.1 使用正常的方法判断对象是否相同
   * @param  {Object}  *current 当前state
   * @param  {Object}  *next    下一个state
   * @return {Boolean}
   */
  is(current = {}, next = {}) {
    if (typeof current !== 'object' || typeof next !== 'object') return false;

    // 当前数据源没有就绪的时候，总是返回false
    if (!current._loaded) return false;

    return Utils.isObjectValueEqual(current, next);
  }

  /**
   * 将一个observableObject转化为javascript原生的对象
   * Mobx: toJS(value: any, supportCycles?=true: boolean)
   * @version 170428 1.0
   * @param  {String} key 保存值的键值
   * @return {Object}
   */
  toJS(key) {
    return toJS(this.state[key] || this.state);
  }
}

export default store;
