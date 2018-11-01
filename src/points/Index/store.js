import { observable } from 'mobx';
import common from '@stores/commonV2';

export default class Store extends common {
  @observable state = this.initState({});

  params = {};

  setQuery = {};

  fetch = {
    config: {}
  };
  computed = {};

  do = {};

  page = {};
}
