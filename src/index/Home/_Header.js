/**
 * const prefixCls = 'style-148543';
 * const images = '/static/images/src/index/Home';
 * @Author: czy0729
 * @Date: 2018-06-20 17:57:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-20 18:42:32
 * @Path bt_mb_new /src/index/Home/_Header.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'antd-mobile';
import { observer } from '@';
import { Img, Header, Flex, Link, Icon } from '@components';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
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
          <Link className="t-30 l-42 t-b" href="/nido">
            社区活动
          </Link>
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
              className="t-40 ml-32"
              type="message2"
              style={{
                width: '0.4rem'
              }}
              onClick={() =>
                Utils.checkLogin(() => Utils.router.push('/person/message'))
              }
            />
          </Badge>
          {faceImg ? (
            <Img
              className="ml-32"
              src={faceImg}
              size="0.4rem"
              circle
              transparent
              style={{
                border: Styles.border
              }}
              onClick={() => Utils.router.push('/person')}
            />
          ) : (
            <Icon
              className="t-40 ml-32"
              type="me"
              style={{
                width: '0.4rem'
              }}
              onClick={() => Utils.router.push('/login')}
            />
          )}
        </Flex>
      }
    />
  );
};

_Header.contextTypes = {
  $: PropTypes.object
};

export default observer(_Header);
