/**
 * const prefixCls = 'style-208964';
 * const images = '/static/images/src/shop/jianlou/Detail';
 * @Author: czy0729
 * @Date: 2018-09-23 22:23:29
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-09-23 22:23:29
 * @Path m.benting.com.cn /src/shop/jianlou/Detail/_Btn.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Button } from '@components';
import Utils from '@utils';

const _Btn = (props, { $ }) => {
  const { tag } = props;
  const { perNum } = $.getState('detail');

  if (tag === '预告中') {
    return (
      <div className="tool-fixed">
        <Button type="primary">未开始</Button>
      </div>
    );
  }

  if (tag === '进行中') {
    return (
      <div className="tool-fixed">
        <Button
          type="primary"
          onClick={() => Utils.checkLogin($.page.showPayConfirm)}
        >
          立即捡漏
        </Button>
      </div>
    );
  }

  return (
    <div className="tool-fixed">
      <Button type="primary">{perNum == 0 ? '已抢光' : '已结束'}</Button>
    </div>
  );
};

_Btn.contextTypes = {
  $: PropTypes.object
};

export default observer(_Btn);
