/**
 * const prefixCls = 'style-234970';
 * const images = '/static/images/src/service/Success';
 * @Author: czy0729
 * @Date: 2018-09-03 18:25:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 17:31:00
 * @Path m.benting.com.cn /src/service/Success/index.js
 */
import React from 'react';
import { Layout } from '@_';
import { Result, Button } from '@components';
import Utils from '@utils';

const Success = () => (
  <Layout title="提交结果" theme="fullTheme">
    <Result
      image="/static/svg/提交成功.svg"
      title="提交成功"
      desc={
        <>
          <span>请耐心等待客服审核，</span>
          <span className="t-primary" onClick={() => Utils.router.push('/')}>
            返回首页
          </span>
        </>
      }
    />
    <div className="tool-wind mt-d">
      <Button
        type="primary"
        onClick={() => Utils.router.push('/person/order')}
      >
        个人订单
      </Button>
      <Button className="mt-32" onClick={Utils.router.back}>
        返回
      </Button>
    </div>
  </Layout>
);

export default Success;
