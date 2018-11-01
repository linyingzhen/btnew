/**
 * const prefixCls = 'style-144997';
 * const images = '/static/images/src/index/Home';
 * @Author: czy0729
 * @Date: 2018-10-21 20:43:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-30 00:39:48
 * @Path bt_mb_new /src/index/Home/_Notice.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon } from '@components';
import Styles from '@styles';
import G from '@stores/g';

const prefixCls = 'style-144997';

const _Notice = (props, { $ }) => {
  const { className } = props;
  const mounted = G.getState('mounted');
  const { isRead = false, count = 0 } = G.getState('indexNotice');

  if (!mounted || isRead) {
    return null;
  }

  return (
    <Flex
      className={classNames(prefixCls, className)}
      justify="center"
      onClick={$.page.noticeClick}
    >
      <Icon className="t-32" type="notice" />
      <p className="t-28 l-40 ml-24">您有未读新公告</p>
      <span className="ml-24" style={Styles._badgeFill}>
        {count}
      </span>

      <style jsx global>{`
        .style-144997 {
          padding: 0.24rem 0;
          background: ${Styles.color_theme};
        }
      `}</style>
    </Flex>
  );
};

_Notice.contextTypes = {
  $: PropTypes.object
};

export default observer(_Notice);
