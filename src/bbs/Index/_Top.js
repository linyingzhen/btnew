/**
 * const prefixCls = 'style-145408';
 * const images = '/static/images/src/bbs/Index';
 * @Author: czy0729
 * @Date: 2018-08-06 10:09:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-16 15:48:31
 * @Path m.benting.com.cn /src/bbs/Index/_Top.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { List } from '@components';
import { observer } from '@';
import Styles from '@styles';

const prefixCls = 'style-145408';

const _Top = (props, { $ }) => {
  const { className } = props;
  const { list } = $.getState('top');

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
        .style-145408 {
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
