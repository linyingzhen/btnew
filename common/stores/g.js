/**
 * const prefixCls = 'style-745245';
 * const images = '/static/images/common/stores';
 * @Author: czy0729
 * @Date: 2018-06-20 11:15:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-14 11:30:24
 * @Path m.benting.com.cn \common\stores\g.js
 */
import { observable } from 'mobx';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import common, { paramsKey } from './commonV2';

const namespace = `${Const.__LS_PREFIX__}G`;
const tree = (ds, parId = 1) => {
  const data = [...ds];
  const result = [];
  let temp;

  for (let i = 0; i < data.length; i += 1) {
    if (data[i].parId == parId) {
      const obj = {
        ...data[i]
      };

      temp = tree(data, data[i].typeId);
      if (temp.length > 0) {
        obj.children = temp;
      }
      result.push(obj);
    }
  }
  return result;
};

class Store extends common {
  config = {
    namespace,
    cache: [
      'tk',
      'tmall181111',
      'indexNotice',
      'discoverySpecial',
      'bbsBlock',
      'bbsTopic'
    ]
  };
  wxConfig = {}; // 缓存不同页面的微信配置

  @observable
  state = this.initState({
    // System
    tk: '', // token
    networkType: '', // 网络类型
    mounted: false, // app是否初始化
    loadedAMapJS: false, // 高德地图依赖是否加载完成
    reply: { list: [] }, // 记录历史回复
    gifts: Const.__EMPTY__, // 打赏礼物
    tmall181111: {
      // 天猫2018双11优惠券弹窗
      isRead: false
    },

    // 消息提示数，用于我的标记红点
    messageCount: {
      replyNum: 0, // 评论
      likeNum: 0, // 点赞
      chatNum: 0, // 私信
      commentNum: 0, // @我
      systemNum: 0, // 系统
      isRead: false
    },

    // Home
    // 最新一个公告的发布时间
    indexNotice: {
      time: 0,
      count: 0,
      isRead: true
    },

    // Discovery
    // 最新一个发现精选的发布时间
    discoverySpecial: {
      time: 0,
      count: 0,
      isRead: true
    },

    // BBS
    bbsBlock: Const.__EMPTY__, // 论坛版块

    // 我的论坛收藏和点赞列表
    bbsLikeAndFavorList: {
      list: {
        favorite: [],
        like: []
      }
    },

    // 论坛话题
    bbsTopic: {
      time: 0,
      lastTopicId: 0,
      isPost: false
    },

    // Shop
    // 商城分类列表
    shopCategory: {
      list: [], // 存放tree结构数据
      _list: [] // 存放原始数据
    },

    // User
    userInfo: {}, // 我的详情
    walletInfo: {} // 我的余额
  });

  [paramsKey] = {
    jumpUrl: {} // 登录后回跳地址
  };

  /* ==================== common ==================== */
  /**
   * 本地化全局Store
   * @version 171011 1.0
   */
  setCache = () => {
    const store = {};
    this.config.cache.forEach(item => {
      store[item] = this.getState(item);
    });
    Utils.lsSet(namespace, store);
  };

  /**
   * 更新Tk
   * @version 180208 1.0
   * @version 181114 1.1 更新Tk后会把url上面的tk去掉
   */
  updateTk = tk => {
    this.setState(tk, 'tk');
    this.setCache();

    if (Const.__CLIENT__) {
      const { pathname, asPath, query } = Const.__PATH_CURRENT__;

      Utils.router.replace(`${pathname}?${Utils.getQueryStr(query)}`, asPath, {
        shallow: true
      });
    }
  };

  /**
   * 回复入库，如果历史存在，返回false
   * @version 170821 1.0
   */
  insertReply = newReply => {
    const { list } = this.getState('reply');

    if (list.findIndex(item => item === newReply) === -1) {
      if (list.length >= 2) {
        list.pop();
      }
      list.unshift(newReply);
      this.setState(list, 'reply');

      return true;
    }

    return false;
  };

