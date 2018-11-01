/**
 * const prefixCls = 'style-112497';
 * const images = '/static/images/src/bbs/Post';
 * @Author: czy0729
 * @Date: 2018-07-22 23:40:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-23 11:29:35
 * @Path m.benting.com.cn /src/bbs/Post/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';

// 垂钓天地板块Id
const forumId = 68;

export default class Store extends common {
  @observable
  state = this.initState({
    // 七牛文件key
    qiniuFileKey: '',

    // 帖子详情
    post: {}
  });

  fetch = {
    config: {
      update: ['post']
    },

    // 帖子详情
    post: () => {
      const { id } = this.params.params;

      if (!id) {
        return false;
      }

      return this.fetchThenSetState('get_bbs_post-detail', 'post', {
        postId: id
      });
    },

    // 七牛文件key
    qiniuKey: async () => {
      const res = Api.P('get_qiniu_key');

      const data = await res;

      this.setState({
        qiniuFileKey: data
      });

      return res;
    }
  };

  do = {
    // 发布帖子
    submit: async (title, json, html, entities) => {
      await Api.P('do_bbs_posted', {
        forumId,
        title,
        content: html,
        json,
        type: 1,
        fileId: entities.join()
      });

      if (window.Stores['/bbs']) {
        window.Stores['/bbs'].setRefresh();
      }

      Utils.light('发帖成功');
      Utils.router.replace('/bbs/1');
    },

    // 编辑帖子
    update: async (title, json, html, entities) => {
      const { id } = this.params.params;

      await Api.P('do_bbs_post-update', {
        postId: id,
        title,
        content: html,
        json,
        fileId: entities.join()
      });

      Utils.light('编辑成功');
      Utils.router.back();
    }
  };
}
