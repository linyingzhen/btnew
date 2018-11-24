/**
 * const prefixCls = 'style-220544';
 * const images = '/static/images/src/index/Home/_Video';
 * @Author: czy0729
 * @Date: 2018-08-02 12:40:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-11 10:25:37
 * @Path m.benting.com.cn /src/index/Home/_Video/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Header } from '@_';
import { Link, Video } from '@components';
import Styles from '@styles';
import Item from './_Item';

const prefixCls = 'style-220544';

const _Video = (props, { $ }) => {
  const { className } = props;
  const { list } = $.getState('videos');
  const [first = { fileinfo: {} }, ...left] = list;

  return (
    <div className={classNames(prefixCls, className)}>
      <Header title="视频推荐" href="/video?id=0" as="/video/0" />
      <Video
        src={first.fileinfo.path}
        poster={first.fileinfo.surface}
        fileSize={first.fileinfo.size}
        playSecond={first.fileinfo.play_time}
        onClick={e => e.preventDefault()}
      />
      <Link
        className="p-w t-32 t-b mt-24"
        href={`/video/detail?id=${first.tbId}`}
        as={`/video/detail/${first.tbId}`}
      >
        {first.tit}
      </Link>
      <div className="wrap tool-wrap-scroll mt-36">
        {(left || []).map(item => (
          <Item key={item.tbId} {...item} />
        ))}
      </div>

      <style jsx>{`
        .style-220544 {
          padding-bottom: ${Styles.bottom};
          background: ${Styles.color_theme};
        }
        .wrap {
          padding: 0 ${Styles.wind} 0.08rem;
        }
      `}</style>
    </div>
  );
};

_Video.contextTypes = {
  $: PropTypes.object
};

export default observer(_Video);
