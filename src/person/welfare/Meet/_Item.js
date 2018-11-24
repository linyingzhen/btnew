/**
 * const prefixCls = 'style-252425';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-07 14:28:07
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-09 14:35:34
 * @Path bt_mb_new \src\person\welfare\Meet\_Item.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import { images } from './ds';

const prefixCls = 'styles-252425';

const _Item = (props, { $ }) => {
  const { className } = props;
  const { selectedIndex } = $.getState('state');

  const isSelected = selectedIndex.includes(props.lotteryPrizeId);
  const isEnableGet = props.isEnableGet == 1;
  const isGet = props.isGet == 1;

  let checkbox;
  let mask;

  if (isGet) {
    mask = (
      <Flex
        className={`${prefixCls}__mask`}
        direction="column"
        justify="center"
      >
        <img alt="0" src={`${images}/complete.png`} />
        <p className="t-28 t-void mt-sm">已领取</p>
      </Flex>
    );
  } else if (isEnableGet && isSelected) {
    checkbox = (
      <img
        alt="0"
        className={`${prefixCls}__checkbox`}
        src={`${images}/square_check_main.png`}
      />
    );
  } else if (isEnableGet && !isSelected) {
    checkbox = (
      <img
        alt="0"
        className={`${prefixCls}__checkbox`}
        src={`${images}/square_main.png`}
      />
    );
  } else {
    mask = (
      <Flex
        className={`${prefixCls}__mask`}
        direction="column"
        justify="center"
      >
        <img alt="0" src={`${images}/lock.png`} />
        <p className="t-28 t-void mt-sm">未满足条件</p>
      </Flex>
    );
  }

  return (
    <div
      className={classNames(prefixCls, className)}
      onClick={() => {
        if (isEnableGet) {
          $.page.toggleItem(props.lotteryPrizeId);
        } else {
          Utils.light('该礼品不能选择');
        }
      }}
    >
      <div
        className="thumb"
        style={{
          backgroundImage: `url(${Utils.getAppImgUrl(props.imgId)})`
        }}
      >
        {mask}
        {checkbox}
      </div>
      <p className="t-30 l-42 t-c mt-24 p-name">{props.prizeName}</p>

      <style jsx global>{`
        .styles-252425 {
        }
        .${prefixCls}__tag {
          position: absolute;
          top: 0;
          left: 0;
        }
        .${prefixCls}__checkbox {
          position: absolute;
          z-index: 2;
          top: ${Styles.xs};
          right: ${Styles.xs};
          width: 0.44rem;
          height: 0.44rem;
        }
        .${prefixCls}__mask {
          position: absolute;
          z-index: 1;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          padding: 0 ${Styles.wind};
          text-align: center;
          background: rgba(0, 0, 0, 0.24);
        }
        .${prefixCls}__mask img {
          width: 0.44rem;
          height: 0.44rem;
        }
      `}</style>
      <style jsx>{`
        .styles-252425 {
          display: inline-block;
          vertical-align: top;
          width: 44%;
          margin: 4% 4% 0% 4%;
          background: ${Styles.color_void};
        }
        .styles-252425:nth-of-type(2n) {
          margin-left: 0;
        }
        .thumb {
          position: relative;
          padding-bottom: 100%;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 96%;
        }
        .p-name {
          min-height: 0.88rem;
          padding: 0 ${Styles.xs};
        }
      `}</style>
    </div>
  );
};

_Item.contextTypes = {
  $: PropTypes.object
};

export default observer(_Item);
