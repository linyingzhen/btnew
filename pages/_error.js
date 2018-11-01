/**
 * const prefixCls = 'styles-21046899';
 * const images = '/static/images/pages';
 * @Author: Jack
 * @Date:   2018-05-07 10:56:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-31 10:54:39
 * @Path btWap \pages\_error.js
 */
import React from 'react';
import { Result, Form } from '@components';
import { Layout } from '@_';
import Utils from '@utils';

const _Error = () => (
  <Layout title="发生错误" bd={null} theme="fullTheme">
    <Result
      image="/static/svg/404.svg"
      title="发生错误"
      desc="您要找的页面钓鱼去了"
    />
    <Form.Button onClick={() => Utils.router.push('/')}>返回首页</Form.Button>
  </Layout>
);

export default _Error;
