/**
 * const prefixCls = 'style-117881';
 * const images = '/static/images/src/discovery/fish/Post/_Media';
 * @Author: czy0729
 * @Date: 2018-08-11 15:53:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-11 15:56:28
 * @Path m.benting.com.cn /src/discovery/fish/Post/_Media/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import Styles from '@styles';
import Img from './_Img';
import Video from './_Video';
import Upload from './_Upload';
import Progress from './_Progress';

const prefixCls = 'style-117881';

const _Media = (props, { $ }) => {
  const { className } = props;
  const { type, files } = $.getState('_media');

  return (
    <div className={classNames(prefixCls, className)}>
      {type === 'image' &&
        files.map((item, index) => (
          <Img
            key={`${item.targetPath}/${item.name}`}
            index={index}
            {...item}
          />
        ))}
      {type === 'video' &&
        files.map(item => <Video key={item.name} {...item} />)}
      <Upload />
      <Progress className="mt-md" />

      <style jsx>{`
        .style-117881 {
          padding: 0.24rem ${Styles.wind};
          background: ${Styles.color_theme};
        }
      `}</style>
    </div>
  );
};

_Media.contextTypes = {
  $: PropTypes.object
};

export default observer(_Media);
