/**
 * const prefixCls = 'style-171898';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-12 11:08:40
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-12 14:14:49
 * @Path bt_mb_new \src\person\welfare\Other\_Top.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from '@styles';
import { observer } from '@';

const prefixCls = 'style-171898';

const _Top = props => {
  const { className } = props;
  return (
    <div className={classNames(prefixCls, className)}>
      <p className="t-26 l-36 t-sub t-c">尊享特权 精彩不停</p>
      <style jsx>{`
        .style-171898 {
          height: 3.2rem;
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
