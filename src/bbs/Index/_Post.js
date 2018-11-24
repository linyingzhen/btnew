/**
 * const prefixCls = 'style-729139';
 * const images = '/static/images/src/bbs/Index';
 * @Author: czy0729
 * @Date: 2018-07-10 16:34:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-16 16:47:05
 * @Path m.benting.com.cn /src/bbs/Index/_Post.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { AffixTabs, ListView, Button } from '@components';
import { ListRow } from '@_';
import Utils from '@utils';
import { tabsDS } from './ds';

const prefixCls = 'style-729139';

const _Post = (props, { $ }) => {
  const { className } = props;
  const { page } = $.getState('_affixTabs');
  const { like = [] } = $.getState('bbsLikeAndFavorList').list || {};
  const post = $.getState('post');

  return (
    <div className={classNames(prefixCls, className)}>
      <AffixTabs
        tabs={tabsDS}
        page={page}
        extra={
          <Button
            type="primary"
            size="xs"
            inline
            onClick={() =>
              Utils.checkLogin(() => Utils.router.push('/bbs/post'))
            }
          >
            发帖
          </Button>
        }
        onTabClick={$.page.onTabClick}
      >
        <ListView
          data={post}
          refresh
          renderRow={item => (
            <ListRow
              userId={item.userId}
              img={item.faceImg}
              vip={item.vip}
              role={item.role}
              name={item.niname}
              level={item.grade}
              createTime={item.createTime}
              title={item.title}
              like={like.indexOf(String(item.threadId)) !== -1}
              likeCount={item.likeAdd}
              commentCount={item.replyNum}
              spec={item.isDigest === 1}
              contentImg={item.contentImg}
              href={`/bbs/article?id=${item.threadId}`}
              as={`/bbs/article/${item.threadId}`}
            />
          )}
          onEndReached={$.fetch.post}
        />
      </AffixTabs>
    </div>
  );
};

_Post.contextTypes = {
  $: PropTypes.object
};

export default observer(_Post);