  /* ==================== DS ==================== */
  // 消息提示数，用于我的标记红点
  fetchMessageCount = () =>
    this.fetchThenSetState('get_message_count-new', 'messageCount');

  /**
   * 我的详情
   * @version 170519 1.0
   */
  fetchUserInfo = () => this.fetchThenSetState('get_user_info', 'userInfo');

  /**
   * 我的余额
   * @version 180113 1.0
   */
  fetchWalletInfo = () =>
    this.fetchThenSetState('get_wallet_info', 'walletInfo', {
      type: 0
    });

  /**
   * 我的论坛点赞和收藏列表
   * @version 170629 1.0
   */
  fetchBBSLikeAndFavorList = () =>
    this.fetchThenSetState(
      'get_bbs_like-and-favorite-list',
      'bbsLikeAndFavorList'
    );

  /**
   * 论坛版块
   * @version 170814 1.0
   */
  fetchBBSBlock = async () => {
    const res = this.fetchThenSetState('get_bbs_blocks', 'bbsBlock', {
      _: {
        limit: 0
      }
    });
    await res;

    this.setCache();

    return res;
  };

  // 打赏礼物
  fetchGifts = () =>
    this.fetchThenSetState('get_shop_goods-list', 'gifts', {
      goodsType: 35
    });

  /**
   * 商城分类
   * @version 180929 1.0
   */
  fetchShopCategory = async () => {
    const data = await Api.P('get_product_type-tree');

    const treeDS = tree(data.list);
    const result = {
      list: treeDS,
      _list: data.list,
      _loaded: true
    };
    this.setState(result, 'shopCategory');

    return new Promise(resolve => resolve(result));
  };

  /* ==================== Action ==================== */
  /**
   * 20181111天猫弹窗已读
   * @version 181106 1.0
   */
  doSetReadTmall = () => {
    this.setState(
      {
        isRead: true
      },
      'tmall181111'
    );

    this.setCache();
  };

  /**
   * 清除消息
   * @version 181005 1.0
   * @param {String} type 消息类型
   * @return {Promise}
   */
  doClearMessageCount = async type => {
    const messageCount = this.getState('messageCount');
    const isAll = type === 'all';

    let res;
    if (isAll || messageCount[type]) {
      res = Api.P(
        'do_message_count-clear',
        {
          typesKey: type
        },
        {
          show: false
        }
      );
      await res;

      let newState = {
        [type]: 0
      };
      if (isAll) {
        newState = {
          replyNum: 0,
          likeNum: 0,
          chatNum: 0,
          commentNum: 0,
          systemNum: 0
        };
      }

      this.setState(newState, 'messageCount');
    }

    return res;
  };

  /**
   * 登出
   * @version 180119 1.1
   */
  doLogout = async () => {
    await Api.P('do_logout', {
      appType: 3
    });

    this.clearState('tk', '');
    this.setCache();
    Utils.router.replace('/login');

    window.location.reload();
  };

  /**
   * 密码登录
   * @version 180119 1.0
   * @return {Promise}
   */
  doLoginByPwd = async (query, config) => {
    const res = Api.P(
      'do_login_merge',
      {
        ...query,
        appType: 3
      },
      config
    );
    const data = await res;

    this.setState(data, 'tk');
    this.setCache();

    // #todo
    await Promise.all([
      this.fetchUserInfo(),
      this.fetchWalletInfo(),
      this.fetchMessageCount()
    ]);

    return res;
  };

  /**
   * 贴子收藏
   * @version 180404 1.0
   * @return {Promise}
   */
  doFavor = async threadId => {
    const res = Api.P('do_bbs_favorite', {
      dataId: threadId,
      type: 'tid'
    });

    await res;

    const bbsLikeAndFavorList = this.getState('bbsLikeAndFavorList');

    let isAdd = false;
    if (
      bbsLikeAndFavorList.list.favorite.findIndex(item => item == threadId) ===
      -1
    ) {
      isAdd = true;
    }

    let _favorite = [];
    if (isAdd) {
      _favorite = [...bbsLikeAndFavorList.list.favorite, threadId];
    } else {
      _favorite = bbsLikeAndFavorList.list.favorite.filter(
        item => item != threadId
      );
    }

    this.setState(
      {
        list: {
          ...bbsLikeAndFavorList.list,
          favorite: _favorite
        }
      },
      'bbsLikeAndFavorList'
    );

    return res;
  };

