/**
 * const prefixCls = 'style-158258';
 * const images = '/static/images/src/bbs/floor/Index';
 * @Author: czy0729
 * @Date: 2018-09-04 14:45:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-27 14:39:27
 * @Path m.benting.com.cn /src/bbs/floor/Index/store.js
 */
import React from 'react';
import { injectV2 } from '@';
import { Button } from '@components';
import { Layout } from '@_';
import Utils from '@utils';
import Post from './_Post';
import store from './store';

const Floor = () => (
  <Layout
    title="欢乐踩楼"
    ft={
      <Button
        type="main"
        size="sm"
        inline
        radius
        onClick={() =>
          Utils.checkLogin(() => Utils.router.push('/person/event/floor'))
        }
      >
        我的踩楼
      </Button>
    }
  >
    <Post className="mt-d" />
  </Layout>
);

export default injectV2(store)(Floor);
