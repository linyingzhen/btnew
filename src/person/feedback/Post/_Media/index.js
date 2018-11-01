/**
 * const prefixCls = 'style-116077';
 * const images = '/static/images/src/person/feedback/Post/_Media';
 * @Author: czy0729
 * @Date: 2018-09-08 18:02:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 18:03:22
 * @Path m.benting.com.cn /src/person/feedback/Post/_Media/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import Styles from '@styles';
import Img from './_Img';
import Upload from './_Upload';
import Progress from './_Progress';

const prefixCls = 'style-116077';

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
      <Upload />
      <Progress className="mt-md" />

      <style jsx>{`
        .style-116077 {
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
