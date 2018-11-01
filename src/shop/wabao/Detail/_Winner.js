/**
 * const prefixCls = 'style-163070';
 * const images = '/static/images/src/shop/wabao/Detail';
 * @Author: czy0729
 * @Date: 2018-09-27 19:06:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 16:21:58
 * @Path m.benting.com.cn /src/shop/wabao/Detail/_Winner.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { List, Flex } from '@components';
import { Header, Avatar } from '@_';
import Styles from '@styles';

const prefixCls = 'style-163070';

const _Winner = (props, { $ }) => {
  const { className } = props;
  const {
    oncebuyId,
    niname,
    faceImg,
    userId,
    vip,
    buypernum,
    winNo
  } = $.getState('detail');

  if (!winNo) {
    return null;
  }

  return (
    <div className={classNames(prefixCls, className)}>
      <Header
        title="挖宝达人"
        isList
        linkExtra="计算详情"
        href={`/shop/wabao/calculate?id=${oncebuyId}`}
        as={`/shop/wabao/calculate/${oncebuyId}`}
      />
      <List.Item thumb={<Avatar userId={userId} img={faceImg} vip={vip} />}>
        <Flex>
          <Flex.Item>
            <p className="t-30 l-44">{niname}</p>
            <p className="t-24 l-36 mt-8">
              <span className="t-sub">幸运号</span>
              <span className="t-danger ml-xs">{winNo}</span>
            </p>
          </Flex.Item>
          <p className="t-24 l-32 t-sub">
            <span>共参与</span>
            <span className="t-primary ml-xs mr-xs">{buypernum}</span>
            <span>人次</span>
          </p>
        </Flex>
      </List.Item>

      <style jsx>{`
        .style-163070 {
          background: ${Styles.color_theme};
        }
      `}</style>
    </div>
  );
};

_Winner.contextTypes = {
  $: PropTypes.object
};

export default observer(_Winner);
