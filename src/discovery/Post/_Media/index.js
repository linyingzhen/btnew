/**
 * const prefixCls = 'style-525702';
 * const images = '/static/images/src/discovery/Post/_Media';
 * @Author: czy0729
 * @Date: 2018-07-23 15:21:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-24 09:35:15
 * @Path m.benting.com.cn /src/discovery/Post/_Media/index.js
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

const prefixCls = 'style-525702';

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
        .style-525702 {
          padding: 0 ${Styles.wind};
        }
      `}</style>
    </div>
  );
};

_Media.contextTypes = {
  $: PropTypes.object
};

export default observer(_Media);
