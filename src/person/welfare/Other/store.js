/**
 * const prefixCls = 'style-654214';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-12 14:17:06
 * @Last Modified by:   lyz0720
 * @Last Modified time: 2018-11-12 14:17:06
 * @Path bt_mb_new \src\person\welfare\Other\store.js.git
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';

export default class Store extends common {
  @observable
  state = this.initState({
    state: {
      show1: false,
      show2: false,
      show3: false
    }
  });
}
