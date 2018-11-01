/**
 * const prefixCls = 'style-132060';
 * const images = '/static/images/src/person/feedback/Post';
 * @Author: czy0729
 * @Date: 2018-09-08 17:31:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-31 18:13:54
 * @Path m.benting.com.cn /src/person/feedback/Post/_Header.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Header, Icon } from '@components';
import Utils from '@utils';

const _Header = (props, { $ }) => (
  <Header
    show
    hd={<Icon className="t-34" type="cross" onClick={Utils.router.back} />}
    bd="反馈"
    ft={
      <span className="t-34 l-48 t-primary" onClick={$.do.submit}>
        提交
      </span>
    }
  />
);

_Header.contextTypes = {
  $: PropTypes.object
};

export default observer(_Header);
