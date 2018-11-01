/**
 * const prefixCls = 'style-907703';
 * const images = '/static/images';
 * @Author: cwz0525
 * @Date: 2018-08-28 09:25:59
 * @Last Modified by: cwz0525
 * @Last Modified time: 2018-08-28 09:28:10
 * @Path newProject \src\person\share\record\store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';

export default class Store extends common {
  @observable
  state = this.initState({});

  params = {};

  setQuery = {};

  fetch = {
    config: {}
  };
  computed = {};

  do = {};

  page = {};
}
