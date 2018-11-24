/**
 * const prefixCls = 'style-146247';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-08 14:19:12
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-08 14:33:53
 * @Path bt_mb_new \src\person\welfare\Birthday\_Top.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from '@styles';
import { observer } from '@';

const prefixCls = 'style-146247';

const _Top = (props, { $ }) => {
  const { className } = props;
  const { showfull } = $.getState('state');

  return (
    <div className={classNames(prefixCls, className)}>
      <p className="t-26 l-36 t-sub t-c">会员生日有好礼</p>
      <div className="t-sub box">
        <p className="t-24 l-34">
          会员可在生日当月在本汀官网领取生日礼券和生日礼品一份，此特权当月有效。
        </p>
        {showfull ? (
          <>
            <p className="t-24 l-34">
              1. 生日礼品：会员可在生日当月从礼品页面热选对应级别的礼品一份！
            </p>
            <p className="t-24 l-34">
              2.
              生日礼券：会员可在生日当月领取对应级别的现金礼券一张！该券可在本汀官网、本汀天猫旗舰店、本汀麦酥天猫专卖店、本汀京东与本汀线下授权实体店，仅限当月消费使用！
              现金券可使用时间不排除个别情况有所调整，最终解释权归本汀所有。
            </p>
          </>
        ) : (
          <p className="t-24 l-34">
            1. 生日礼品：会员可在生日当月从礼品页面热选对应级别的礼品一份！…
          </p>
        )}
        <p className="t-24 l-34 t-c t-primary mt-12" onClick={() => $.setState({ showfull: !showfull }, 'state')}>{ showfull ? '收起' : '显示更多'}</p>
      </div>
      <style jsx>{`
        .style-146247 {
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
