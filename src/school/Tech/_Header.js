/**
 * const prefixCls = 'style-177133';
 * const images = '/static/images/src/school/Tech';
 * @Author: czy0729
 * @Date: 2018-09-06 14:38:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-06 14:41:42
 * @Path m.benting.com.cn /src/school/Tech/_Header.js
 */
import React from 'react';
import { Header, Icon } from '@components';
import Utils from '@utils';

const _Header = () => (
  <Header
    show
    hd={
      <Icon
        className="t-34 t-void t-b"
        type="left"
        onClick={Utils.router.back}
      />
    }
    bd={null}
    style={{ background: 'transparent' }}
  />
);

export default _Header;
