/**
 * const prefixCls = 'style-103228';
 * const images = '/static/images/src/bbs/floor/Detail';
 * @Author: czy0729
 * @Date: 2018-09-04 17:28:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-04 18:38:52
 * @Path m.benting.com.cn /src/bbs/floor/Detail/_FixedTextarea.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { FixedTextarea, FixedInput } from '@components';

const prefixCls = 'style-103228';

@observer
export default class _FixedTextarea extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  componentWillUnmount() {
    const { $ } = this.context;

    $.page.hideFixedTextarea();
  }

  render() {
    const { className } = this.props;
    const { $ } = this.context;
    const { show, onSubmit } = $.getState('_fixedTextarea');
    const { replayDefContent, lotteryUser = {}, _loaded } = $.getState('detail');

    if (!_loaded || lotteryUser.userId) {
      return null;
    }

    return (
      <>
        <FixedTextarea
          show={show}
          showEmoji={false}
          showCoin
          value={replayDefContent}
          onSubmit={onSubmit}
          onClose={$.page.hideFixedTextarea}
        />
        {!show && (
          <FixedInput
            className={classNames(prefixCls, className)}
            onInputClick={$.page.onCommentClick}
            placeholder="点击参与踩楼"
          />
        )}
      </>
    );
  }
}
