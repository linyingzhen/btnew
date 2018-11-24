/**
 * const prefixCls = 'style-184443';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-08 15:06:07
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-08 17:30:00
 * @Path bt_mb_new \src\person\welfare\Birthday\_ItemMoney.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Button } from '@components';
import Styles from '@styles';
import Utils from '@utils';

const prefixCls = 'styles-184443';

const _ItemMoney = (props, { $ }) => {
  const { prizeVal, limitPrize, prizeName, lotteryPrizeId } = props;
  const isEnableGet = props.isEnableGet == 1;
  const isGet = props.isGet == 1;

  let btnText;
  if (isEnableGet) {
    btnText = '立即领取';
  } else if (isGet) {
    btnText = '去使用';
  } else {
    btnText = '未满足条件';
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
          <p className="t-32">{prizeName}</p>
          <p className="t-24 l-36 t-sub">仅限生日当月使用</p>
        </div>
        <div className="ml-48">
          {isGet ? (
            <Button
              type="danger"
              inline
              ghost
              radius
              size="sm"
              onClick={() => Utils.router.push('/person/goods')}
            >
              {btnText}
            </Button>
          ) : (
            <Button
              type="danger"
              inline
              ghost
              radius
              size="sm"
              disabled={!isEnableGet}
              onClick={() => $.do.doGet(lotteryPrizeId)}
            >
              {btnText}
            </Button>
          )}
        </div>
      </div>
      <style jsx global>{`
        .style-184443 {
        }
        .${prefixCls} .c-button_danger.c-button_ghost {
          background: transparent !important;
        }
        .${prefixCls} .c-button_radius {
          border-radius: 0.24rem;
        }
      `}</style>

      <style jsx>{`
        .styles-184443 {
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
