/**
 * const prefixCls = 'style-231168';
 * const images = '/static/images/src/discovery/fish/Index/_List';
 * @Author: czy0729
 * @Date: 2018-08-08 15:32:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-08 18:52:05
 * @Path m.benting.com.cn /src/discovery/fish/Index/_List/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { AffixTabs, ListView, Button } from '@components';
import Utils from '@utils';
import Row from './_Row';
import { tabsDS } from '../ds';

const prefixCls = 'style-231168';

const _List = (props, { $ }) => {
  const { className } = props;
  const { page } = $.getState('_affixTabs');
  const { likeOpenIds } = $.getState('_discoveryRow');
  const data = $.getState('discovery');

  return (
    <div className={classNames(prefixCls, className)}>
      <AffixTabs
        tabs={tabsDS}
        page={page}
        extra={
          <Button
            type="primary"
            size="xs"
            inline
            ghost
            onClick={() =>
              Utils.checkLogin(() => Utils.router.push('/discovery/fish/post'))
            }
          >
            参加
          </Button>
        }
        onTabClick={$.page.onTabClick}
      >
        <ListView
          data={data}
          renderRow={item => (
            <Row
              likeRecordsOpen={likeOpenIds.includes(item.infoId)}
              {...item}
            />
          )}
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
