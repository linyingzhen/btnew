/**
 * const prefixCls = 'style-223135';
 * const images = '/static/images/src/person/wallet/_/FlowList';
 * @Author: czy0729
 * @Date: 2018-09-13 11:21:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 02:51:20
 * @Path m.benting.com.cn /src/person/wallet/_/FlowList/_SectionHeader.js
 */
import React from 'react';
import { Flex } from '@components';
import Utils from '@utils';

const _SectionHeader = props => {
  const { type, sectionData } = props;
  const [, m, d, total] = sectionData.split(',');

  return (
    <Flex className="t-26 t-sub" style={{ width: '100%' }}>
      <Flex.Item>
        <span>
          {m}月{d}日
        </span>
      </Flex.Item>
      {total >= 0 && <span>+</span>}
      <span>{Utils.formatNumber(total, type === 'score' ? 0 : 2)}</span>
    </Flex>
  );
};

export default _SectionHeader;
