/**
 * const prefixCls = 'style-116868';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-09 16:36:23
 * @Last Modified by:   lyz0720
 * @Last Modified time: 2018-11-09 16:36:23
 * @Path bt_mb_new \src\person\welfare\Point\_Item.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Button } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'styles-116868';

const _Item = (props, { $ }) => {
  const { className } = props;
  const { btscore } = $.getState('userInfo');
  const { lotteryPrizeId, prizeName, imgId, point = '-' } = props;
  const isEnableGet = props.isEnableGet == 1;
  const isCanGet = isEnableGet && btscore >= props.point;

  let btnText;
  if (isCanGet) {
    btnText = '兑换';
  } else {
    btnText = '积分不足';
  }

  return (
    <div className={classNames(prefixCls, className)}>
      <div
        className="thumb"
        style={{
          backgroundImage: `url(${Utils.getAppImgUrl(imgId)})`
        }}
      >
        &nbsp;
      </div>
      <p className="t-30 l-42 t-c mt-24 p-name">{prizeName}</p>
      <p className="t-24 l-36 t-c t-sub">需要 {point} 积分</p>
      <div className="t-c mt-12 btnbox">
        <Button
          type="danger"
          inline
          ghost
          radius
          size="sm"
          disabled={!isCanGet}
          onClick={() =>
            Utils.onConfirm(`是否使用${point}积分兑换${prizeName}?`, () =>
              $.do.doGet(lotteryPrizeId))
          }
        >
          {btnText}
        </Button>
      </div>

      <style jsx global>{`
        .styles-116868 {
        }
        .${prefixCls} .c-button_danger.c-button_ghost {
          background: transparent !important;
        }
        .${prefixCls} .c-button_radius {
          border-radius: 0.24rem;
        }
      `}</style>
      <style jsx>{`
        .styles-116868 {
          display: inline-block;
          vertical-align: top;
          width: 44%;
          margin: 4% 4% 0% 4%;
          background: ${Styles.color_void};
        }
        .styles-116868:nth-of-type(2n) {
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
          padding: 0 ${Styles.xs};
          word-break: keep-all;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .btnbox {
          padding-bottom: 0.24rem;
        }
      `}</style>
    </div>
  );
};

_Item.contextTypes = {
  $: PropTypes.object
};

export default observer(_Item);
