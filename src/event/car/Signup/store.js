/**
 * const prefixCls = 'style-985819';
 * const images = '/static/images/src/event/car/Signup';
 * @Author: czy0729
 * @Date: 2018-11-08 17:46:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-21 12:12:25
 * @Path bt_mb_new /src/event/car/Signup/store.js.git
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';
import G from '@stores/g';
import { tid } from '../ds';

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
    signup: async values => {
      const { id = tid } = this.params.params;

      await Api.P('do_event-car_sign-up', {
        ...values,
        tid: id
      });

      Utils.router.push(
        `/event/car/success?id=${id}`,
        `/event/car/success/${id}`
      );
    }
  };
}
