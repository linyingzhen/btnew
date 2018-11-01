/**
 * const prefixCls = 'style-195722';
 * const images = '/static/images/src/person/feedback/Post/_Media';
 * @Author: czy0729
 * @Date: 2018-09-08 18:03:38
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-09-08 18:03:38
 * @Path m.benting.com.cn /src/person/feedback/Post/_Media/_Img.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-195722';

const _Img = (props, { $ }) => {
  const { index, targetPath, name, fileId, className } = props;

  return (
    <div
      className={classNames(prefixCls, className)}
      style={{
        backgroundImage: `url(${Utils.getAppImgUrl(
          fileId || `${targetPath}/${name}`
        )})`
      }}
    >
      <Icon
        className={`${prefixCls}__clear t-24 t-void`}
        type="cross"
        onClick={() => $.page.delete(index)}
      />

      <style jsx global>{`
        .style-195722 {
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 1.96rem;
          height: 1.96rem;
          margin: 0 0.24rem 0.24rem 0;
          ${Styles._bg};
          border: ${Styles.border};
          border-radius: ${Styles.radius_sm};
          overflow: hidden;
        }
        .${prefixCls}__clear {
          position: absolute;
          top: 0.08rem;
          right: 0.08rem;
          padding: 0.08rem;
          background: rgba(0, 0, 0, 0.48);
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

_Img.contextTypes = {
  $: PropTypes.object
};

export default observer(_Img);
