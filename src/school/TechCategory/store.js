/**
 * const prefixCls = 'style-538114';
 * const images = '/static/images/src/school/TechCategory';
 * @Author: czy0729
 * @Date: 2018-09-07 16:56:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-07 16:58:15
 * @Path m.benting.com.cn /src/school/TechCategory/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';

export default class Store extends common {
  @observable
  state = this.initState({
    // 教学专题
    tech: Const.__EMPTY__
  });

  fetch = {
    config: {
      one: ['tech']
    },

    // 教学专题
    tech: () =>
      this.fetchThenSetState('get_video-v2_type_id-list', 'tech', {
        class: 2,
        parId: 25
      })
  };
}
