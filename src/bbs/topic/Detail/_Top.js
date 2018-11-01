/**
 * const prefixCls = 'style-150705';
 * const images = '/static/images/src/bbs/topic/Index';
 * @Author: czy0729
 * @Date: 2018-08-03 10:16:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-03 14:34:42
 * @Path m.benting.com.cn /src/bbs/topic/Index/_Top.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Button } from '@components';
import { TopicAvatar } from '@_';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-150705';

const _Top = (props, { $ }) => {
  const { className } = props;
  const { title } = $.getState('detail');
  const isPosted = $.getState('isPosted');

  return (
    <div className={classNames(prefixCls, className)}>
      <Flex>
        <TopicAvatar />
        <Flex.Item>
          <Flex className="t-34 l-48 mh-96">{title}</Flex>
        </Flex.Item>
      </Flex>
      {isPosted ? (
        <Button className="mt-24" disabled>
          您已参与话题
        </Button>
      ) : (
        <Button
          className="mt-24"
          type="primary"
          onClick={() => Utils.checkLogin($.page.showFixedTextarea)}
        >
          立即参与话题讨论
        </Button>
      )}

      <style jsx global>{`
        .style-150705 {
          padding: ${Styles.wind};
          background: ${Styles.color_theme};
        }
      `}</style>
    </div>
  );
};

_Top.contextTypes = {
  $: PropTypes.object
};

export default observer(_Top);
