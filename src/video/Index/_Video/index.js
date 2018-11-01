/**
 * const prefixCls = 'style-834045';
 * const images = '/static/images/src/video/Index/_Video';
 * @Author: czy0729
 * @Date: 2018-07-19 11:07:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-17 12:29:49
 * @Path m.benting.com.cn /src/video/Index/_Video/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { AffixTabs, ListView, Button } from '@components';
import Utils from '@utils';
import Row from './_Row';
import { tabsDS } from '../ds';

const prefixCls = 'style-834045';

const _Video = (props, { $ }) => {
  const { className } = props;
  const { page } = $.getState('_affixTabs');
  const video = $.getState('video');

  return (
    <div className={classNames(prefixCls, className)}>
      <AffixTabs
        tabs={tabsDS}
        page={page}
        onTabClick={$.page.onTabClick}
        extra={
          <Button
            type="primary"
            size="xs"
            inline
            ghost
            onClick={() =>
              Utils.checkLogin(() => Utils.router.push('/video/post'))
            }
          >
            发视频
          </Button>
        }
      >
        <ListView
          className="tool-list-split"
          data={video}
          renderRow={item => <Row {...item} />}
          onEndReached={$.fetch.video}
        />
      </AffixTabs>
    </div>
  );
};

_Video.contextTypes = {
  $: PropTypes.object
};

export default observer(_Video);
