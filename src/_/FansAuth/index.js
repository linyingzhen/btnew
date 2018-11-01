/**
 * const prefixCls = 'style-189267';
 * const images = '/static/images/src/_/FansAuth';
 * @Author: czy0729
 * @Date: 2018-07-05 14:49:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-21 14:20:09
 * @Path m.benting.com.cn /src/_/FansAuth/index.js
 */
import React from 'react';
import classNames from 'classnames';
import Utils from '@utils';

const prefixCls = 'style-189267';
const images = Utils.cdn('/static/images/src/_/FansAuth');

const FansAuth = props => {
  const { value, className } = props;

  if (!value || value < 1) return null;

  return (
    <React.Fragment>
      <img
        className={classNames(prefixCls, className)}
        src={`${images}/${value}.png`}
        alt=""
      />

      <style jsx>{`
        .style-189267 {
          width: 0.34rem !important;
          height: 0.34rem !important;
          vertical-align: middle;
        }
      `}</style>
    </React.Fragment>
  );
};

export default FansAuth;
