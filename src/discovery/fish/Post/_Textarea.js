/**
 * const prefixCls = 'style-205166';
 * const images = '/static/images/src/discovery/fish/Post';
 * @Author: czy0729
 * @Date: 2018-08-11 15:50:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-12 12:25:37
 * @Path m.benting.com.cn /src/discovery/fish/Post/_Textarea.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Textarea } from '@components';
import Styles from '@styles';

const prefixCls = 'style-205166';

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
        .style-205166 {
          padding: 0 0.16rem;
          background: ${Styles.color_theme};
        }
      `}</style>
    </div>
  );
};

_Textarea.contextTypes = {
  $: PropTypes.object
};

export default observer(_Textarea);
