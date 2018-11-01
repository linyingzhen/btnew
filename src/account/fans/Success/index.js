/**
 * const prefixCls = 'style-143780';
 * const images = '/static/images/src/account/fans/Success';
 * @Author: czy0729
 * @Date: 2018-10-07 18:36:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-07 18:50:58
 * @Path m.benting.com.cn /src/account/fans/Success/index.js
 */
import React from 'react';
import { Layout } from '@_';
import { Result, Button } from '@components';
import Utils from '@utils';

const Success = () => (
  <Layout title="粉丝认证" theme="fullTheme" bd={null}>
    <Result
      image="/static/svg/等待.svg"
      title="提交成功"
      desc={
        <>
          <span>请耐心等待审核，</span>
          <span className="t-primary" onClick={() => Utils.router.push('/')}>
            返回首页
          </span>
        </>
      }
    />
    <div className="tool-wind mt-d">
      <Button type="primary" onClick={Utils.router.back}>
        返回
      </Button>
    </div>
  </Layout>
);

export default Success;