  /**
   * 贴子点赞
   * @version 180404 1.0
   * @return {Promise}
   */
  doLike = async (postId, threadId) => {
    const res = Api.P('do_bbs_like', {
      postId,
      n: 1
    });

    await res;

    const bbsLikeAndFavorList = this.getState('bbsLikeAndFavorList');

    let isAdd = false;
    if (
      bbsLikeAndFavorList.list.like.findIndex(item => item == threadId) === -1
    ) {
      isAdd = true;
    }

    let _like = [];
    if (isAdd) {
      _like = [...bbsLikeAndFavorList.list.like, threadId];
    } else {
      _like = bbsLikeAndFavorList.list.like.filter(item => item != threadId);
    }

    this.setState(
      {
        list: {
          ...bbsLikeAndFavorList.list,
          like: _like
        }
      },
      'bbsLikeAndFavorList'
    );

    return res;
  };

  /* ==================== Page ==================== */
  // System
  /**
   * 设置上一个页面Store刷新标志位
   * 说明：因为initFetch的update机制，返回上一个页面，页面不会请求，会导致
   * 例如列表数据不同步的问题，这时可以调用此函数，强制上一个页面请求数据
   * @version 180627 1.0
   */
  setLastPageRefresh = () => {
    const lastPageStoreKey = Const.__PATH_LAST__.asPath;

    const store = window.Stores[lastPageStoreKey];
    if (store) {
      // 不返回顶部
      store.setRefresh(undefined, false);
    }
  };

  /**
   * 按需加载AMap依赖
   * @version 180524 1.0
   * @param {Function} callback 回调函数
   */
  loadAMapJS = callback => {
    if (Const.__SERVER__) {
      return;
    }

    const loadedAMapJS = this.getState('loadedAMapJS');
    const callbackFn =
      typeof callback === 'function' ? callback : Function.prototype;

    if (loadedAMapJS) {
      callbackFn();
      return;
    }

    let loadedScriptBase;
    let loadedScriptUI;
    const onloadFn = () => {
      if (loadedScriptBase && loadedScriptUI) {
        this.setState(true, 'loadedAMapJS');

        setTimeout(() => {
          callbackFn();
        }, 400);
      }
    };

    // AMap基本js
    const scriptBase = document.createElement('script');
    const scriptUI = document.createElement('script');

    scriptBase.src = `https://webapi.amap.com/maps?v=1.3&key=${
      Const.__AMAP_KEY__
    }`;
    scriptBase.async = false;
    scriptBase.onload = () => {
      loadedScriptBase = true;
      setTimeout(() => {
        document.body.appendChild(scriptUI);
      }, 400);
    };

    // AMap UI库js
    scriptUI.src = 'https://webapi.amap.com/ui/1.0/main.js?v=1.0.11';
    scriptUI.async = false;
    scriptUI.onload = () => {
      loadedScriptUI = true;
      onloadFn();
    };

    document.body.appendChild(scriptBase);
  };

  /**
   * 设置回跳地址
   * @version 180119 1.0
   * @version 180803 1.1 因为加入了第三方登录跳转，所以这类跳转记录要存到本地
   * @param {Boolean} isLocal 是否本地模式
   */
  setJump = (isLocal = false) => {
    if (!isLocal) {
      this.setParams({
        jumpUrl: Const.__PATH_CURRENT__
      });
    } else {
      this.setState(Const.__PATH_CURRENT__, 'jumpUrl');
    }
  };

