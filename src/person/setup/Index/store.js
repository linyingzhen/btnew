import { observable } from 'mobx';
import common from '@stores/commonV2';
import Utils from '@utils';
import G from '@stores/g';


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
    logout: () => {
      G.doLogout();
      Utils.router.push('/');
    }
  };

  page = {
  };
}
