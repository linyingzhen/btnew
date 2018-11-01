/**
 * const prefixCls = 'style-209664';
 * const images = '/static/images/src/event/cashback/Index';
 * @Author: czy0729
 * @Date: 2018-10-15 16:33:16
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-10-15 16:33:16
 * @Path m.benting.com.cn /src/event/cashback/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import { Page, WaterMark } from '@components';
import Const from '@const';
import Counter from './_Counter';
import Content from './_Content';
import Btn from './_Btn';
import Progress from './_Progress';
import store from './store';
import { images } from './ds';

const prefixCls = 'style-209664';

const Cashback = (props, { $ }) => {
  if (!Const.__CLIENT__) {
    return null;
  }

  const { niname, _loaded: _loadedUserInfo } = $.getState('userInfo');
  const { acNaem, _loaded: _loadedEventDetail } = $.getState('eventDetail');
  const { _loaded: _loadedProgress } = $.getState('progress');
  const { _loaded: _loadedTime } = $.getState('time');

  if (
    !_loadedUserInfo ||
    !_loadedEventDetail ||
    !_loadedProgress ||
    !_loadedTime
  ) {
    return null;
  }

  return (
    <Layout className={prefixCls} title="粉丝福利" hide theme="fullTheme">
      <Page className={`${prefixCls}__page`}>
        <WaterMark
          text={[
            {
              text: '粉丝专属福利活动，禁止外传！',
              style: {
                'font-size': '40px',
                x: '40px',
                y: '200px',
                opacity: '0.32',
                fill: '#fff'
              }
            },
            {
              text: niname,
              style: {
                'font-size': '40px',
                x: '42px',
                y: '250px',
                opacity: '0.32',
                fill: '#fff'
              }
            }
          ]}
          style={{
            width: '720px',
            height: '480px'
          }}
        >
          <p className="p-title t-56 t-c">{acNaem}</p>
          <img className="img-bottom" src={`${images}/30.jpg`} alt="" />
          <Counter />
          <Content />
          <Btn />
          <Progress />
        </WaterMark>
      </Page>

      <style jsx global>{`
        .style-209664 {
        }
        .${prefixCls}__page {
          position: relative;
          min-height: 100vh;
          padding-bottom: 4rem;
          background-color: #f86544;
          background-image: url('${images}/01.jpg');
          background-repeat: no-repeat;
          background-size: 100%;
          overflow-x: hidden;
        }
      `}</style>
      <style jsx>{`
        .style-209664 {
        }
        .p-title {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          margin-top: 38.4%;
          color: #fffbda;
          text-shadow: 0.02rem 0.06rem 0.04rem rgba(0, 0, 0, 0.16);
        }
        .img-bottom {
          position: absolute;
          z-index: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          margin-bottom: -0.02rem;
        }
      `}</style>
    </Layout>
  );
};

Cashback.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Cashback));
