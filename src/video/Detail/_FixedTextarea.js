/**
 * const prefixCls = 'style-117097';
 * const images = '/static/images/src/video/Detail';
 * @Author: czy0729
 * @Date: 2018-07-22 15:40:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-22 15:42:19
 * @Path m.benting.com.cn /src/video/Detail/_FixedTextarea.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { FixedTextarea, FixedInput, Icon } from '@components';
import Utils from '@utils';

const prefixCls = 'style-117097';

const _FixedTextarea = (props, { $ }) => {
  const { className } = props;
  const { show, placeholder, onSubmit } = $.getState('_fixedTextarea');

  return (
    <React.Fragment>
      <FixedTextarea
        show={show}
        placeholder={placeholder}
        onSubmit={onSubmit}
        onClose={$.page.hideFixedTextarea}
      />
      {!show && (
        <FixedInput
          className={classNames(prefixCls, className)}
          onInputClick={$.page.onCommentClick}
        >
          <Icon
            className="t-48"
            type="gift"
            onClick={() => Utils.checkLogin($.page.showReward)}
          />
        </FixedInput>
      )}
    </React.Fragment>
  );
};

_FixedTextarea.contextTypes = {
  $: PropTypes.object
};

export default observer(_FixedTextarea);
