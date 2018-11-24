/**
 * const prefixCls = 'style-779054';
 * const images = '/static/images/src/index/Nido';
 * @Author: czy0729
 * @Date: 2018-11-12 17:08:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-13 15:46:41
 * @Path bt_mb_new /src/index/Nido/_Prize.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { List, Flex } from '@components';
import { Header, ListRow } from '@_';
import Styles from '@styles';

const prefixCls = 'style-903950';

const _Discovery = (props, { $ }) => {
  const { className } = props;
  const { list } = $.getState('prize');

  return (
    <div className={classNames(prefixCls, className)}>
      <Header
        title="有奖专区"
        href="/bbs/block?id=77"
        as="/bbs/block/77"
        isList
      />
      <List>
        {list.map(
          ({ createTime, likeAdd, replyNum, threadId, title }, index) => (
            <ListRow
              key={threadId}
              thumb={
                <Flex
                  className={`${prefixCls}__num t-34 t-gold t-b`}
                  justify="center"
                >
                  {index + 1}
                </Flex>
              }
              createTime={createTime}
              title={title}
              likeCount={likeAdd}
              commentCount={replyNum}
              href={`/bbs/article?id=${threadId}`}
              as={`/bbs/article/${threadId}`}
            />
          )
        )}
      </List>

      <style jsx global>{`
        .style-903950 {
        }
        .${prefixCls}__num {
          width: 0.86rem;
          height: 0.86rem;
          border: 0.02rem solid ${Styles.color_gold};
        }
      `}</style>
    </div>
  );
};

_Discovery.contextTypes = {
  $: PropTypes.object
};

export default observer(_Discovery);
