/**
 * const prefixCls = 'style-113948';
 * const images = '/static/images/src/bbs/floor/Detail';
 * @Author: czy0729
 * @Date: 2018-09-04 17:29:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-31 18:13:50
 * @Path m.benting.com.cn /src/bbs/floor/Detail/_Header.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Header, Flex, Icon, NativeShare } from '@components';
import Const from '@const';
import Utils from '@utils';

const _Header = (props, { $ }) => {
  const { _loaded, threadId, title, json, content } = $.getState('detail');

  if (!_loaded) {
    return <Header show bd={null} />;
  }

  let icon = Const.__SHARE_IMG__;
  if (json) {
    const entities = Utils.getRealDraftEntityMap(json);
    icon = entities.length ? entities[0] : Const.__SHARE_IMG__;
  }

  return (
    <Header
      show
      bd={null}
      ft={
        <Flex>
          <Icon
            className={classNames('t-34', {
              't-title': !$.isFavor,
              't-primary': $.isFavor
            })}
            type="favor-fill"
            onClick={() => Utils.checkLogin($.do.toggleFavor)}
          />
          <NativeShare
            className="ml-32"
            config={{
              icon,
              link: `${Const.__WEB__}/bbs/floor/${threadId}`,
              title,
              desc: Utils.removeHTMLTag(content)
            }}
            actionSheetConfig={{
              message: '分享邀请链接到'
            }}
          >
            <Icon className="t-34 t-title t-b" type="share-fill" />
          </NativeShare>
        </Flex>
      }
    />
  );
};

_Header.contextTypes = {
  $: PropTypes.object
};

export default observer(_Header);
