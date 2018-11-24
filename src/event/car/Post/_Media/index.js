/**
 * const prefixCls = 'style-246976';
 * const images = '/static/images/src/event/car/Post/_Media';
 * @Author: czy0729
 * @Date: 2018-11-08 11:45:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-08 14:29:14
 * @Path bt_mb_new /src/event/car/Post/_Media/index.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import Styles from '@styles';
import Img from './_Img';
import Upload from './_Upload';
import Progress from './_Progress';

const prefixCls = 'style-246976';

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
        .style-246976 {
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
