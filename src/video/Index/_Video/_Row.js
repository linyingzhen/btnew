/**
 * const prefixCls = 'style-336285';
 * const images = '/static/images/src/video/Index/_Video';
 * @Author: czy0729
 * @Date: 2018-07-19 11:19:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-02 12:08:17
 * @Path m.benting.com.cn /src/video/Index/_Video/_Row.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { List, Flex, Icon, Link, Video } from '@components';
import { Author } from '@_';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-336285';

const _Row = props => {
  const {
    commentCount,
    createTime,
    face,
    fileinfo = {},
    likeCount,
    tag = [],
    tbId,
    tit,
    userId,
    userName,
    className
  } = props;

  return (
    <List.Item className={classNames(prefixCls, className)}>
      <Author
        userId={userId}
        img={face}
        name={userName}
        date={Utils.lastDate(createTime)}
        right={!!tag.length && ` | ${tag.map(item => item.label).join('、')}`}
      />
      <Link
        className="mt-28"
        href={`/video/detail?id=${tbId}`}
        as={`/video/detail/${tbId}`}
        block
      >
        <p className="t-34 l-48 ls-o1">{tit}</p>
        <Video
          className={`${prefixCls}__poster mt-24`}
          src={fileinfo.path}
          poster={fileinfo.surface}
          fileSize={fileinfo.size}
          playSecond={fileinfo.play_time}
          height="44vw"
          isPoster
          posterAnimate={false}
        />
      </Link>
      <Flex className="mt-24">
        <Flex.Item>
          <Flex justify="center">
            <Icon className="t-28 t-icon" type="like-fill" />
            <span className="t-24 l-34 t-sub ls-o1 ml-sm">
              {parseInt(likeCount) || '点赞'}
            </span>
          </Flex>
        </Flex.Item>
        <Flex.Item>
          <Flex justify="center">
            <Icon className="t-32 t-icon" type="comment-fill" />
            <span className="t-24 l-34 t-sub ls-o1 ml-sm">
              {parseInt(commentCount) || '评论'}
            </span>
          </Flex>
        </Flex.Item>
        <Flex.Item>
          <Flex justify="center" onClick={Utils.u}>
            <Icon className="t-32 t-icon" type="share-fill" />
            <span className="t-24 l-34 t-sub ls-o1 ml-sm">分享</span>
          </Flex>
        </Flex.Item>
      </Flex>

      <style jsx global>{`
        .style-336285 {
        }
        .${prefixCls}__poster {
          width: 100%;
          padding-bottom: 36%;
          border-radius: ${Styles.radius_sm};
        }
      `}</style>
    </List.Item>
  );
};

export default observer(_Row);
