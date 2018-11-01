/**
 * const prefixCls = 'style-168254';
 * const images = '/static/images/src/shop/guess/Detail';
 * @Author: czy0729
 * @Date: 2018-09-25 15:52:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 10:38:48
 * @Path m.benting.com.cn /src/shop/guess/Detail/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import G from '@stores/g';

export default class Store extends common {
  @observable
  state = this.initState({
    _payConfirm: {
      show: false,
      value: '' // 存放竞猜重量
    },

    _imgView: {
      show: false,
      index: 0
    },

    state: {
      isMy: false
    },

    userInfo: G.toJS('userInfo'),

    detail: {},

    record: Const.__EMPTY__,

    winner: Const.__EMPTY__
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

      const res = this.fetchThenSetState(
        'get_new_guess-everday_detail',
        'detail',
        {
          guessId: id
        }
      );

      await res;

      if (this.isEnd) {
        this.fetch.winner(true);
      }

      return res;
    },

    record: refresh => {
      const { id } = this.params.params;
      const { isMy } = this.getState();

      let query;
      if (isMy) {
        const { userId } = this.getState('userInfo');

        query = {
          guessId: id,
          _: {
            search: {
              userId
            }
          }
        };
      } else {
        query = {
          guessId: id
        };
      }

      return this.fetchListThenSetState(
        'get_guss-everday_guessing-list',
        'record',
        query,
        refresh,
        'createTime'
      );
    },

    winner: refresh => {
      const { id } = this.params.params;

      return this.fetchListThenSetState(
        'get_guss-everday_guessing-list',
        'winner',
        {
          guessId: id,
          _: {
            limit: Const.__LIMIT__,
            order: {
              createTime: 'asc'
            },
            search: {
              state: 2
            }
          }
        },
        refresh
      );
    },

    time: () => this.fetchThenSetState('get_time', 'time')
  };

  computed = {
    isEnd: () => {
      const { endTime, _loaded } = this.getState('detail');

      if (!_loaded) {
        return true;
      }

      return Utils.getTimestamp() > endTime;
    }
  };

  do = {
    guess: async () => {
      const { id } = this.params.params;
      const { value } = this.getState('_payConfirm');

      await Api.P('do_guess-everday_guessing', {
        guessId: id,
        information: value
      });

      Utils.light('竞猜成功');
      this.page.hidePayConfirm();
      this.fetch.record(true);
    }
  };

  page = {
    showImgView: index =>
      this.setState(
        {
          show: true,
          index
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
      if (!/^\d+(?:\.\d{1})?$/.test(value)) {
        Utils.light('输入重量格式错误');
        return;
      }

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

    // 跟猜
    guess: (value = '') =>
      Utils.onPrompt(
        '欢乐猜鱼',
        this.page.showPayConfirm,
        value,
        '输入您要猜的重量'
      ),

    // 切换我的记录列表
    switchGuessList: () => {
      const { isMy } = this.getState();

      this.setState({
        isMy: !isMy
      });

      this.fetch.record(true);
    },

    // 倒计时结束回调
    onEnd: () => {
      setTimeout(() => {
        this.fetch.detail();
      }, 2000);
    }
  };
}
