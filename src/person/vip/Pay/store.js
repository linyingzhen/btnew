/**
 * const prefixCls = 'style-665521';
 * const images = '/static/images/src/person/vip/Pay';
 * @Author: czy0729
 * @Date: 2018-10-17 22:59:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-02 10:43:40
 * @Path m.benting.com.cn /src/person/vip/Pay/store.js
 */
import React from 'react';
import { observable } from 'mobx';
import common from '@stores/commonV2';
import G from '@stores/g';
import Api from '@api';
import Utils from '@utils';
import UI from '@stores/ui';
import { images } from './ds';

export default class store extends common {
  @observable
  state = this.initState({
    _payConfirm: {
      show: false,
      type: '',
      amount: 0
    },

    userInfo: G.toJS('userInfo'),
    oneInfo: {},
    vipInfo: {},
    vipGoods: {}
  });

  fetch = {
    config: {
      static: ['userInfo'],
      update: ['vipGoods', 'vipInfo']
    },

    userInfo: async () => {
      const res = G.fetchUserInfo();
      this.setState(await res, 'userInfo');
      return res;
    },

    vipInfo: () => this.fetchThenSetState('get_my_vip', 'vipInfo'),

    vipGoods: async () => {
      const date = await this.fetchListThenSetState(
        'get_shop_goods-list',
        'vipGoods',
        {
          goodsType: 10
        }
      );

      const { list } = this.getState('vipGoods');
      // 从vip信息列表提取年卡信息
      list.map(elem => {
        if (elem.iTypeName == 'year') {
          this.setState(elem, 'oneInfo');
        }
        return true;
      });
      return date;
    }
  };

  do = {
    pay: async () => {
      const { orderId, payType } = this.getState('_payConfirm');
      const { vip } = this.getState('userInfo');

      await Api.P('do_wx_pay', {
        orderId,
        payType
      });

      this.page.hidePayConfirm();
      this.fetch.vipInfo();

      UI.showMask({
        children: (
          <img
            src={`${images}/paysucess.png`}
            style={{
              width: '5.94rem',
              height: '4.22rem'
            }}
            onClick={() => {
              UI.hideMask();
              Utils.onConfirm(
                `${
                  vip === 0 ? '开通成功' : '续费成功'
                } ，需要重新登录才能刷新VIP信息，前往登录?`,
                () => Utils.router.push('/login')
              );
            }}
            alt=""
          />
        )
      });
    },

    // 购买vip
    doBuyVip: async () => {
      const { gid } = this.getState('oneInfo');
      const buyInfo = await Api.PP('do_buy_vip', {
        gid,
        num: 1
      });

      const {
        userAmount,
        orderAmount,
        orderType,
        payAmount,
        payType,
        orderNo,
        orderId
      } = buyInfo.data;

      this.setState(
        {
          show: true,
          orderAmount,
          orderId,
          orderNo,
          orderType,
          amount: payAmount,
          payType,
          userAmount
        },
        '_payConfirm'
      );
    }
  };

  page = {
    showPayConfirm: () =>
      this.setState(
        {
          show: true
        },
        '_payConfirm'
      ),

    hidePayConfirm: () =>
      this.setState(
        {
          amount: 0,
          type: '',
          show: false
        },
        '_payConfirm'
      )
  };
}
