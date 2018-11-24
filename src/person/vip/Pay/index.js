/**
 * const prefixCls = 'style-120835';
 * const images = '/static/images/src/person/vip/Pay';
 * @Author: czy0729
 * @Date: 2018-10-17 17:46:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-02 10:47:23
 * @Path m.benting.com.cn /src/person/vip/Pay/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer, injectV2 } from '@';
import { Button, Flex } from '@components';
import { Layout, Avatar } from '@_';
import Utils from '@utils';
import Styles from '@styles';
import PayConfirm from './_PayConfirm';
import store from './store';

const Pay = (props, { $ }) => {
  const { faceImg, niname = '-', vip, userId } = $.getState('userInfo');
  const { endTime, _loaded } = $.getState('vipInfo');

  // 购买的vip时间
  const buyType = 365 * 24 * 60 * 60 * 1000;

  let startTimestamp = 0;
  let endTimestamp = 0;
  if (vip > 0) {
    // 是vip时显示到期时间和续费一年的时间
    startTimestamp = endTime;
    endTimestamp = Math.floor(
      new Date(endTime * 1000 + buyType).valueOf() / 1000
    );
  } else {
    // 非vip时显示当前时间和续费一年的时间
    startTimestamp = Math.floor(new Date().valueOf() / 1000);
    endTimestamp = Math.floor(
      new Date(new Date().valueOf() + buyType).valueOf() / 1000
    );
  }

  const _startTime = Utils.date('Y年m月d日', startTimestamp);
  const _endTime = Utils.date('Y年m月d日', endTimestamp);

  return (
    <Layout
      title="开通会员"
      headerStyle={{
        background: Styles.color_main,
        color: Styles.color_void
      }}
    >
      <div className="top">
        <Flex>
          <Avatar userId={userId} img={faceImg} vip={vip} />
          <Flex.Item>
            <p className="t-28 l-40 t-void">{niname}</p>
            <p className="t-28 l-40 t-icon">开通会员，乐享缤纷。</p>
          </Flex.Item>
        </Flex>
      </div>
      <div className="center">
        <p className="t-36 l-50 t-b t-c">12个月</p>
        <p className="t-gold t-b t-c mt-24">
          <span className="t-40 l-56 t-b">￥</span>
          <span style={{ fontSize: '0.96rem' }}>240.00</span>
        </p>
        <p className="t-32 l-48 t-sub t-c mt-16">
          {_loaded ? `${_startTime} - ${_endTime}` : ''}
        </p>
      </div>
      <div className="p-w mt-md">
        <Button type="main" onClick={$.do.doBuyVip}>
          {vip === 0 ? '开通' : '续费'}
        </Button>
      </div>
      <PayConfirm />

      <style jsx>{`
        .style-120835 {
        }
        .top {
          position: relative;
          padding: 0.16rem 0.56rem 0.8rem;
          background: ${Styles.color_main};
        }
        .top:before {
          content: '';
          display: block;
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 110%;
          height: 1.08rem;
          background: ${Styles.color_main};
          border-radius: 0 0 50% 50%;
          box-shadow: 0.08rem 0.08rem 0.16rem rgba(0, 0, 0, 0.08);
          transform: translate(-50%, 100%);
        }
        .center {
          padding: 0.56rem 0 0.48rem;
          margin: 0 ${Styles.wind};
          background: #fffcf6;
          border: 0.01rem solid ${Styles.color_gold};
          border-radius: 0.08rem;
          transform: translate3d(0, -0.48rem, 0);
        }
      `}</style>
    </Layout>
  );
};

Pay.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Pay));
