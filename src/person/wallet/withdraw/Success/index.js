/**
 * const prefixCls = 'style-183434';
 * const images = '/static/images/src/person/wallet/withdraw/Success';
 * @Author: czy0729
 * @Date: 2018-09-14 14:34:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-17 15:34:00
 * @Path m.benting.com.cn /src/person/wallet/withdraw/Success/index.js
 */
import React from 'react';
import { Layout } from '@_';
import { Result, Button } from '@components';
import Utils from '@utils';

const Success = () => (
  <Layout title="提现成功" theme="fullTheme" bd={null}>
    <Result
      image="/static/svg/成功.svg"
      title="申请提现成功"
      desc={
        <>
          <span>我们将会尽快处理。</span>
          <span className="t-primary" onClick={() => Utils.router.push('/')}>
            返回首页
          </span>
        </>
      }
    />
    <div className="tool-wind mt-d">
      <Button
        type="primary"
        onClick={() => Utils.router.push('/person/wallet')}
      >
        返回我的钱包
      </Button>
    </div>
  </Layout>
);

export default Success;
