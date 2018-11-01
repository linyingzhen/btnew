/**
 * const prefixCls = 'style-100141';
 * const images = '/static/images/src/shop/auction/Detail';
 * @Author: czy0729
 * @Date: 2018-09-11 12:21:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 14:36:26
 * @Path m.benting.com.cn /src/shop/auction/Detail/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import Carousel from './_Carousel';
import Info from './_Info';
import Record from './_Record';
import Btn from './_Btn';
import PayConfirm from './_PayConfirm';
import store from './store';

const getTag = (start, end, current, now) => {
  const _start = parseInt(start);
  const _end = parseInt(end);
  const _current = parseInt(current);
  const _now = parseInt(now);

  if (_current <= _start) {
    return '预告中';
  }

  if (!_now || (!!_end && _current > _end)) {
    return '已结束';
  }

  return '进行中';
};

const Detail = (props, { $ }) => {
  const { nowTime, beginTime, endTime, perNum, _loaded } = $.getState('detail');
  const tag = getTag(beginTime, endTime, nowTime, perNum);

  return (
    <Layout title="秒杀详情">
      <Carousel />
      <Info tag={tag} />
      <Record className="mt-d" />
      {_loaded && <Btn tag={tag} />}
      {_loaded && <PayConfirm tag={tag} />}
    </Layout>
  );
};

Detail.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Detail));
