/**
 * const prefixCls = 'style-570812';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-09 13:53:19
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-09 15:09:50
 * @Path bt_mb_new \src\person\welfare\Upgrade\_Top.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from '@styles';
import { observer } from '@';

const prefixCls = 'style-570812';

const _Top = (props, { $ }) => {
  const { className } = props;
  const { showfull } = $.getState('state');

  return (
    <div className={classNames(prefixCls, className)}>
      <p className="t-26 l-36 t-sub t-c">会员升级有好礼</p>
      <div className="t-sub box">
        <p className="t-24 l-34">
          1. 会员每升一级可领取30元现金券一张，消费满200元即可使用。
        </p>
        {showfull ? (
          <>
            <p className="t-24 l-34">
              2. 会员每升一级可在升级专区任意挑选一次对应会员级别的专属礼品一份。
            </p>
            <p className="t-24 l-34">
              3. 会员升级为五星会员以上级别可领取享受包邮卡，每升一个级别可领取一张。
            </p>
            <p className="t-24 l-34 t-gold">特别声明：有效期为自领取之日后的60日，现金礼券不可重复叠加使用，包邮卡只可在除购物外的本汀或灵动官方活动中使用。</p>
            <p className="t-24 l-34 t-gold">现金券可使用时间不排除个别情况有所调整，最终解释权归本汀所有。</p>
          </>
        ) : (
          <p className="t-24 l-34">
            2. 会员每升一级可在升级专区任意挑选一次对应会员级别的专属礼品一份...
          </p>
        )}
        <p className="t-24 l-34 t-c t-primary mt-12" onClick={() => $.setState({ showfull: !showfull }, 'state')}>{ showfull ? '收起' : '显示更多'}</p>
      </div>
      <style jsx>{`
        .style-570812 {
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
