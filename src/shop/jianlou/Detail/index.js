/**
 * const prefixCls = 'style-533805';
 * const images = '/static/images/src/shop/jianlou/Detail';
 * @Author: czy0729
 * @Date: 2018-09-23 22:06:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 14:42:12
 * @Path m.benting.com.cn /src/shop/jianlou/Detail/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout, Rule } from '@_';
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
  const { nowTime, beginTime, endTime, perNum, explain, _loaded } = $.getState(
    'detail'
  );
  const tag = getTag(beginTime, endTime, nowTime, perNum);

  return (
    <Layout title="捡漏详情">
      <Carousel />
      <Info tag={tag} />
      {explain && (
        <Rule
          className="mt-d"
          title="说明"
          showNum
          content={explain.split('\n')}
        />
      )}
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
