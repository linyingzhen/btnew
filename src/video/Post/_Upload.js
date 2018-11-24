/**
 * const prefixCls = 'style-134350';
 * const images = '/static/images/src/video/Post';
 * @Author: czy0729
 * @Date: 2018-07-26 10:14:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-05 11:55:03
 * @Path m.benting.com.cn /src/video/Post/_Upload.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Progress } from 'antd-mobile';
import { observer } from '@';
import { Flex, Icon, Video, Upload, Button } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-198939';

const _Textarea = (props, { $ }) => {
  const { className } = props;
  const { files, uploading, percent, size } = $.getState('_upload');
  const qiniuFileKey = $.getState('qiniuFileKey');

  if (files.length) {
    return (
      <div className={classNames(prefixCls, className)}>
        <Video
          src={files[0].targetPath}
          poster={Utils.getImgUrl(files[0].surface)}
          fileSize={files[0].size}
          playSecond={files[0].play_time}
          placeholderPublish
        />
        <Button className="mt-md" type="primary" ghost onClick={$.page.reset}>
          删除视频
        </Button>

        <style jsx>{`
          .style-198939 {
            padding: ${Styles.space};
            background: ${Styles.color_theme};
          }
        `}</style>
      </div>
    );
  }

  return (
    <Flex
      className={classNames(prefixCls, className)}
      direction="column"
      justify="center"
    >
      <div
        className="t-c"
        style={{
          display: uploading ? 'initial' : 'none'
        }}
      >
        <Progress percent={percent} position="normal" />
        <p className="t-28 t-sub t-c mt-16">
          <span>正在上传...</span>
          <span className="ml-xs">{percent}%</span>
          <span className="ml-xs">
            ({Utils.getMB(size * (percent / 100))}
            MB/
            {Utils.getMB(size)}
            MB)
          </span>
        </p>
      </div>
      <div
        className="t-c"
        style={{
          display: uploading ? 'none' : 'initial'
        }}
      >
        <Upload
          qiniu
          qiniuFileKey={qiniuFileKey}
          accept="video/mp4,video/quicktime,video/*"
          disabled={uploading}
          beforeUpload={file => {
            if (file.size / 1024 / 1024 > 200) {
              Utils.light('视频不能超过200M');
              return false;
            }
            return true;
          }}
          onProgress={$.page.uploadProgress}
          onSuccess={$.page.videoUploadSuccess}
        >
          <Flex
            className={`${prefixCls}__upload`}
            justify="center"
            onClick={$.fetch.qiniuFileKey}
          >
            <Icon className="t-48" type="plus" />
          </Flex>
        </Upload>
        <p className="t-30 l-42 t-sub mt-36">
          支持mp4，qt，mov等常用格式，最大支持200M视频
        </p>
      </div>

      <style jsx global>{`
        .style-198939 {
          min-height: 4.08rem;
          padding: 0.4rem 0.8rem;
          background: ${Styles.color_theme};
        }
        .${prefixCls}__upload {
          width: 2.08rem;
          height: 2.08rem;
          border: 0.02rem dashed ${Styles.color_sub};
        }
      `}</style>
    </Flex>
  );
};

_Textarea.contextTypes = {
  $: PropTypes.object
};

export default observer(_Textarea);
