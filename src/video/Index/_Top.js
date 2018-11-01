/**
 * const prefixCls = 'style-172177';
 * const images = '/static/images/src/video/Index';
 * @Author: czy0729
 * @Date: 2018-07-19 09:39:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-26 12:00:26
 * @Path m.benting.com.cn /src/video/Index/_Top.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { List } from '@components';
import { observer } from '@';
import Styles from '@styles';

const prefixCls = 'style-172177';

const _Top = (props, { $ }) => {
  const { className } = props;
  const videoTop = $.getState('videoTop');

  return (
    <List className={classNames(prefixCls, className)}>
      {videoTop.list.map(item => (
        <List.Item
          key={item.tbId}
          thumb={<span className="t-30 l-42 t-primary">置顶</span>}
          href={`/video/detail?id=${item.tbId}`}
          as={`/video/detail/${item.tbId}`}
        >
          <p className="t-30 l-42 t-c1">{item.tit}</p>
        </List.Item>
      ))}

      <style jsx global>{`
        .style-172177 {
          min-height: 1.81rem;
          background: ${Styles.color_theme};
        }
      `}</style>
    </List>
  );
};

_Top.contextTypes = {
  $: PropTypes.object
};

export default observer(_Top);
