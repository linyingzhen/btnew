/**
 * const prefixCls = 'style-676126';
 * const images = '/static/images/src/person/message/Index';
 * @Author: czy0729
 * @Date: 2018-10-05 20:45:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-21 20:30:03
 * @Path m.benting.com.cn /src/person/message/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import Utils from '@utils';
import G from '@stores/g';
import { tabsDS } from './ds';

export default class Store extends common {
  @observable
  state = this.initState({
    _affixTabs: {
      page: 0
    },

    // 提醒数
    messageCount: G.getState('messageCount'),

    // 评论
    reply: Const.__EMPTY__,

    // 点赞
    like: Const.__EMPTY__,

    // @我
    comment: Const.__EMPTY__,

    // 系统
    system: Const.__EMPTY__,

    // 聊天记录
    privateMessage: Const.__EMPTY__
  });

  fetch = {
    config: {
      update: ['messageCount', 'reply']
    },

    // 提醒数
    messageCount: async () => {
      const res = G.fetchMessageCount();

      this.setState(await res, 'messageCount');

      return res;
    },

    // 评论
    reply: refresh =>
      this.fetchListThenSetState(
        'get_message_list',
        'reply',
        {
          _: {
            limit: Const.__LIMIT__,
            search: {
              msgType: [2, 3, 101, 102]
            }
          }
        },
        refresh
      ),

    // 点赞
    like: refresh =>
      this.fetchListThenSetState(
        'get_message_list',
        'like',
        {
          _: {
            limit: Const.__LIMIT__,
            search: {
              msgType: [4, 5]
            }
          }
        },
        refresh
      ),

    // @我
    comment: refresh =>
      this.fetchListThenSetState(
        'get_message_list',
        'comment',
        {
          _: {
            limit: Const.__LIMIT__,
            search: {
              msgType: [7]
            }
          }
        },
        refresh
      ),

    // 系统
    system: refresh =>
      this.fetchListThenSetState(
        'get_message_list',
        'system',
        {
          _: {
            limit: Const.__LIMIT__,
            search: {
              msgType: [1, 6]
            }
          }
        },
        refresh
      ),

    // 私聊列表
    privateMessage: refresh =>
      this.fetchListThenSetState(
        'get_chat_private-notice',
        'privateMessage',
        {},
        refresh
      )
  };

  do = {
    // 清除已读
    clear: async type => {
      await G.doClearMessageCount(type);

      this.setState(G.getState('messageCount'), 'messageCount');
    }
  };

  page = {
    // Tab点击
    onTabClick: (item, index) => {
      this.setState({ page: index }, '_affixTabs');

      this.do.clear(tabsDS[index].numKey);
      this.page.fetchNextTab(index);
      Utils.scrollTo(0);
    },

    fetchNextTab: index => {
      switch (tabsDS[index].title) {
        case '点赞':
          if (!this.getState('like')._loaded) {
            this.fetch.like();
          }
          break;

        case '@我':
          if (!this.getState('comment')._loaded) {
            this.fetch.comment();
          }
          break;

        case '系统':
          if (!this.getState('system')._loaded) {
            this.fetch.system();
          }
          break;

        case '私信':
          if (!this.getState('privateMessage')._loaded) {
            this.fetch.privateMessage();
          }
          break;

        default:
          break;
      }
    }
  };

  storeDidMount() {
    // #todo 待优化，场景比较特殊，存在初始时G的消息数请求还没完毕，清零不调用的情况
    setTimeout(() => {
      G.doClearMessageCount(tabsDS[0].numKey);
    }, 4000);
  }
}
