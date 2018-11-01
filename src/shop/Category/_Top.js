/**
 * const prefixCls = 'style-176145';
 * const images = '/static/images/src/shop/Category';
 * @Author: czy0729
 * @Date: 2018-09-29 18:28:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-30 09:51:27
 * @Path m.benting.com.cn /src/shop/Category/_Top.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import Styles from '@styles';

const prefixCls = 'style-176145';

const _Top = (props, { $ }) => {
  const { className } = props;
  const { pageinfo } = $.getState('goods');

  return (
    <div className={classNames(prefixCls, className)}>
      <div className="info">
        <p className="t-30 l-42 t-void t-c">{$.typeName || '-'}</p>
        <p className="t-24 l-34 t-void t-c mt-4">
          ({pageinfo.recordtotal || '-'}
          商品)
        </p>
      </div>

      <style jsx>{`
        .style-176145 {
        }
        .info {
          padding: ${Styles.wind} 0;
          background: ${Styles.color_main};
        }
      `}</style>
    </div>
  );
};

_Top.contextTypes = {
  $: PropTypes.object
};

export default observer(_Top);
