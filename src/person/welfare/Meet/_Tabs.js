/**
 * const prefixCls = 'style-989424';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-07 18:35:30
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-07 18:40:58
 * @Path bt_mb_new \src\person\welfare\Meet\_Tabs.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Tabs } from 'antd-mobile';
import { ListView } from '@components';
import Item from './_Item';
import { tabs } from './ds';
import Styles from '@styles';

const prefixCls = 'style-989424';

const _Tabs = (props, { $ }) => {
  const { className } = props;
  const lotteryList = $.getState('lotteryList');
  const { _loaded } = $.getState('lotteryList');

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
          $.fetch.lotteryList(true);
        }}
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
      >
        &nbsp;
      </Tabs>
      {_loaded && (
        <ListView
          data={lotteryList}
          renderRow={data => <Item {...data} />}
          onEndReached={$.fetch.lotteryList}
        />
      )}
      <style jsx global>{`
        .style-989424 {
        }
        .${prefixCls} .am-list-body {
          background: ${Styles.color_bg} !important;
        }
        .style-989424 .am-tabs-default-bar-underline {
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
