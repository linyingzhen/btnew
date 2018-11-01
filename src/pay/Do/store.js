/**
 * const prefixCls = 'style-818139';
 * const images = '/static/images/src/pay/Do';
 * @Author: czy0729
 * @Date: 2018-09-17 12:17:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-17 14:49:15
 * @Path m.benting.com.cn /src/pay/Do/store.js
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
    state: {
      payType: ''
    },

    // 账号余额
    walletInfo: G.toJS('walletInfo')
  });

  fetch = {
    config: {
      every: ['walletInfo']
    },

    // 钱包信息
    walletInfo: async () => {
      const res = G.fetchWalletInfo();

      this.setState(await res, 'walletInfo');

      return res;
    }
  };

  do = {
    charge: async values => {
      const { payType } = this.getState();
      const returnUrl = `${window.location.origin}/pay/result`;

      if (payType === 'alipay') {
        // 支付宝
        const url = Api.getRequestUrl('get_pay_charge', {
          price: values.price,
          payPort: 1,
          returnUrl
        });

        window.location = url;
      } else if (Const.__WX__) {
        // 微信
        const data = await Api.PP('get_pay_charge', {
          price: values.price,
          payPort: 3,
          returnUrl
        });

        if (data.code == 0) {
          Utils.wxPay(data.data, () => {
            Utils.router.replace(
              `/pay/result?id=${data.data.orderNo}`,
              `/pay/result/${data.data.orderNo}`
            );
          });
        }
      } else {
        // 微信H5
        const data = await Api.P('get_pay_charge', {
          price: values.price,
          payPort: 4,
          returnUrl
        });

        if (data.mweb_url) {
          window.location = data.mweb_url;
        }
      }
    }
  };

  page = {
    changeType: payType =>
      this.setState({
        payType
      })
  };
}
