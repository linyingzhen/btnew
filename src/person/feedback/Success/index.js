/**
 * const prefixCls = 'style-610797';
 * const images = '/static/images/src/person/feedback/Success';
 * @Author: czy0729
 * @Date: 2018-09-08 18:16:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 18:30:15
 * @Path m.benting.com.cn /src/person/feedback/Success/index.js
 */
import React from 'react';
import { Layout } from '@_';
import { Result, Button } from '@components';
import Utils from '@utils';

const Success = () => (
  <Layout title="提交结果" theme="fullTheme" bd={null}>
    <Result
      image="/static/svg/提交成功.svg"
      title="提交成功"
      desc={
        <>
          <span>感谢您的反馈，我们将会尽快处理。</span>
          <span className="t-primary" onClick={() => Utils.router.push('/')}>
            返回首页
          </span>
        </>
      }
    />
    <div className="tool-wind mt-d">
      <Button
        type="primary"
        onClick={() => Utils.router.push('/person/feedback')}
      >
        我的反馈
      </Button>
    </div>
  </Layout>
);

export default Success;
