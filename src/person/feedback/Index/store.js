/**
 * const prefixCls = 'style-161724';
 * const images = '/static/images/src/person/feedback/Index';
 * @Author: czy0729
 * @Date: 2018-09-10 10:24:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-10 14:13:28
 * @Path m.benting.com.cn /src/person/feedback/Index/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';

export default class Store extends common {
  @observable
  state = this.initState({
    feedback: Const.__EMPTY__
  });

  fetch = {
    config: {
      update: ['feedback']
    },

    feedback: () => this.fetchThenSetState('get_feedback_list', 'feedback')
  };
}
