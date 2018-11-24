/**
 * const prefixCls = 'style-889649';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-09 13:59:55
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-09 14:03:16
 * @Path bt_mb_new \src\person\welfare\Upgrade\_Tabs.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Tabs } from 'antd-mobile';
import { ListView } from '@components';
import ItemMoney from './_ItemMoney';
import Item from './_Item';
import { tabs } from './ds';
import Styles from '@styles';
import Title from './_Title';

const prefixCls = 'style-889649';

const _Tabs = (props, { $ }) => {
  const { className } = props;
  const lotteryList = $.getState('lotteryList');
  const lotteryMoneyList = $.getState('lotteryMoneyList');
  const { _loaded } = $.getState('lotteryMoneyList');

  return (
    <div className={classNames(prefixCls, className)}>
      <Tabs
        tabs={tabs}
        tabBarInactiveTextColor="#9B9B9B"
        tabBarActiveTextColor="#000"
        initialPage={0}
        onChange={(tab, index) => {
          window.console.log('onChange', index, tab.grade);
          $.setState({ id: tab.grade }, 'state');
          $.fetch.lotteryMoneyList(true);
          $.fetch.lotteryList(true);
        }}
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
      >
        &nbsp;
      </Tabs>
      {_loaded && (
        <div>
          <Title title="升级礼券" />
          <ListView
            data={lotteryMoneyList}
            renderRow={data => <ItemMoney {...data} />}
            onEndReached={$.fetch.lotteryMoneyList}
          />
          <Title title="升级礼品" />
          <ListView
            data={lotteryList}
            renderRow={data => <Item {...data} />}
            onEndReached={$.fetch.lotteryList}
          />
        </div>
      )}
      <style jsx global>{`
        .style-889649 {
        }
        .${prefixCls} .am-list-body {
          background: ${Styles.color_bg} !important;
        }
        .style-889649 .am-tabs-default-bar-underline {
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
