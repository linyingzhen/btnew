/**
 * const prefixCls = 'style-156266';
 * const images = '/static/images/src/shop/auction/Detail';
 * @Author: czy0729
 * @Date: 2018-09-12 15:42:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-12 16:01:04
 * @Path m.benting.com.cn /src/shop/auction/Detail/_Winner.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex } from '@components';
import { Avatar } from '@_';
import Utils from '@utils';
import Styles from '@styles';
import { images } from './ds';
import { auctionTypeDS } from '../Index/ds';

const prefixCls = 'style-156266';

const _Winner = (props, { $ }) => {
  const { className } = props;
  const { ownUser = {}, auctionType } = $.getState('detail');
  const { userId, faceImg, auctionPriceTotal, num, niname } = ownUser;

  if (!userId) {
    return null;
  }

  const type = Utils.getLabel(auctionTypeDS, auctionType);

  return (
    <Flex className={classNames(prefixCls, className)}>
      <Avatar userId={userId} img={faceImg} />
      <Flex.Item
        style={{
          marginLeft: '0.24rem'
        }}
      >
        <p className="t-30 l-44">{niname}</p>
        <p className="t-24 l-36 t-sub">共出价 {num} 次</p>
      </Flex.Item>
      <p className="t-28 l-40 t-sub">
        <span>成交价：</span>
        <span className="t-40 l-56 t-danger">
          {parseInt(auctionPriceTotal)}
        </span>
        <span>{type}</span>
      </p>
      <img className="img-pai" src={`${images}/pai.png`} alt="" />

      <style jsx global>{`
        .style-156266 {
          position: relative;
          padding: 0.4rem ${Styles.wind};
          background: ${Styles.color_theme};
        }
      `}</style>
      <style jsx>{`
        .style-156266 {
        }
        .img-pai {
          position: absolute;
          top: 50%;
          right: ${Styles.wind};
          width: 1rem;
          height: 1rem;
          transform: translateY(-50%);
          opacity: 0.24;
        }
      `}</style>
    </Flex>
  );
};

_Winner.contextTypes = {
  $: PropTypes.object
};

export default observer(_Winner);
