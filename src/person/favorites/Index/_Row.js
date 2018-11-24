/**
 * const prefixCls = 'style-101601';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-10-31 14:44:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-02 09:55:12
 * @Path bt_mb_new \src\person\favorites\Index\_Row.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import ZoneRow from './_ZoneRow';
import Utils from '@utils';
import { discoveryInfoTypeDS } from '@ds';
import { discoveryImages, orderTabs } from './ds';

const _Row = (props, { $ }) => {
  const { page } = $.getState('_affixTabs');

  let label;
  let rowProps = {};
  switch (orderTabs[page].title) {
    case '帖子':
      rowProps = {
        id: props.threadId,
        title: props.title,
        desc: props.content,
        createTime: props.createTime,
        likeCount: props.likeAdd,
        commentCount: props.replyNum,
        imgs: Utils.getRealDraftEntityMap(JSON.parse(props.json)),
        href: `/bbs/article?id=${props.threadId}`,
        as: `/bbs/article/${props.threadId}`,
        onDelete: $.do.delete
      };
      break;

    case '视频':
      rowProps = {
        title: props.tit,
        desc: props.introCon,
        createTime: props.createTime,
        likeCount: props.likeCount,
        commentCount: props.recomNo,
        video: {
          filePath: props.fileinfo.path,
          sfPath: props.fileinfo.surface,
          fileSize: props.fileinfo.size,
          playSeconds: props.fileinfo.play_time
        },
        href: `/video/detail?id=${props.tbId}`,
        as: `/video/detail/${props.tbId}`
      };
      break;

    // 发现
    default:
      label = Utils.getLabel(discoveryInfoTypeDS, props.infoType);
      rowProps = {
        id: props.infoId,
        title: props.con,
        createTime: props.publishTime,
        likeCount: props.likeCount,
        commentCount: props.commentCount,
        href: `/discovery/detail?id=${props.infoId}`,
        as: `/discovery/detail/${props.infoId}`,
        onDelete: $.do.delete
      };

      switch (label) {
        case '视频':
          rowProps.video = { ...props.fileList[0] };
          break;

        case '图文':
          rowProps.imgs = props.fileList.map(props => props.fileId);
          break;

        case '金币红包':
        case '积分红包':
        case '现金红包':
          rowProps.title = label;
          rowProps.imgs = [`${discoveryImages}/red-user-none.png`];
          break;

        default:
          break;
      }
  }

  return <ZoneRow {...rowProps} />;
};

_Row.contextTypes = {
  $: PropTypes.object
};

export default observer(_Row);
