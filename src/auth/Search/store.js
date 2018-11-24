/**
 * const prefixCls = 'style-151196';
 * const images = '/static/images/src/auth/Search';
 * @Author: czy0729
 * @Date: 2018-08-13 14:31:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-05 10:09:20
 * @Path m.benting.com.cn /src/auth/Search/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';

export default class Store extends common {
  @observable
  state = this.initState({});

  do = {
    // 查询
    // search: async value => {
    //   const { codeNo } = value;

    //   if (!/^\d{12}$/.test(codeNo) && !/^[A-Z]{2}\d{12}$/.test(codeNo)) {
    //     Utils.light('防伪码为12位数字，或2位大写字母+12位数字', 3000);
    //     return;
    //   }

    //   // 若有数据，证明是真的防伪码
    //   await Api.P('get_new-code_auth', {
    //     _: {
    //       search: {
    //         codeNo
    //       }
    //     }
    //   });

    //   // 二维码扫描的情况，替换地址
    //   Utils.router[Utils.getQuery('type') === 'scan' ? 'replace' : 'push'](
    //     `/auth/detail?id=${codeNo}`,
    //     `/auth/detail/${codeNo}`
    //   );
    // },

    search: async value => {
      const { codeNo } = value;

      if (!/^\d{12}$/.test(codeNo) && !/^[A-Z]{2}\d{12}$/.test(codeNo)) {
        Utils.light('防伪码为12位数字，或2位大写字母+12位数字', 3000);
        return;
      }

      // 若有数据，证明是真的防伪码
      const data = await Api.PP('get_code_query', {
        _: {
          search: {
            codeNo
          }
        }
      });

      if (data.code !== 0 || data.data.list.length === 0) {
        Utils.light(data.err || '防伪码无效');
        return;
      }

      // 二维码扫描的情况，替换地址
      Utils.router[Utils.getQuery('type') === 'scan' ? 'replace' : 'push'](
        `/auth/detail?id=${codeNo}`,
        `/auth/detail/${codeNo}`
      );
    }
  };

  page = {
    // 扫一扫
    openScan: form => {
      if (Const.__WX__) {
        wx.scanQRCode({
          needResult: 1,
          scanType: ['qrCode'],
          success: res => {
            if (res.errMsg === 'scanQRCode:ok') {
              const { resultStr } = res;

              form.setFieldsValue({
                codeNo: resultStr
              });

              // 设置防伪码后直接查询
              this.do.search(resultStr);
            } else {
              Utils.light('扫描二维码失败，请重新扫描');
            }
          }
        });
      } else {
        Utils.light('抱歉，暂只支持在微信浏览器里使用扫码功能');
      }
    }
  };
}
