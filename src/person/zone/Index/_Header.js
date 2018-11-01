/**
 * const prefixCls = 'style-174984';
 * const images = '/static/images/src/person/zone/Index';
 * @Author: czy0729
 * @Date: 2018-07-30 18:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 02:32:00
 * @Path m.benting.com.cn /src/person/zone/Index/_Header.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Header, Flex } from '@components';
import Utils from '@utils';
import { followDS } from './ds';

const _Header = (props, { $ }) => {
  const { userId, prefix } = $.getState('person');
  const label = Utils.getLabel(followDS, prefix);
  const isFollow = label === '已关注' || label === '互相关注';

  return (
    <Header
      show
      title="空间"
      ft={
        label && (
          <Flex>
            {!isFollow ? (
              <span
                className="t-34"
                onClick={() => Utils.checkLogin($.do.follow)}
              >
                关注TA
              </span>
            ) : (
              <span
                className="t-34"
                onClick={() =>
                  Utils.router.push(`/chat?id=${userId}`, `/chat/${userId}`)
                }
              >
                发私信
              </span>
            )}
          </Flex>
        )
      }
      style={{ background: 'transparent' }}
    />
  );
};

_Header.contextTypes = {
  $: PropTypes.object
};

export default observer(_Header);
