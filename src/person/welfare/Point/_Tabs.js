/**
 * const prefixCls = 'style-211086';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-09 15:56:51
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-09 16:53:42
 * @Path bt_mb_new \src\person\welfare\Point\_Tabs.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { ListView } from '@components';
import ItemMoney from './_ItemMoney';
import Item from './_Item';
import Styles from '@styles';
import Title from './_Title';

const prefixCls = 'style-211086';

const _Tabs = (props, { $ }) => {
  const { className } = props;
  const { btscore = '-' } = $.getState('userInfo');
  const lotteryList = $.getState('lotteryList');
  const lotteryMoneyList = $.getState('lotteryMoneyList');
  const { _loaded } = $.getState('lotteryMoneyList');

  return (
    <div className={classNames(prefixCls, className)}>
      {_loaded && (
        <div>
          <p className="t-28 l-34 t-c mt-24"><span>您当前拥有</span> <span className="t-primary">{btscore}</span> <span>积分</span></p>
          <Title title="礼券兑换" />
          <ListView
            data={lotteryMoneyList}
            renderRow={data => <ItemMoney {...data} />}
            onEndReached={$.fetch.lotteryMoneyList}
          />
          <Title title="礼品兑换" />
          <ListView
            data={lotteryList}
            renderRow={data => <Item {...data} />}
            onEndReached={$.fetch.lotteryList}
          />
        </div>
      )}
      <style jsx global>{`
        .style-211086 {
        }
        .${prefixCls} .am-list-body {
          background: ${Styles.color_bg} !important;
        }
        .style-211086 .am-tabs-default-bar-underline {
          width: 10% !important;
          border: 0.02rem solid ${Styles.color_main};
          transform: translateX(70%) !important;
        }
      `}</style>
    </div>
  );
};

_Tabs.contextTypes = {
  $: PropTypes.object
};

export default observer(_Tabs);
