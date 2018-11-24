/**
 * const prefixCls = 'style-148543';
 * const images = '/static/images/src/index/Home';
 * @Author: czy0729
 * @Date: 2018-06-20 17:57:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-01 22:32:36
 * @Path bt_mb_new /src/index/Home/_Header.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'antd-mobile';
import { observer } from '@';
import { Header, Flex, Icon } from '@components';
import Const from '@const';
import Utils from '@utils';
import { images } from './ds';

const _Header = (props, { $ }) => {
  const { faceImg } = $.getState('userInfo');
  const {
    commentNum,
    replyNum,
    likeNum,
    systemNum,
    rewardNum,
    otherNum
  } = $.getState('messageCount');
  const hasNewMessage = !!(
    commentNum ||
    replyNum ||
    likeNum ||
    systemNum ||
    rewardNum ||
    otherNum
  );

  return (
    <Header
      show
      hd={
        <img
          src={`${images}/logo${Const.__IMG_DPR__}.png`}
          style={{
            height: '0.6rem'
          }}
          alt="logo"
        />
      }
      ft={
        <Flex>
          <div
            className="t-c"
            onClick={() => Utils.router.push('/person/help/service')}
          >
            <Icon className="t-40" type="ww" />
            <p className="t-20 l-34 t-c">客服</p>
          </div>
          <div
            className="t-c ml-32"
            onClick={() =>
              Utils.checkLogin(() => Utils.router.push('/person/message'))
            }
          >
            <Badge
              dot={hasNewMessage}
              style={{
                top: '-0.06rem',
                right: '-0.16rem',
                width: '0.2rem',
                height: '0.2rem',
                border: '0.02rem solid #fff'
              }}
            >
              <Icon
                className="t-40"
                type="message2"
                style={{
                  width: '0.4rem'
                }}
              />
            </Badge>
            <p className="t-20 l-34 t-c">消息</p>
          </div>
          <div
            className="t-c ml-32"
            onClick={() => {
              if (faceImg) {
                Utils.router.push('/person');
              } else {
                Utils.router.push('/login');
              }
            }}
          >
            <Icon
              className="t-40"
              type="me"
              style={{
                width: '0.4rem'
              }}
            />
            <p className="t-20 l-34 t-c">我的</p>
          </div>
        </Flex>
      }
    />
  );
};

_Header.contextTypes = {
  $: PropTypes.object
};

export default observer(_Header);
