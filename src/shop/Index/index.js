/**
 * const prefixCls = 'style-862318';
 * const images = '/static/images/src/shop/Index';
 * @Author: czy0729
 * @Date: 2018-09-28 17:59:24
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-01 11:17:13
 * @Path m.benting.com.cn /src/shop/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Lazy } from '@components';
import { Layout } from '@_';
import Utils from '@utils';
import Header from './_Header';
import Carousel from './_Carousel';
import New from './_New';
import Block from './_Block';
import Searchbox from '../_/Searchbox';
import store from './store';
import { categoryDS } from './ds';

const prefixCls = 'style-862318';
const yuganId = Utils.getValue(categoryDS, '鱼竿');
const yuxianId = Utils.getValue(categoryDS, '鱼线');
const yupiaoId = Utils.getValue(categoryDS, '鱼漂');
const yuerId = Utils.getValue(categoryDS, '鱼饵');
const zhuangbeiId = Utils.getValue(categoryDS, '装备');
const peijianId = Utils.getValue(categoryDS, '配件');
const fushiId = Utils.getValue(categoryDS, '服饰');

const Shop = (props, { $ }) => (
  <Layout className={prefixCls} title="商城" header={<Header />}>
    <Searchbox />
    <Carousel />
    <New className="mt-d" />
    <Block
      className="mt-d"
      title="鱼竿区"
      data={$.getState('yugan')}
      href={`/shop/category?id=${yuganId}`}
      as={`/shop/category/${yuganId}`}
    />
    <Lazy onDidMount={$.fetch.lazy.yuxian}>
      <Block
        className="mt-d"
        title="鱼线区"
        data={$.getState('yuxian')}
        href={`/shop/category?id=${yuxianId}`}
        as={`/shop/category/${yuxianId}`}
      />
    </Lazy>
    <Lazy onDidMount={$.fetch.lazy.yupiao}>
      <Block
        className="mt-d"
        title="鱼漂区"
        data={$.getState('yupiao')}
        href={`/shop/category?id=${yupiaoId}`}
        as={`/shop/category/${yupiaoId}`}
      />
    </Lazy>
    <Lazy onDidMount={$.fetch.lazy.yuer}>
      <Block
        className="mt-d"
        title="鱼饵区"
        data={$.getState('yuer')}
        href={`/shop/category?id=${yuerId}`}
        as={`/shop/category/${yuerId}`}
      />
    </Lazy>
    <Lazy onDidMount={$.fetch.lazy.zhuangbei}>
      <Block
        className="mt-d"
        title="装备区"
        data={$.getState('zhuangbei')}
        href={`/shop/category?id=${zhuangbeiId}`}
        as={`/shop/category/${zhuangbeiId}`}
      />
    </Lazy>
    <Lazy onDidMount={$.fetch.lazy.peijian}>
      <Block
        className="mt-d"
        title="配件区"
        data={$.getState('peijian')}
        href={`/shop/category?id=${peijianId}`}
        as={`/shop/category/${peijianId}`}
      />
    </Lazy>
    <Lazy onDidMount={$.fetch.lazy.fushi}>
      <Block
        className="mt-d"
        title="服饰区"
        data={$.getState('fushi')}
        href={`/shop/category?id=${fushiId}`}
        as={`/shop/category/${fushiId}`}
      />
    </Lazy>

    <style jsx global>{`
      .style-862318 {
        padding-top: 1.08rem;
      }
    `}</style>
  </Layout>
);

Shop.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Shop));
