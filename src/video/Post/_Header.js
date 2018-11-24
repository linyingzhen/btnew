/**
 * const prefixCls = 'style-204189';
 * const images = '/static/images/src/video/Post';
 * @Author: czy0729
 * @Date: 2018-11-05 09:16:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-05 16:44:56
 * @Path bt_mb_new /src/video/Post/_Header.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Header, Icon } from '@components';
import Utils from '@utils';

const _Header = ({ form, onSubmit }, { $ }) => (
  <Header
    show
    hd={<Icon className="t-34" type="cross" onClick={Utils.router.back} />}
    bd="发布视频"
    ft={
      <span
        className="t-34 l-48 t-primary"
        onClick={() => onSubmit(form, $.do.submit)}
      >
        发布
      </span>
    }
  />
);

_Header.contextTypes = {
  $: PropTypes.object
};

export default observer(_Header);
