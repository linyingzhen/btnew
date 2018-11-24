/**
 * const prefixCls = 'style-193093';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-01 11:30:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-01 23:30:27
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
      <Flex className={`${prefixCls}__searchbox`}>
        <Flex.Item>
          <input
            type="search"
            className="t-30 l-42 search"
            name="keywords"
            placeholder="请输入想要搜索的内容"
            value={keywords}
            style={{
              width: '100%',
              border: 'none'
            }}
            onChange={$.page.keywordsChange}
          />
        </Flex.Item>
        <Icon className="t-32" type="search" onClick={$.fetch.search} />

        <style jsx global>{`
          .style-193093 {
            padding: ${Styles.wind};
            background: ${Styles.color_void} !important;
          }
          .${prefixCls}__searchbox {
            padding: ${Styles.sm} ${Styles.wind};
            background: ${Styles.color_theme};
            border: 0.02rem solid ${Styles.color_border};
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
