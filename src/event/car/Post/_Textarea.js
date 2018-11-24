/**
 * const prefixCls = 'style-191940';
 * const images = '/static/images/src/event/car/Post';
 * @Author: czy0729
 * @Date: 2018-11-08 11:44:52
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-11-08 11:44:52
 * @Path bt_mb_new /src/event/car/Post/_Textarea.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Textarea } from '@components';
import Styles from '@styles';

const prefixCls = 'style-191940';

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
        .style-191940 {
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
