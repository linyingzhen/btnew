/**
 * const prefixCls = 'style-193093';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-01 11:30:54
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-01 15:13:41
 * @Path bt_mb_new \src\shop\Search\_SerachBar.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon } from '@components';
import Styles from '@styles';

const prefixCls = 'style-193093';

const _SearchBar = (props, { $ }) => {
  const { className } = props;
  const { keywords } = $.getState();

  return (
    <div className={classNames(prefixCls, className)}>
      <Flex className="searchbox">
        <Flex.Item>
          <input
            type="search"
            className="t-30 l-42 search"
            name="keywords"
            placeholder="请输入想要搜索的内容"
            value={keywords}
            onChange={$.page.keywordsChange}
          />
        </Flex.Item>
        <Icon className="t-28" type="search" onClick={$.fetch.search} />

        <style jsx global>{`
          .style-193093 {
            padding: ${Styles.wind};
            background: ${Styles.color_void} !important;
          }
          .style-193093 .searchbox {
            padding: ${Styles.sm} ${Styles.wind};
            background: ${Styles.color_theme};
            border: 0.02rem solid ${Styles.color_border};
          }
          .search {
            border: none;
            width: 100%;
          }
        `}</style>
      </Flex>
    </div>
  );
};

_SearchBar.contextTypes = {
  $: PropTypes.object
};

export default observer(_SearchBar);
