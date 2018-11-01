/**
 * const prefixCls = 'style-167283';
 * const images = '/static/images/src/school/_/VideoItem';
 * @Author: czy0729
 * @Date: 2018-09-06 14:47:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-06 16:16:05
 * @Path m.benting.com.cn /src/school/_/VideoItem/index.js
 */
import React from 'react';
import { observer } from '@';
import { List, Video } from '@components';
import Utils from '@utils';

const prefixCls = 'style-188332';

const VideoItem = props => {
  const { tbId, fileinfo = {}, tit, viewCount, likeCount } = props;
  const { surface } = fileinfo;

  return (
    <List.Item
      className={prefixCls}
      thumb={
        <div className="thumb">
          <Video
            poster={Utils.getAppImgUrl(surface, 'scale')}
            height="1.48rem"
            isPoster
          />
        </div>
      }
      href={`/video/detail?id=${tbId}`}
      as={`/video/detail/${tbId}`}
    >
      <div className="wrap">
        <p className="t-30 l-42 t-c2">{tit}</p>
        <p className="t-24 l-34 t-sub mt-8">
          播放 {viewCount} / 点赞 {likeCount}
        </p>
      </div>

      <style jsx>{`
        .style-188332 {
        }
        .thumb {
          width: 2.2rem;
          padding: 0.32rem 0;
        }
        .thumb :global(.c-video) {
          border-radius: 0.04rem;
        }
        .thumb :global(.img-play) {
          width: 0.8rem !important;
          height: 0.8rem !important;
        }
        .wrap {
          height: 1.24rem;
        }
      `}</style>
    </List.Item>
  );
};

export default observer(VideoItem);
