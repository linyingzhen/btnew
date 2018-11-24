/**
 * const prefixCls = 'style-110227';
 * const images = '/static/images/src/event/car/Index';
 * @Author: czy0729
 * @Date: 2018-11-10 16:17:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-10 16:19:02
 * @Path bt_mb_new /src/event/car/Index/_Header.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Header, Flex, Icon, NativeShare } from '@components';
import Const from '@const';
import Utils from '@utils';

const _Header = (props, { $ }) => {
  const { _loaded, title, json, content } = $.getState('detail');

  if (!_loaded) {
    return null;
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
          <NativeShare
            config={{
              icon,
              link: `${Const.__WEB__}/event/car`,
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
