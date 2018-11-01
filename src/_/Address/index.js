/**
 * const prefixCls = 'style-203496';
 * const images = '/static/images/src/_/Address';
 * @Author: czy0729
 * @Date: 2018-07-05 15:56:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-05 15:59:42
 * @Path m.benting.com.cn /src/_/Address/index.js
 */
import React from 'react';
import Utils from '@utils';

const Address = props => {
  const { address, long, lat, className } = props;

  return (
    <p
      className={className}
      onClick={() =>
        Utils.router.push(`/map?id=${long}-${lat}`, `/map/${long}-${lat}`)
      }
    >
      {address}
    </p>
  );
};

export default Address;
