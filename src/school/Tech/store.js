/**
 * const prefixCls = 'style-818082';
 * const images = '/static/images/src/school/Tech';
 * @Author: czy0729
 * @Date: 2018-09-06 12:14:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-06 14:26:21
 * @Path m.benting.com.cn /src/school/Tech/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';

export default class Store extends common {
  @observable
  state = this.initState({
    detail: {},

    video: Const.__EMPTY__
  });

  fetch = {
    config: {
      one: ['detail', 'video']
    },

    detail: async () => {
      const { id } = this.params.params;

      const res = this.fetchThenSetState('get_video-v2_type_id-list', 'tech', {
        tbId: id
      });

      const data = await res;
      if (data && data.list && data.list.length) {
        this.setState(data.list[0], 'detail');
      }

      return res;
    },

    video: () => {
      const { id } = this.params.params;

      return this.fetchThenSetState('get_video_list-list', 'video', {
        _: {
          search: {
            typeId: id
          }
        }
      });
    }
  };
}
