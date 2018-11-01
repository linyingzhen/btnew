/**
 * const prefixCls = 'style-155787';
 * const images = '/static/images/src/school/Article';
 * @Author: czy0729
 * @Date: 2018-09-07 14:08:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-07 16:52:35
 * @Path m.benting.com.cn /src/school/Article/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import { ListView } from '@components';
import AffixTabs from '@components/AffixTabs/default';
import Row from '../_/Articleitem';
import store from './store';
import { tabsDS } from './ds';

const Article = (props, { $ }) => {
  const { page } = $.getState('_affixTabs');
  const article = $.getState('article');

  return (
    <Layout title="资讯类">
      <AffixTabs tabs={tabsDS} page={page} onTabClick={$.page.onTabClick}>
        <ListView
          data={article}
          renderRow={item => <Row {...item} />}
          onEndReached={$.fetch.comment}
        />
      </AffixTabs>
    </Layout>
  );
};

Article.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Article));
