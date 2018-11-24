/**
 * const prefixCls = 'style-199568';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-09 15:44:07
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-09 15:48:14
 * @Path bt_mb_new \src\person\welfare\Point\_Top.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from '@styles';
import { observer } from '@';

const prefixCls = 'style-199568';

const _Top = (props, { $ }) => {
  const { className } = props;
  const { showfull } = $.getState('state');

  return (
    <div className={classNames(prefixCls, className)}>
      <p className="t-26 l-36 t-sub t-c">兑换抽奖享不停</p>
      <div className="t-sub box">
        <p className="t-24 l-34">
          奖励积分：参与本汀或灵动官方举行的活动可获取额度不等的奖励积分。
        </p>
        {showfull ? (
          <>
            <p className="t-24 l-34">
              消费积分：会员在本汀官网、本汀天猫旗舰店、本汀麦酥天猫专卖店、本汀京东每成功消费1元积1分并尊享积分活动。
            </p>
            <p className="t-24 l-34">
              积分使用：会员所积累的积分可用于兑换礼品 、积分抽奖、兑换现金劵。
            </p>
            <p className="t-24 l-34 t-gold">
              特别声明：积分有效期为积分获取之日起至次年年底；每年12月31日清空当年1月1日前获取的积分。
            </p>
          </>
        ) : (
          <p className="t-24 l-34">
            消费积分：会员在本汀官网、本汀天猫旗舰店、本汀麦酥天猫专卖店、本汀京东每成功消费1…
          </p>
        )}
        <p className="t-24 l-34 t-c t-primary mt-12" onClick={() => $.setState({ showfull: !showfull }, 'state')}>{ showfull ? '收起' : '显示更多'}</p>
      </div>
      <style jsx>{`
        .style-199568 {
          background: ${Styles.color_main};
        }
        .box {
          padding: 0.56rem 1rem;
        }
      `}</style>
    </div>
  );
};

_Top.contextTypes = {
  $: PropTypes.object
};

export default observer(_Top);
