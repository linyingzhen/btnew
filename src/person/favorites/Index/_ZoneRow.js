/**
 * const prefixCls = 'style-289373';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-10-31 11:38:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-02 09:51:28
 * @Path bt_mb_new \src\person\favorites\Index\__ZoneRow.js.git
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { List, Flex, Icon, Video } from '@components';
import Utils from '@utils';
import Date from '@_/Date';
import Imgs from '@_/Imgs';

const prefixCls = 'style-289373';

const _ZoneRow = props => {
  const {
    id,
    imgs,
    video,
    title,
    desc,
    createTime,
    likeCount,
    commentCount,
    href,
    as,
    onDelete,
    className
  } = props;

  return (
    <List.Item className={classNames(prefixCls, className)} href={href} as={as}>
      <Flex align="start">
        <Date time={createTime} />
        <Flex.Item className="ml-24">
          <p className="t-30 l-42">{title}</p>
          {desc && <p className="t-24 t-sub t-c2 mt-8">{desc}</p>}
          {imgs && <Imgs className="mt-24" data={imgs} />}
          {video && (
            <Video
              className="mt-24"
              src={video.filePath}
              poster={video.sfPath}
              fileSize={video.fileSize}
              playSecond={video.playSeconds}
              height="44vw"
              isPoster
            />
          )}
          <Flex className="mt-24">
            <Flex.Item>
              <Flex>
                <Icon className="t-32 t-icon" type="like-fill" />
                <span className="t-30 l-42 t-sub ml-xs">{likeCount}</span>
              </Flex>
            </Flex.Item>
            <Flex.Item>
              <Flex>
                <Icon className="t-32 t-icon" type="comment-fill" />
                <span className="t-30 l-42 t-sub ml-xs">{commentCount}</span>
              </Flex>
            </Flex.Item>
            <Flex.Item>
              {typeof onDelete === 'function' && (
                <Flex
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    Utils.onConfirm('取消收藏后不能恢复，确定取消?', () =>
                      onDelete(id));
                  }}
                >
                  <Icon className="t-32 t-icon" type="delete-fill" />
                  <span className="t-30 l-42 t-sub ml-xs">取消收藏</span>
                </Flex>
              )}
            </Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>
    </List.Item>
  );
};

export default observer(_ZoneRow);
