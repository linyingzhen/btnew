/**
 * const prefixCls = 'style-212650';
 * const images = '/static/images/src/event/car/Post';
 * @Author: czy0729
 * @Date: 2018-11-08 17:14:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-10 11:38:35
 * @Path bt_mb_new /src/event/car/Post/_Header.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Header, Icon } from '@components';
import Utils from '@utils';

const _Header = (props, { $ }) => {
  const { form, onSubmit } = props;

  return (
    <Header
      show
      hd={<Icon className="t-34" type="cross" onClick={Utils.router.back} />}
      ft={
        <span
          className="t-34 l-48 t-primary"
          onClick={() => onSubmit(form, $.do.publish)}
        >
          提交
        </span>
      }
    />
  );
};

_Header.contextTypes = {
  $: PropTypes.object
};

export default observer(_Header);
