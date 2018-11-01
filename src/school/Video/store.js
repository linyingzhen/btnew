/**
 * const prefixCls = 'style-206178';
 * const images = '/static/images/src/school/Video';
 * @Author: czy0729
 * @Date: 2018-09-07 18:07:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-07 18:28:26
 * @Path m.benting.com.cn /src/school/Video/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';

export default class Store extends common {
  @observable
  state = this.initState({
    video: Const.__EMPTY__
  });

  fetch = {
    config: {
      one: ['video']
    },

    video: refresh => {
      const { id } = this.params.params;

      return this.fetchListThenSetState(
        'get_video_list-list',
        'video',
        {
          _: {
            search: {
              typeId: id
            }
          }
        },
        refresh
      );
    }
  };
}
