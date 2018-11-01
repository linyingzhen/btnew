/**
 * const prefixCls = 'style-456650';
 * const images = '/static/images/src/bbs/topic/Index';
 * @Author: czy0729
 * @Date: 2018-08-03 10:17:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 15:19:42
 * @Path m.benting.com.cn /src/bbs/topic/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import { tabsDS } from './ds';

export default class Store extends common {
  @observable
  state = this.initState({
    // tabs
    _affixTabs: {
      page: 0
    },

    // 留言框
    _fixedTextarea: {
      show: false,
      placeholder: '',
      onSubmit: Function.prototype
    },

    // 话题详情
    detail: {},

    // 话题发帖列表
    topic: Const.__EMPTY__,

    // 话题是否已发帖
    isPosted: false
  });

  params = {
    query: {}
  };

  setQuery = {
    // 话题
    topic: index => {
      const { id } = this.params.params;
      const { title } = tabsDS[index];
      let query;

      switch (title) {
        case '推荐':
          query = {
            _: {
              limit: Const.__LIMIT__,
              order: {
                likeAdd: 'desc',
                replyNum: 'desc'
              },
              search: {
                topicId: id
              }
            }
          };
          break;

        case '最新':
          query = {
            _: {
              limit: Const.__LIMIT__,
              order: {
                createTime: 'desc'
              },
              search: {
                topicId: id
              }
            }
          };
          break;

        case '精华':
          query = {
            _: {
              limit: Const.__LIMIT__,
              order: {
                createTime: 'desc'
              },
              search: {
                topicId: id,
                isDigest: 1
              }
            }
          };
          break;

        default:
          break;
      }
      this.setParams({
        query
      });
    }
  };

  fetch = {
    config: {
      one: ['detail', 'isPosted'],
      update: ['topic']
    },

    // 话题详情
    detail: async () => {
      const { id } = this.params.params;

      const res = Api.P('get_topic_list', {
        _: {
          limit: 1,
          search: {
            topicId: id
          }
        }
      });
      const data = await res;

      // #todo 待后端修复接口
      if (data.list.length === 1) {
        this.setState(data.list[0], 'detail');
      } else if (data.list.length > 1) {
        const index = data.list.findIndex(item => item.topicId == id);

        this.setState(data.list[index], 'detail');
      }

      return res;
    },

    // 话题发帖列表
    topic: refresh => {
      const { query } = this.params;

      return this.fetchListThenSetState(
        'get_bbs_list',
        'topic',
        query,
        refresh
      );
    },

    // 话题是否已发帖
    isPosted: async () => {
      const { id } = this.params.params;

      const res = Api.P('do_topic_is-posted', { topicId: id }, { show: false });
      const data = await res;

      // data = 1 代表发过一次
      if (data === 1) {
        this.setState(true, 'isPosted');
      }

      return res;
    }
  };

  do = {
    submit: async value => {
      if (Utils.getCharLength(value.value) < 20) {
        Utils.light('贴子的字数不能少于20');
        return;
      }

      const { topicId, title } = this.getState('detail');

      await Api.P('do_topic_posted', {
        forumId: 68, // 写死话题板块id
        topicId,
        title: `#${title}#`,
        content: this.page.generateHtml(value.value, value.id),
        fileId: value.id.join(',')
      });

      Utils.light('话题发帖成功');
      this.page.hideFixedTextarea();
      this.fetch.topic(true);
      this.fetch.isPosted();
    }
  };

  page = {
    // Tab点击
    onTabClick: (item, index) => {
      this.setQuery.topic(index);
      this.fetch.topic(true);
      this.setState({ page: index }, '_affixTabs');

      Utils.scrollTo(0);
    },

    // 显示回复框
    showFixedTextarea: () =>
      this.setState(
        {
          show: true,
          onSubmit: this.do.submit
        },
        '_fixedTextarea'
      ),

    // 隐藏回复框
    hideFixedTextarea: () =>
      this.setState(
        {
          show: false
        },
        '_fixedTextarea'
      ),

    // 构造简单html
    generateHtml: (content = '', fileId = []) => {
      let html = '';

      content.split('\n').forEach(item => {
        html += `<p>${item}</p>`;
      });

      if (fileId.length) {
        fileId.forEach(item => {
          html += `<img data-src="${item}" src="${
            Const.__API__
          }/file/getimg/${item}/scale" /><br>`;
        });
      }

      return html;
    }
  };

  storeInit() {
    const { tabId = 1 } = this.params.params;

    this.setQuery.topic(tabId);
    this.setState({ page: tabId }, '_affixTabs');
  }
}
