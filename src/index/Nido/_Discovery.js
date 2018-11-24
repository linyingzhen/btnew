/**
 * const prefixCls = 'style-903950';
 * const images = '/static/images/src/index/Nido';
 * @Author: czy0729
 * @Date: 2018-06-25 18:33:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-16 16:55:44
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
        {list.map(
          ({
            fileList = [],
            infoId,
            userId,
            faceImg,
            vip,
            role,
            niname,
            grade,
            publishTime,
            con,
            likeCount,
            commentCount
          }) => (
            <ListRow
              key={infoId}
              contentImg={fileList.map(item => item.fileId)}
              userId={userId}
              img={faceImg}
              vip={vip}
              role={role}
              name={niname}
              level={grade}
              createTime={publishTime}
              title={con}
              likeCount={likeCount}
              commentCount={commentCount}
              href={`/discovery/detail?id=${infoId}`}
              as={`/discovery/detail/${infoId}`}
            />
          )
        )}
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
