/**
 * const prefixCls = 'style-555523';
 * const images = '/static/images/src/person/wallet/_/FlowList';
 * @Author: czy0729
 * @Date: 2018-09-13 09:42:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-13 15:27:48
 * @Path m.benting.com.cn /src/person/wallet/_/FlowList/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { ListView, Empty } from '@components';
import SectionHeader from './_SectionHeader';
import Row from './_Row';
import RowScore from './_RowScore';

const prefixCls = 'style-555523';

const FlowList = props => {
  const { type, section, data = {}, onEndReached, className } = props;

  if (!data._loaded) {
    return <Empty>数据加载中...</Empty>;
  }

  return (
    <ListView
      className={classNames(prefixCls, className)}
      section={section}
      data={data}
      renderSectionHeader={sectionData => (
        <SectionHeader type={type} sectionData={sectionData} />
      )}
      renderRow={item => {
        if (type === 'score') {
          return <RowScore {...item} />;
        }

        return <Row {...item} />;
      }}
      onEndReached={onEndReached}
    />
  );
};

export default observer(FlowList);
