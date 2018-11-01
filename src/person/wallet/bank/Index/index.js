/**
 * const prefixCls = 'style-816029';
 * const images = '/static/images/src/person/wallet/bank/Index';
 * @Author: czy0729
 * @Date: 2018-09-13 16:05:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-13 18:54:57
 * @Path m.benting.com.cn /src/person/wallet/bank/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import Styles from '@styles';
import Card from './_Card';
import Add from './_Add';
import store from './store';

const prefixCls = 'style-816029';

@injectV2(store)
@observer
export default class Bank extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  render() {
    const { $ } = this.context;
    const { bankName, _loaded } = $.getState('bank');

    if (!_loaded) {
      return null;
    }

    return (
      <Layout title="我的银行卡" bd={null} theme="fullTheme">
        <div className={prefixCls}>
          <p className="t-48 l-66 t-b">我的银行卡</p>
          {bankName ? <Card className="mt-64" /> : <Add className="mt-64" />}
        </div>
        <style jsx>{`
          .style-816029 {
            padding: ${Styles.space} ${Styles.wind};
          }
        `}</style>
      </Layout>
    );
  }
}
