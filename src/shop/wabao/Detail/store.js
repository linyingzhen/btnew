/**
 * const prefixCls = 'style-168254';
 * const images = '/static/images/src/shop/guess/Detail';
 * @Author: czy0729
 * @Date: 2018-09-25 15:52:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-15 15:54:29
 * @Path m.benting.com.cn /src/shop/guess/Detail/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';
import Utils from '@utils';
import G from '@stores/g';
import Api from '@api';
import { filter } from './ds';

export default class Store extends common {
  @observable
  state = this.initState({
    _payConfirm: {
      show: false,
      value: '' // 储存参与次数
    },

    _imgView: {
      show: false,
      index: 0
    },

    state: {
      tempCount: 0
    },

    userInfo: G.toJS('userInfo'),

    detail: {},

    record: Const.__EMPTY__
  });

  fetch = {
    config: {
      static: ['userInfo'],
      one: ['detail'],
      update: ['record']
    },

    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    detail: async () => {
      const { id } = this.params.params;

      return this.fetchThenSetState('get_indiana_info', 'detail', {
        oncebuyId: id,
        _filter: filter.detail
      });
    },

    record: refresh => {
      const { id } = this.params.params;

      return this.fetchListThenSetState(
        'get_indiana_list',
        'record',
        {
          _: {
            search: {
              oncebuyId: id,
              buyState: [1, 4]
            }
          },
          _filter: filter.record
        },
        refresh,
        'createTime'
      );
    }
  };

  computed = {
    isEnd: () => {
      const { state, endTime, _loaded } = this.getState('detail');

      if (!_loaded) {
        return true;
      }

      // 3 揭奖中
      return parseInt(state) >= 3 || Utils.getTimestamp() > endTime;
    }
  };

  do = {
    wabao: async () => {
      const { id } = this.params.params;
      const { value } = this.getState('_payConfirm');

      await Api.P('do_indiana', {
        buypernum: value,
        oncebuyId: id
      });

      Utils.light('参与成功');
      this.page.hidePayConfirm();
      this.page.setTempCount(value);
      this.fetch.detail();
      this.fetch.record(true);
    }
  };

  page = {
    showImgView: () =>
      this.setState(
        {
          show: true
        },
        '_imgView'
      ),

    hideImgView: () =>
      this.setState(
        {
          show: false
        },
        '_imgView'
      ),

    showPayConfirm: value => {
      this.setState(
        {
          show: true,
          value
        },
        '_payConfirm'
      );
    },

    hidePayConfirm: () =>
      this.setState(
        {
          show: false,
          value: ''
        },
        '_payConfirm'
      ),

    // 记住之前参与过多少次, 改善一下挖宝体验
    setTempCount: count => {
      const { tempCount } = this.getState();

      this.setState({
        tempCount: tempCount + count
      });
    },

    // 倒计时结束回调
    onEnd: () => {
      setTimeout(() => {
        this.fetch.detail();
      }, 2000);
    }
  };
}
