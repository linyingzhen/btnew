/**
 * const prefixCls = 'style-106679';
 * const images = '/static/images/src/auth/Index';
 * @Author: czy0729
 * @Date: 2018-08-12 18:00:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-29 11:07:27
 * @Path m.benting.com.cn /src/auth/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Result, Button } from '@components';
import { Layout } from '@_';
import Utils from '@utils';
import Styles from '@styles';
import store from './store';

const prefixCls = 'style-106679';

@injectV2(store)
@observer
export default class Auth extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  render() {
    return (
      <Layout title="防伪中心" theme="fullTheme">
        <Result image="/static/svg/扫描二维码.svg" title="本汀防伪认证中心" />
        <div className="tool-wind mt-d">
          <Button
            type="danger"
            onClick={() =>
              Utils.checkLogin(() => Utils.router.push('/auth/search'))
            }
          >
            手动输入
          </Button>
          <div onClick={() => Utils.light('开发中，敬请期待')}>
            <Button
              className="mt-32"
              type="main"
              ghost
              // onClick={() =>
              //   Utils.checkLogin(() =>
              //     Utils.router.push('/auth/search?type=scan'))
              // }
              disabled
            >
              扫一扫
            </Button>
          </div>
        </div>

        <style jsx global>{`
          .style-106679 {
          }
          .${prefixCls}__link {
            border-bottom: 0.01rem solid ${Styles.color_desc};
          }
        `}</style>
        <style jsx>{`
          .style-106679 {
          }
          .img-thumb {
            width: 4rem;
          }
        `}</style>
      </Layout>
    );
  }
}
