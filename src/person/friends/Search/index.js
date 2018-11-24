/**
 * const prefixCls = 'style-973775';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-06 09:13:44
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-06 09:16:43
 * @Path bt_mb_new \src\person\friends\Search\index.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from '@_';
import { SearchBar } from 'antd-mobile';
import { injectV2, observer } from '@';
import { ListView } from '@components';
import Item from './_Item';
import Utils from '@utils';
import store from './store';

const prefixCls = 'style-973775';

const _Search = (props, { $ }) => {
  const { keywords } = $.getState('state');
  const data = $.getState('searchList');

  return (
    <Layout title="搜索好友" className={prefixCls}>
      <SearchBar
        placeholder="输入用户昵称"
        maxLength={16}
        onChange={value => {
          $.setState({
            keywords: value
          });
        }}
        onSubmit={value => {
          $.fetch.fetchList(true);
          if (value !== keywords) {
            Utils.loading();
          }
        }}
        onCancel={() => {
          $.setState({
            focused: false
          });
        }}
      />
      <ListView
        data={data}
        renderRow={item => <Item {...item} />}
        onEndReached={$.fetch.fetchList}
      />
      <style jsx global>{`
        .style-973775 {
        }
        .${prefixCls} .am-search-clear-show {
          margin-top: 0;
          margin-right: 0;
        }
      `}</style>
    </Layout>
  );
};

_Search.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(_Search));
