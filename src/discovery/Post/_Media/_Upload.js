/**
 * const prefixCls = 'style-159399';
 * const images = '/static/images/src/discovery/Post/_Media';
 * @Author: czy0729
 * @Date: 2018-07-23 15:38:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-03 18:39:32
 * @Path m.benting.com.cn /src/discovery/Post/_Media/_Upload.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Flex, ActivityIndicator } from 'antd-mobile';
import { observer } from '@';
import { Upload, Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-159399';
const prefixClsImage = `${prefixCls}__upload-image`;
const prefixClsVideo = `${prefixCls}__upload-video`;

@observer
export default class _Upload extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  onUploadClick = () => {
    const { $ } = this.context;
    const { type } = $.getState('_media');

    if (!type) {
      Utils.actionSheet(
        ['照片', '视频'],
        index => {
          if (index === 0) {
            document.querySelector(`.${prefixClsImage} > input`).click();
          } else if (index === 1) {
            this.uploadVideo();
          }
        },
        {
          destructiveButtonIndex: undefined
        }
      );
    } else if (type === 'image') {
      document.querySelector(`.${prefixClsImage} > input`).click();
    }
  };

  uploadVideo = async () => {
    const { $ } = this.context;

    $.fetch.qiniuKey();

    document.querySelector(`.${prefixClsVideo} > input`).click();
  };

  beforeUploadImage = file => {
    const { $ } = this.context;
    const { files, type } = $.getState('_media');

    if (file.size / 1024 / 1024 > 10) {
      Utils.light('图片不能超过10M');
      return;
    }

    if (type === 'image' && files.length >= 9) {
      Utils.light('图片最多只能上传9个');
      return;
    }

    $.setState({ type: 'image' }, '_media');
  };

  beforeUploadVideo = file => {
    const { $ } = this.context;
    const { files, type } = $.getState('_media');

    if (file.size / 1024 / 1024 > 50) {
      Utils.light('视频不能超过50M');
      return;
    }

    if (type === 'video' && files.length >= 1) {
      Utils.light('视频最多只能上传1个');
      return;
    }

    $.setState({ type: 'video' }, '_media');
  };

  render() {
    const { $ } = this.context;
    const { files, type, uploading } = $.getState('_media');
    const qiniuFileKey = $.getState('qiniuFileKey');
    const { className } = this.props;

    if (
      (type === 'video' && files.length >= 1) ||
      (type === 'image' && files.length >= 9)
    ) {
      return null;
    }

    return (
      <div className={classNames(prefixCls, className)}>
        <Flex
          className={`${prefixCls}__item`}
          justify="center"
          onClick={uploading ? undefined : this.onUploadClick}
        >
          {uploading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Icon className="t-48" type="plus" />
          )}
        </Flex>
        <Upload
          className={`${prefixCls}__upload-image`}
          disabled={uploading}
          beforeUpload={this.beforeUploadImage}
          style={{ display: 'none' }}
          onProgress={$.page.uploadProgress}
          onSuccess={$.page.imageUploadSuccess}
          onError={$.page.uploadError}
        />
        <Upload
          className={`${prefixCls}__upload-video`}
          qiniu
          qiniuFileKey={qiniuFileKey}
          accept="video/mp4,video/quicktime,video/*"
          disabled={uploading}
          beforeUpload={this.beforeUploadVideo}
          style={{ display: 'none' }}
          onProgress={$.page.uploadProgress}
          onSuccess={$.page.videoUploadSuccess}
        />

        <style jsx global>{`
          .style-159399 {
            display: inline-block;
            vertical-align: top;
            width: 1.96rem;
            height: 1.96rem;
            overflow: hidden;
          }
          .${prefixCls}__item {
            vertical-align: top;
            width: 1.96rem;
            height: 1.96rem;
            margin: 0 0.24rem 0.24rem 0;
            border: 0.02rem dashed #9b9b9b;
            border-radius: ${Styles.radius_sm};
          }
        `}</style>
      </div>
    );
  }
}
