/**
 * const prefixCls = 'style-774800';
 * const images = '/static/images/src/bbs/Article';
 * @Author: czy0729
 * @Date: 2018-07-12 18:39:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-29 12:20:20
 * @Path m.benting.com.cn /src/bbs/Article/_FixedTextarea.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { FixedTextarea, FixedInput, Icon } from '@components';
import Utils from '@utils';

const prefixCls = 'style-774800';

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
    const { show, placeholder, onSubmit } = $.getState('_fixedTextarea');

    return (
      <>
        <FixedTextarea
          show={show}
          placeholder={placeholder}
          showUploadPicButton
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
      </>
    );
  }
}
