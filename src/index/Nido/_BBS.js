/**
 * const prefixCls = 'style-125869';
 * const images = '/static/images/src/index/Nido';
 * @Author: czy0729
 * @Date: 2018-06-28 18:40:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-22 18:54:06
 * @Path m.benting.com.cn /src/index/Nido/_BBS.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { List } from '@components';
import { Header, ListRow } from '@_';

const prefixCls = 'style-125869';

const _BBS = (props, { $ }) => {
  const { className } = props;
  const { list } = $.getState('bbs');

  return (
    <div className={classNames(prefixCls, className)}>
      <Header title="牛贴赏析" href="/bbs?id=2" as="/bbs/2" isList />
      <List>
        {list.map(item => (
          <ListRow
            key={item.threadId}
            userId={item.userId}
            img={item.faceImg}
            vip={item.vip}
            name={item.niname}
            level={item.grade}
            createTime={item.createTime}
            title={item.title}
            likeCount={item.likeAdd}
            commentCount={item.replyNum}
            href={`/bbs/article?id=${item.threadId}`}
            as={`/bbs/article/${item.threadId}`}
          />
        ))}
      </List>

      <style jsx>{`
        .style-125869 {
          min-height: 9.61rem;
        }
      `}</style>
    </div>
  );
};

_BBS.contextTypes = {
  $: PropTypes.object
};

export default observer(_BBS);
