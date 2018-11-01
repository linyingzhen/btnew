/**
 * const prefixCls = 'style-107526';
 * const images = '/static/images/src/bbs/topic/Detail';
 * @Author: czy0729
 * @Date: 2018-08-03 12:19:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-03 14:07:36
 * @Path m.benting.com.cn /src/bbs/topic/Detail/_FixedTextarea.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon } from '@components';
import FixedTextarea from '@components/FixedTextarea/topic';

const prefixCls = 'style-107526';

const _FixedTextarea = (props, { $ }) => {
  const { className } = props;
  const { show, placeholder, onSubmit } = $.getState('_fixedTextarea');
  const { title } = $.getState('detail');

  return (
    <FixedTextarea
      className={classNames(prefixCls, className)}
      show={show}
      title={
        <Flex>
          <Icon className="t-48 l-56 t-void" type="topic" />
          <Flex.Item className="t-28 t-void">{title}</Flex.Item>
        </Flex>
      }
      placeholder={placeholder}
      showUploadPicButton={9}
      rows={5}
      count={400}
      onSubmit={onSubmit}
      onClose={$.hideFixedTextarea}
    />
  );
};

_FixedTextarea.contextTypes = {
  $: PropTypes.object
};

export default observer(_FixedTextarea);
