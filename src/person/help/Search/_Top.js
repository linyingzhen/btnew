/**
 * const prefixCls = 'style-141019';
 * const images = '/static/images/src/person/help/Search';
 * @Author: Jun
 * @Date: 2018-07-27 17:35:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-01 23:31:25
 * @Path m.benting.com.cn /src/person/help/Search/_Top.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Flex, Button } from '@components';
import Styles from '@styles';

const prefixCls = 'style-141019';

const _Top = (props, { $ }) => {
  const { keywords } = $.getState();

  return (
    <Flex className={prefixCls}>
      <Flex.Item>
        <input
          className="t-30 l-42"
          name="keywords"
          placeholder="请输入您要咨询的问题"
          value={keywords}
          style={{
            width: '100%',
            border: 'none'
          }}
          onChange={$.page.keywordsChange}
        />
      </Flex.Item>
      <Button
        className="ml-sm"
        type="primary"
        inline
        size="sm"
        onClick={$.fetch.search}
      >
        搜索
      </Button>

      <style jsx global>{`
        .style-141019 {
          padding: ${Styles.sm} ${Styles.wind};
          background: ${Styles.color_theme};
        }
      `}</style>
    </Flex>
  );
};

_Top.contextTypes = {
  $: PropTypes.object
};

export default observer(_Top);
