/**
 * const prefixCls = 'style-384448';
 * const images = '/static/images/src/discovery/fish/Post/_Media';
 * @Author: czy0729
 * @Date: 2018-08-11 15:54:08
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-08-11 15:54:08
 * @Path m.benting.com.cn /src/discovery/fish/Post/_Media/_Video.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Video, Button } from '@components';
import Utils from '@utils';

const prefixCls = 'style-384448';

const _Video = (props, { $ }) => {
  const { targetPath, surface, size, className } = props;

  return (
    <div className={classNames(prefixCls, className)}>
      <Video
        src={targetPath}
        poster={Utils.getImgUrl(surface)}
        fileSize={size}
        playSecond={props.play_time}
        placeholderPublish
      />
      <Button className="mt-md" type="primary" ghost onClick={$.page.delete}>
        删除视频
      </Button>
    </div>
  );
};

_Video.contextTypes = {
  $: PropTypes.object
};

export default observer(_Video);
