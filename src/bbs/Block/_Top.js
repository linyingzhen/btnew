/**
 * const prefixCls = 'style-930756';
 * const images = '/static/images/src/bbs/Block';
 * @Author: czy0729
 * @Date: 2018-10-21 22:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-21 22:36:57
 * @Path bt_mb_new /src/bbs/Block/_Top.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { List } from '@components';
import { observer } from '@';
import Styles from '@styles';

const prefixCls = 'style-930756';

const _Top = (props, { $ }) => {
  const { className } = props;
  const { list } = $.getState('top');

  if (!list.length) {
    return null;
  }

  return (
    <List className={classNames(prefixCls, className)}>
      {list.map(item => (
        <List.Item
          key={item.threadId}
          thumb={<span className="t-30 l-42 t-primary">置顶</span>}
          href={`/bbs/article?id=${item.threadId}`}
          as={`/bbs/article/${item.threadId}`}
        >
          <p className="t-30 l-42 t-c1">{item.title}</p>
        </List.Item>
      ))}

      <style jsx global>{`
        .style-930756 {
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
