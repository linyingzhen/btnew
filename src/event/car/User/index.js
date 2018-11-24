/**
 * const prefixCls = 'style-144256';
 * const images = '/static/images/src/event/car/User';
 * @Author: czy0729
 * @Date: 2018-11-06 18:24:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-21 11:25:50
 * @Path bt_mb_new /src/event/car/User/index.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { ListView } from '@components';
import AffixTabs from '@components/AffixTabs/default';
import { Layout } from '@_';
import Row from './_Row';
import store from './store';
import { tid } from '../ds';
import { tabsDS } from './ds';

const User = (props, { $ }) => {
  const { id = tid } = $.params.params;
  const { page } = $.getState('_affixTabs');
  const data = $.getState('list');

  return (
    <Layout title="报名粉丝">
      <AffixTabs tabs={tabsDS} page={page} onTabClick={$.page.onTabClick}>
        <ListView
          data={data}
          renderRow={item => <Row tid={id} {...item} />}
          onEndReached={$.fetch.list}
        />
      </AffixTabs>
    </Layout>
  );
};

User.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(User));
