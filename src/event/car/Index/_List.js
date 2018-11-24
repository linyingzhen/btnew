/**
 * const prefixCls = 'style-853450';
 * const images = '/static/images/src/event/car/Index';
 * @Author: czy0729
 * @Date: 2018-11-06 17:01:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-09 14:48:17
 * @Path bt_mb_new /src/event/car/Index/_List.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { ListView } from '@components';
import AffixTabs from '@components/AffixTabs/default';
import Row from './_Row';
import { tabsDS } from '../ds';

const prefixCls = 'style-853450';

const _List = (props, { $ }) => {
  const { className } = props;
  const { page } = $.getState('_affixTabs');
  const data = $.getState('discovery');

  return (
    <div className={classNames(prefixCls, className)}>
      <AffixTabs tabs={tabsDS} page={page} onTabClick={$.page.onTabClick}>
        <ListView
          data={data}
          renderRow={item => <Row {...item} />}
          onEndReached={$.fetch.discovery}
        />
      </AffixTabs>
    </div>
  );
};

_List.contextTypes = {
  $: PropTypes.object
};

export default observer(_List);
