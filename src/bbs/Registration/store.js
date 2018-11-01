/**
 * const prefixCls = 'style-104163';
 * const images = '/static/images/src/bbs/Registration';
 * @Author: czy0729
 * @Date: 2018-10-16 23:53:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 10:01:10
 * @Path m.benting.com.cn /src/bbs/Registration/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';
import G from '@stores/g';

export default class Store extends common {
  @observable
  state = this.initState({
    userInfo: G.toJS('userInfo'),

    // 报名
    registration: {},

    // 银行信息
    bank: {}
  });

  fetch = {
    config: {
      static: ['userInfo'],
      every: ['registration', 'bank']
    },

    // 用户信息
    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    // 报名信息
    registration: async () => {
      const { id } = this.params.params;

      const res = Api.PP('get_registration_detail', {
        thread_id: id
      });
      const data = await res;

      if (data.code === '0') {
        this.setState(data.data, 'registration');
      } else {
        this.setState({}, 'registration');
      }

      return res;
    },

    // 银行信息
    bank: () => this.fetchThenSetState('get_user_bank_info', 'bank')
  };

  do = {
    // 报名
    regist: async values => {
      const { id } = this.params.params;
      const _values = {
        ...values
      };

      const { area } = _values;
      delete _values.area;

      const areas = area.split(',');
      await Api.P('do_registration_register', {
        thread_id: id,
        ..._values,
        province: areas[0],
        city: areas[1],
        county: areas[2]
      });

      await this.do.comment({
        content: '#已报名#',
        commentImg: '',
        threadId: id
      });

      G.setLastPageRefresh();
      Utils.success();
      Utils.router.push('/person/event/registration');
    },

    // 帖子回复
    comment: query =>
      Api.P('do_bbs_posted', {
        ...query,
        type: 2
      }),

    // 提交订单
    submit: async values => {
      const { id } = this.params.params;

      await Api.P('do_registration_submit-order', {
        thread_id: id,
        ...values
      });

      G.setLastPageRefresh();
      Utils.success();
      Utils.router.back();
    },

    // 重新提交订单
    update: async values => {
      const { id } = this.params.params;

      await Api.P('do_registration_submit-order', {
        thread_id: id,
        ...values
      });

      G.setLastPageRefresh();
      Utils.success();
      Utils.router.back();
    }
  };
}
