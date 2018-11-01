/**
 * const prefixCls = 'style-141268';
 * const images = '/static/images/src/bbs/floor/Detail';
 * @Author: czy0729
 * @Date: 2018-09-04 18:40:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 02:49:17
 * @Path m.benting.com.cn /src/bbs/floor/Detail/_Winner.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Img } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-141268';

const _Winner = (props, { $ }) => {
  const { className } = props;
  const { lotteryUser = {} } = $.getState('detail');

  if (!lotteryUser.userId) {
    return null;
  }

  return (
    <div className={classNames(prefixCls, className)}>
      <Flex className="p-sw">
        <Img
          src={lotteryUser.faceImg}
          size="0.88rem"
          circle
          onClick={() =>
            Utils.router.push(
              `/person/zone?id=${lotteryUser.userId}`,
              `/person/zone/${lotteryUser.userId}`
            )
          }
        />
        <Flex.Item>
          <p className="t-sm">
            <span>本期达人：</span>
            <span className="t-primary">{lotteryUser.niname}</span>
          </p>
          <p className="t-sm mt-xs">
            <span>踩楼次数：</span>
            <span className="t-primary mr-xs">
              {lotteryUser.userFloors.length}
            </span>
            <span>次</span>
          </p>
          <p className="t-sm mt-xs">
            <span>幸运楼层：</span>
            <span className="t-primary">#{lotteryUser.floor}</span>
          </p>
        </Flex.Item>
      </Flex>
      <div className="calculate p-sw">
        <p className="t-sm">计算公式：</p>
        <Flex className="t-xs mt-sm">
          <Flex.Item className="t-primary">
            {lotteryUser.lotteryNumber}
          </Flex.Item>
          <Flex.Item>%</Flex.Item>
          <Flex.Item className="t-primary">
            {lotteryUser.floorCount}
          </Flex.Item>
          <Flex.Item>+ 1</Flex.Item>
          <Flex.Item>=</Flex.Item>
          <Flex.Item className="t-primary">{lotteryUser.floor}</Flex.Item>
        </Flex>
        <Flex className="t-xs t-sub mt-xs">
          <Flex.Item>排列五</Flex.Item>
          <Flex.Item>取余</Flex.Item>
          <Flex.Item>总楼层</Flex.Item>
          <Flex.Item>+ 1</Flex.Item>
          <Flex.Item>=</Flex.Item>
          <Flex.Item>幸运楼层</Flex.Item>
        </Flex>
      </div>

      <style jsx>{`
        .style-141268 {
          background: ${Styles.color_theme};
        }
        .calculate {
          border-top: ${Styles.border};
        }
        .calculate :global(.am-flexbox-item) {
          margin-left: 0;
        }
        .calculate :global(.am-flexbox-item:not(:first-child)) {
          text-align: center;
        }
        .img-master {
          position: absolute;
          top: 50%;
          right: ${Styles.wind};
          transform: translateY(-50%);
        }
      `}</style>
    </div>
  );
};

_Winner.contextTypes = {
  $: PropTypes.object
};

export default observer(_Winner);
