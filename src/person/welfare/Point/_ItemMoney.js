/**
 * const prefixCls = 'style-240487';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-09 16:36:58
 * @Last Modified by:   lyz0720
 * @Last Modified time: 2018-11-09 16:36:58
 * @Path bt_mb_new \src\person\welfare\Point\_ItemMoney.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Button } from '@components';
import Styles from '@styles';
import Utils from '@utils';

const prefixCls = 'styles-240487';

const _ItemMoney = (props, { $ }) => {
  const { btscore } = $.getState('userInfo');
  const {
    prizeVal,
    limitPrize,
    prizeName,
    lotteryPrizeId,
    point = '-'
  } = props;
  const isEnableGet = props.isEnableGet == 1;
  const isCanGet = isEnableGet && btscore >= props.point;

  let btnText;
  if (isCanGet) {
    btnText = '兑换';
  } else {
    btnText = '积分不足';
  }

  return (
    <div className={classNames(prefixCls)}>
      <div className="moneybox">
        <div>
          <p className="t-40 l-56 t-b t-c t-primary">&yen;{prizeVal}</p>
          <p className="t-24 l-36 t-sub t-c">满{parseInt(limitPrize)}可用</p>
        </div>
        <div className="line">&nbsp;</div>
        <div>
          <p className="t-28 l-56">{prizeName}</p>
          <p className="t-24 l-36 t-sub">需要 {point} 积分</p>
        </div>
        <div className="ml-48">
          <Button
            type="danger"
            inline
            ghost
            radius
            size="sm"
            disabled={!isCanGet}
            onClick={() =>
              Utils.onConfirm(`是否使用${point}积分兑换${prizeName}?`, () =>
                $.do.doGet(lotteryPrizeId))}
          >
            {btnText}
          </Button>
        </div>
      </div>
      <style jsx global>{`
        .style-240487 {
        }
        .${prefixCls} .c-button_danger.c-button_ghost {
          background: transparent !important;
        }
        .${prefixCls} .c-button_radius {
          border-radius: 0.24rem;
        }
      `}</style>

      <style jsx>{`
        .styles-240487 {
          margin: ${Styles.wind} ${Styles.wind} 0;
          padding: 0.5rem 0.24rem 0.5rem 0.4rem;
          background: rgba(238, 240, 244, 1);
          border: 2px solid #dbdbdb;
        }
        .moneybox {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .line {
          width: 0.04rem;
          height: 1.2rem;
          border: 0.02rem solid #dbdbdb;
        }
        .getBtn {
          padding: 0.08rem 0.32rem;
          border-radius: 0.24rem;
          border: 0.02rem solid ${Styles.color_danger};
        }
      `}</style>
    </div>
  );
};

_ItemMoney.contextTypes = {
  $: PropTypes.object
};

export default observer(_ItemMoney);
