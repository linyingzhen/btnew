/**
 * const prefixCls = 'style-212006';
 * const images = '/static/images/src/_/ZoneRow';
 * @Author: czy0729
 * @Date: 2018-07-29 15:55:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-01 16:23:37
 * @Path m.benting.com.cn /src/_/ZoneRow/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { List, Flex, Icon, Video } from '@components';
import Utils from '@utils';
import Date from '../Date';
import Imgs from '../Imgs';

const prefixCls = 'style-212006';

const ZoneRow = props => {
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
                    Utils.onConfirm('删除后不能恢复，确定删除?', () =>
                      onDelete(id));
                  }}
                >
                  <Icon className="t-32 t-icon" type="delete-fill" />
                  <span className="t-30 l-42 t-sub ml-xs">删除</span>
                </Flex>
              )}
            </Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>
    </List.Item>
  );
};

export default observer(ZoneRow);