  /**
   * 回跳地址并清除
   * @version 180119 1.0
   * @version 180628 1.1
   * @return Boolean
   */
  doJump = () => {
    const { jumpUrl = {} } = this.getParams();

    if (!Object.keys(jumpUrl).length) {
      return false;
    }

    this.setParams({
      jumpUrl: {}
    });

    // 通常这种跳转返回，返回的页面需要刷新接口
    // 但是比如注册再登录这种跳回去的情况就没办法处理了
    this.setLastPageRefresh();

    if (Object.keys(jumpUrl.query).length) {
      Utils.router.replace(
        `${jumpUrl.pathname}?${Utils.getQueryStr(jumpUrl.query)}`,
        jumpUrl.asPath
      );
    } else {
      Utils.router.replace(jumpUrl.asPath);
    }

    return true;
  };

  /**
   * 微信更新网络类型
   * @version 180126 1.0
   */
  updateNetworkType = () => {
    if (!Const.__WX__) {
      // 非微信环境当成wifi
      this.setState('wifi', 'networkType');
      return;
    }

    wx.ready(() => {
      wx.getNetworkType({
        // 返回网络类型2g，3g，4g，wifi
        success: res => {
          if (res.errMsg === 'getNetworkType:ok') {
            this.setState(res.networkType, 'networkType');
          } else {
            this.setState('wifi', 'networkType');
          }
        }
      });
    });
  };

  /**
   * 客户端初始化完成
   * @version 180225 1.0
   */
  setMounted = () => this.setState(true, 'mounted');

  // Home
  /**
   * 更新标记首页公告
   * @version 180119 1.0
   */
  indexNoticeSetNew = (time, count) => {
    this.setState(
      {
        time,
        count,
        isRead: false
      },
      'indexNotice'
    );

    this.setCache();
  };

  /**
   * 标记首页公告已读
   * @version 180119 1.0
   */
  indexNoticeSetReaded = () => {
    this.setState(
      {
        isRead: true
      },
      'indexNotice'
    );

    this.setCache();
  };

  // Discovery
  /**
   * 更新标记精选
   * @version 170904 1.0
   * @version 171027 1.1
   */
  discoverySpecialSetNew = (time, count, isRead = false) => {
    this.setState(
      {
        time,
        count,
        isRead
      },
      'discoverySpecial'
    );

    this.setCache();
  };

  /**
   * 标记精选已读
   * @version 170904 1.0
   */
  discoverySpecialSetReaded = () => {
    this.setState(
      {
        isRead: true
      },
      'discoverySpecial'
    );

    this.setCache();
  };

  // BBS
  /**
   * 隐藏BBS话题底部fixed
   * 1. 当前话题已发帖，下一个话题出来前，都隐藏
   * 2. 当前话题未发帖，主动隐藏，过了0点重新显示
   * @version 180119 1.0
   */
  hideBBSTopicFixed = (lastTopicId, isPost = false) => {
    let time = new Date(new Date().toLocaleDateString()).getTime() / 1000;
    time += 86400;

    this.setState(
      {
        time,
        lastTopicId,
        isPost
      },
      'bbsTopic'
    );

    this.setCache();
  };

  // Tabbar
  /**
   * 清除信息提醒红点
   * @version 171201 1.1
   */
  resetMessageCount = () => {
    const { isRead } = this.getState('messageCount');

    if (isRead) {
      return;
    }

    this.setState(
      {
        isRead: true
      },
      'messageCount'
    );
  };
}

const G = new Store();

// 开发环境客户端
/* if (!Const.__SERVER__ && Const.__DEV__) {
  setTimeout(() => {
    autorun(() => {
      console.info(`autorun[G]`, G.toJS());
    });
  }, 0);
} */

// 客户端
if (Const.__CLIENT__) {
  // 客户端G初始化之后马上执行
  setTimeout(() => {
    G.setMounted(); // 设置程序mounted标志
    // G.updateNetworkType(); //检查网络状态
  }, 200);
}

export default G;
