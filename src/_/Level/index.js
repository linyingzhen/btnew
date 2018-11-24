/**
 * const prefixCls = 'style-999440';
 * const images = '/static/images/src/_/Level';
 * @Author: czy0729
 * @Date: 2018-07-05 14:02:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-16 16:25:06
 * @Path m.benting.com.cn /src/_/Level/index.js
 */
import React from 'react';
import classNames from 'classnames';
import Const from '@const';
import Utils from '@utils';

const prefixCls = 'style-999440';
const images = Utils.cdn('/static/images/src/_/Level');

const Level = props => {
  const { value, className, size, ...other } = props;

  if (!value) return null;

  return (
    <React.Fragment>
      <img
        className={classNames(prefixCls, className)}
        src={`${images}/${value}${Const.__IMG_DPR__}.png`}
        alt={value}
        {...other}
      />

      <style jsx>{`
        .style-999440 {
          width: 0.42rem;
          height: 0.38rem;
          vertical-align: middle;
        }
      `}</style>
    </React.Fragment>
  );
};

export default Level;
