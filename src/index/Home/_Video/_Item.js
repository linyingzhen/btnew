/**
 * const prefixCls = 'style-195215';
 * const images = '/static/images/src/index/Home/_Video';
 * @Author: czy0729
 * @Date: 2018-08-02 12:41:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-12 16:22:56
 * @Path m.benting.com.cn /src/index/Home/_Video/_Item.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Link, Video } from '@components';
import Utils from '@utils';

const prefixCls = 'style-195215';

const _Item = ({ tbId, fileinfo = {}, tit, userName, createTime }) => (
  <Link
    className={prefixCls}
    href={`/video/detail?id=${tbId}`}
    as={`/video/detail/${tbId}`}
  >
    <Video
      className={`${prefixCls}__thumb`}
      poster={Utils.getAppImgUrl(fileinfo.surface, 'scale')}
      playSecond={fileinfo.play_time}
      height={0}
      isPoster
    />
    <div className="info">
      <p className="p-title p-28 l-40 t-c2">{tit}</p>
      <p className="t-22 l-32 t-sub t-c1 mt-8">
        {userName} · {Utils.lastDate(createTime)}
      </p>
    </div>

    <style jsx global>{`
      .style-195215 {
        display: inline-block;
        width: 44%;
        margin-left: 0.24rem;
        border-radius: 0.06rem;
        box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 0, 0, 0.15);
      }
      .${prefixCls}:nth-of-type(1),
      .${prefixCls}:nth-of-type(5) {
        margin-left: 0;
      }
      .${prefixCls}:nth-of-type(5),
      .${prefixCls}:nth-of-type(6),
      .${prefixCls}:nth-of-type(7),
      .${prefixCls}:nth-of-type(8) {
        margin-top: 0.22rem;
      }
      .${prefixCls}__thumb {
        width: 100%;
        padding-bottom: 68%;
        border-top-left-radius: 0.06rem;
        border-top-right-radius: 0.06rem;
      }
      .${prefixCls}__thumb .img-play {
        width: 28% !important;
        height: initial !important;
      }
    `}</style>
    <style jsx>{`
      .style-195215 {
        min-height: 10.16rem;
      }
      .info {
        padding: 0.12rem 0.24rem;
      }
      .p-title {
        height: 0.8rem;
        white-space: initial;
      }
    `}</style>
  </Link>
);

_Item.contextTypes = {
  $: PropTypes.object
};

export default observer(_Item);
