/**
 * const prefixCls = 'style-158258';
 * const images = '/static/images/src/bbs/floor/Index';
 * @Author: czy0729
 * @Date: 2018-09-04 14:44:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-14 18:34:51
 * @Path m.benting.com.cn /src/bbs/floor/Index/store.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'antd-mobile';
import { observer } from '@';
import { ListView } from '@components';
import { ListRow } from '@_';
import Styles from '@styles';

const prefixCls = 'style-158258';

const Processing = () => (
  <Badge className="ml-sm" text="进行中" style={Styles._badge} />
);

const End = () => (
  <Badge
    className="ml-sm"
    text="已结束"
    style={{
      ...Styles._badge,
      color: Styles.color_sub,
      borderColor: Styles.color_sub
    }}
  />
);

const _Post = (props, { $ }) => {
  const post = $.getState('post');
  const { time } = $.getState('time');

  return (
    <>
      <ListView
        data={post}
        renderRow={({
          contentImg,
          createTime,
          endTime,
          likeAdd,
          replyNum,
          threadId,
          title,
          userId
        }) => (
          <ListRow
            className={`${prefixCls}__item`}
            userId={userId}
            createTime={createTime}
            title={title}
            titleExtra={time < endTime ? Processing : End}
            contentImg={contentImg}
            likeCount={likeAdd}
            commentCount={replyNum}
            href={`/bbs/floor/detail?id=${threadId}`}
            as={`/bbs/floor/detail/${threadId}`}
            login
          />
        )}
        onEndReached={$.fetch.post}
      />

      <style jsx global>{`
        .style-158258 {
        }
        .${prefixCls}__item {
          padding-left: 0 !important;
        }
      `}</style>
    </>
  );
};

_Post.contextTypes = {
  $: PropTypes.object
};

export default observer(_Post);
