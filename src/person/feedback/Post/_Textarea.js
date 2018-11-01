/**
 * const prefixCls = 'style-199186';
 * const images = '/static/images/src/person/feedback/Post';
 * @Author: czy0729
 * @Date: 2018-09-08 17:52:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 18:01:57
 * @Path m.benting.com.cn /src/person/feedback/Post/_Textarea.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Textarea } from '@components';

const prefixCls = 'style-199186';

const _Textarea = (props, { $ }) => {
  const { className } = props;
  const value = $.getState('_textarea');

  return (
    <div className={classNames(prefixCls, className)}>
      <Textarea
        placeholder="请留下您宝贵的意见..."
        autoHeight
        clear
        rows={4}
        count={200}
        value={value}
        onChange={value => $.setState(value, '_textarea')}
      />

      <style jsx>{`
        .style-199186 {
          padding: 0.16rem;
        }
      `}</style>
    </div>
  );
};

_Textarea.contextTypes = {
  $: PropTypes.object
};

export default observer(_Textarea);
