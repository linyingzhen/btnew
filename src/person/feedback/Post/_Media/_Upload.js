/**
 * const prefixCls = 'style-201542';
 * const images = '/static/images/src/person/feedback/Post/_Media';
 * @Author: czy0729
 * @Date: 2018-09-08 18:04:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 18:06:29
 * @Path m.benting.com.cn /src/person/feedback/Post/_Media/_Upload.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Flex, ActivityIndicator } from 'antd-mobile';
import { observer } from '@';
import { Upload, Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-201542';
const prefixClsImage = `${prefixCls}__upload-image`;

@observer
export default class _Upload extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  onUploadClick = () => {
    document.querySelector(`.${prefixClsImage} > input`).click();
  };

  beforeUploadImage = file => {
    const { $ } = this.context;
    const { files, type } = $.getState('_media');

    if (file.size / 1024 / 1024 > 10) {
      Utils.light('图片不能超过10M');
      return false;
    }

    if (type === 'image' && files.length >= 9) {
      Utils.light('图片最多只能上传9个');
      return false;
    }

    return true;
  };

  render() {
    const { $ } = this.context;
    const { files, uploading } = $.getState('_media');
    const { className } = this.props;

    if (files.length >= 9) {
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

        <style jsx global>{`
          .style-201542 {
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
