/**
 * const prefixCls = 'style-110344';
 * const images = '/static/images/src/school/Index';
 * @Author: czy0729
 * @Date: 2018-09-05 14:23:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-26 13:39:43
 * @Path m.benting.com.cn /src/school/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import Utils from '@utils';
import { menuDS, articleBlockDS } from './ds';

export default class Store extends common {
  @observable
  state = this.initState({
    _menu: {
      activeIndex: 0
    },

    // 轮播图
    carousel: Const.__EMPTY__,

    // 推荐
    best: Const.__EMPTY__,

    // 推荐文章
    bestArticle: Const.__EMPTY__,

    // 教学专题
    tech: Const.__EMPTY__,

    // 本汀产品
    product: Const.__EMPTY__,

    // 钓鱼实战
    combat: Const.__EMPTY__,

    // 真人秀
    realShow: Const.__EMPTY__,

    // MV
    mv: Const.__EMPTY__,

    // 微电影
    movie: Const.__EMPTY__
  });

  fetch = {
    config: {
      one: ['carousel', 'best', 'bestArticle']
    },

    // 轮播图
    carousel: () =>
      this.fetchThenSetState('get_carousel_list', 'carousel', {
        imgType: 100
      }),

    // 推荐
    best: () =>
      this.fetchThenSetState('get_video_list-list', 'best', {
        _: {
          search: {
            recomNo: 2 // #todo 推荐组 视频 2
          }
        }
      }),

    bestArticle: () =>
      this.fetchThenSetState('get_bbs_list', 'bestArticle', {
        _: {
          limit: 4,
          search: {
            forumId: articleBlockDS
              .filter(item => typeof item.value === 'string')
              .map(item => item.value)
          }
        }
      }),

    // 教学专题
    tech: () =>
      this.fetchThenSetState('get_video-v2_type_id-list', 'tech', {
        class: 2,
        parId: 25
      }),

    // 本汀产品
    product: () =>
      this.fetchThenSetState('get_video_list-list', 'product', {
        _: {
          search: {
            typeId: Utils.getValue(menuDS, '本汀产品')
          }
        }
      }),

    // 钓鱼实战
    combat: () =>
      this.fetchThenSetState('get_video_list-list', 'combat', {
        _: {
          search: {
            typeId: Utils.getValue(menuDS, '钓鱼实战')
          }
        }
      }),

    // 真人秀
    realShow: () =>
      this.fetchThenSetState('get_video_list-list', 'realShow', {
        _: {
          search: {
            typeId: Utils.getValue(menuDS, '真人秀')
          }
        }
      }),

    // MV
    mv: () =>
      this.fetchThenSetState('get_video_list-list', 'mv', {
        _: {
          search: {
            typeId: Utils.getValue(menuDS, 'MV')
          }
        }
      }),

    // 微电影
    movie: () =>
      this.fetchThenSetState('get_video_list-list', 'movie', {
        _: {
          search: {
            typeId: Utils.getValue(menuDS, '微电影')
          }
        }
      }),

    // 延迟请求
    lazy: {
      tech: () => {
        const { _loaded } = this.getState('tech');

        if (!_loaded) {
          this.fetch.tech();
        }
      },

      product: () => {
        const { _loaded } = this.getState('product');

        if (!_loaded) {
          this.fetch.product();
        }
      },

      combat: () => {
        const { _loaded } = this.getState('combat');

        if (!_loaded) {
          this.fetch.combat();
        }
      },

      realShow: () => {
        const { _loaded } = this.getState('realShow');

        if (!_loaded) {
          this.fetch.realShow();
        }
      },

      mv: () => {
        const { _loaded } = this.getState('mv');

        if (!_loaded) {
          this.fetch.mv();
        }
      },

      movie: () => {
        const { _loaded } = this.getState('movie');

        if (!_loaded) {
          this.fetch.movie();
        }
      }
    }
  };

  page = {
    menuClick: index => {
      const { activeIndex } = this.getState('_menu');

      if (index === activeIndex) {
        return;
      }

      this.setState(
        {
          activeIndex: index
        },
        '_menu'
      );
    }
  };
}
