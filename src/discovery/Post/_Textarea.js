/**
 * const prefixCls = 'style-198939';
 * const images = '/static/images/src/discovery/Post';
 * @Author: czy0729
 * @Date: 2018-07-23 14:22:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 17:28:25
 * @Path m.benting.com.cn /src/discovery/Post/_Textarea.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Textarea } from '@components';

const prefixCls = 'style-198939';

const _Textarea = (props, { $ }) => {
  const { className } = props;
  const value = $.getState('_textarea');

  return (
    <div className={classNames(prefixCls, className)}>
      <Textarea
        placeholder="说点什么吧..."
        autoHeight
        clear
        rows={4}
        count={200}
        value={value}
        onChange={value => $.setState(value, '_textarea')}
      />

      <style jsx>{`
        .style-198939 {
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
