/**
 * const prefixCls = 'style-903950';
 * const images = '/static/images/src/index/Nido';
 * @Author: czy0729
 * @Date: 2018-06-25 18:33:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-22 18:53:58
 * @Path m.benting.com.cn /src/index/Nido/_Discovery.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { List } from '@components';
import { Header, ListRow } from '@_';

const prefixCls = 'style-903950';

const _Discovery = (props, { $ }) => {
  const { className } = props;
  const { list } = $.getState('discovery');

  return (
    <div className={classNames(prefixCls, className)}>
      <Header
        title="发现精选"
        href="/discovery?id=1"
        as="/discovery/1"
        isList
      />
      <List>
        {list.map(item => (
          <ListRow
            key={item.infoId}
            userId={item.userId}
            img={item.faceImg}
            vip={item.vip}
            name={item.niname}
            level={item.grade}
            createTime={item.publishTime}
            title={item.con}
            likeCount={item.likeCount}
            commentCount={item.commentCount}
            href={`/discovery/detail?id=${item.infoId}`}
            as={`/discovery/detail/${item.infoId}`}
          />
        ))}
      </List>

      <style jsx>{`
        .style-903950 {
          min-height: 9.61rem;
        }
      `}</style>
    </div>
  );
};

_Discovery.contextTypes = {
  $: PropTypes.object
};

export default observer(_Discovery);
