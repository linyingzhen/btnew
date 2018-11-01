/**
 * const prefixCls = 'style-199793';
 * const images = '/static/images';
 * @Author: cwz0525
 * @Date: 2018-08-22 14:34:38
 * @Last Modified by:   cwz0525
 * @Last Modified time: 2018-08-22 14:34:38
 * @Path newProject \src\person\about\Index\store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';

export default class Store extends common {
  @observable
  state = this.initState({
  });

  params = {
  };

  setQuery = {
  };

  fetch = {
    config: {
    }
  };
  computed = {
  };

  do = {
  };

  page = {
  };
}
