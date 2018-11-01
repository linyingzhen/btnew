/**
 * const prefixCls = 'style-122342';
 * const images = '/static/images/src/person/setup/Infor';
 * @Author: czy0729
 * @Date: 2018-10-23 13:32:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 13:34:21
 * @Path bt_mb_new /src/person/setup/Infor/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';
import G from '@stores/g';

export default class Store extends common {
  @observable
  state = this.initState({
    userInfo: G.toJS('userInfo')
  });

  fetch = {
    config: {
      static: ['userInfo']
    },

    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    }
  };

  do = {
    update: async values => {
      const { niname, birDay } = this.getState('userInfo');
      const _values = { ...values };

      if (_values.birDay) {
        const d = new Date(_values.birDay);
        let fullMonth = d.getMonth() + 1;
        let fullday = d.getDate();
        fullMonth = fullMonth < 10 ? `0${fullMonth}` : fullMonth;
        fullday = fullday < 10 ? `0${fullday}` : fullday;
        _values.birDay = `${d.getFullYear()}-${fullMonth}-${fullday}`;
      }

      if (_values.niname === niname) {
        delete _values.niname;
      }

      if (_values.birDay === birDay) {
        delete _values.birDay;
      }

      [
        _values.userProvince,
        _values.userCity,
        _values.userDistrict
      ] = _values.userCity.split(',');

      await Api.P('do_user_info_update', _values);
      await G.fetchUserInfo();

      Utils.light();
      Utils.router.back();
    }
  };
}
