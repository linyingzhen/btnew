/**
 * const prefixCls = 'style-152036';
 * const images = '/static/images/src/event/Index';
 * @Author: czy0729
 * @Date: 2018-10-07 09:21:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-15 11:33:46
 * @Path m.benting.com.cn /src/event/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import { Result, Button, WaterMark } from '@components';
import Const from '@const';
import Utils from '@utils';
import Row from './_Row';
import store from './store';

const Event = (props, { $ }) => {
  if (!Const.__CLIENT__) {
    return null;
  }

  const { niname, _loaded: userInfoLoaded } = $.getState('userInfo');
  const { authType, _loaded: fansLoaded } = $.getState('fansAuth');
  const { list, _loaded: eventLoaded } = $.getState('event');

  if (!userInfoLoaded || !fansLoaded || !eventLoaded) {
    return null;
  }

  const isFans = parseInt(authType) > 0;

  return (
    <Layout
      title="粉丝福利"
      theme="fullTheme"
      ft={
        <Button
          type="main"
          size="sm"
          inline
          radius
          onClick={() =>
            Utils.checkLogin(() => Utils.router.push('/person/event/cashback'))
          }
        >
          我的活动
        </Button>
      }
    >
      {isFans ? (
        !list.length ? (
          <Result
            image="/static/svg/暂无活动.svg"
            title="暂无活动"
            desc="敬请关注"
          />
        ) : (
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
            <div className="p-w">
              {list.map(item => (
                <Row key={item.tbId} className="mt-md" {...item} />
              ))}
            </div>
          </WaterMark>
        )
      ) : (
        <>
          <Result
            image="/static/svg/404.svg"
            title="未进行粉丝认证"
            desc="认证后方可查看所有活动"
          />
          <div className="tool-wind mt-d">
            <Button
              type="primary"
              onClick={() => Utils.router.push(Const.__ROUTER__.fans)}
            >
              前往认证
            </Button>
          </div>
        </>
      )}
    </Layout>
  );
};

Event.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Event));
