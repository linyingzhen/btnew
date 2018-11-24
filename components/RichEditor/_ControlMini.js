/**
 * const prefixCls = 'style-146897';
 * const images = '/static/images/components/RichEditor';
 * @Author: czy0729
 * @Date: 2018-11-05 17:47:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-06 11:40:10
 * @Path bt_mb_new /components/RichEditor/_ControlMini.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EditorState, Entity, Modifier, AtomicBlockUtils } from 'draft-js';
import { Flex } from '@components';
import Api from '@api';
import Utils from '@utils';
import Styles from '@styles';
import Upload from '../Upload';
import BtnControl from './_BtnControl';
import BtnEmoji from './_BtnEmoji';

const prefixCls = 'style-829803';

export default class _Control extends React.Component {
  static propsTypes = {
    onOk: PropTypes.func,
    onGetAutoSave: PropTypes.func
  };

  static defaultProps = {
    onOk: Function.prototype,
    onGetAutoSave: Function.prototype
  };

  state = {
    uploading: false
  };

  addMedia = (type, data) => {
    const { editorState, onChange } = this.props;

    const entityKey = Entity.create(type, 'IMMUTABLE', data);
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    );

    if (newEditorState) {
      onChange(newEditorState);
    }
  };

  addDecoratorItem = (key, value, text) => {
    const { editorState, onChange } = this.props;

    const entityKey = Entity.create(key, 'IMMUTABLE', value);
    const newContentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      text,
      null,
      entityKey
    );
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      `insert-${key}`
    );

    if (newEditorState) {
      onChange(newEditorState);
    }
  };

  getBackup = () => {
    const { localStorageKey, onGetAutoSave } = this.props;
    const backupDS = Utils.lsGet(localStorageKey, []);

    if (backupDS.length === 0) {
      Utils.light('没有任何自动保存数据');
    } else {
      const DS = backupDS.map(item => ({
        icon: Utils.date('H:i', item.date / 1000),
        title: Utils.date('m-d', item.date / 1000)
      }));

      Utils.shareActionSheet(
        DS,
        index => {
          if (backupDS[index]) {
            Utils.onConfirm('恢复会覆盖当前数据，确定恢复?', () => {
              onGetAutoSave(backupDS[index]);
            });
          }
        },
        {
          message: '请选择你要恢复的数据',
          destructiveButtonIndex: undefined
        }
      );
    }
  };

  undo = () => {
    const { editorState, onChange } = this.props;

    const newEditorState = EditorState.undo(editorState);

    if (newEditorState) {
      onChange(newEditorState);
    }
  };

  redo = () => {
    const { editorState, onChange } = this.props;

    const newEditorState = EditorState.redo(editorState);

    if (newEditorState) {
      onChange(newEditorState);
    }
  };

  renderBtnUploadImage() {
    const { uploading } = this.state;

    return (
      <Upload
        className={`${prefixCls}__upload-image ml-md`}
        disabled={uploading}
        beforeUpload={() => Utils.loading('上传中...')}
        onSuccess={result => {
          const { code, data } = result;

          if (code !== 0) {
            Utils.hideToast();
            Utils.light(`文件上传失败, ${result.err}`);
            return;
          }

          this.addMedia('image', {
            src: data.fileId
          });

          Utils.hideToast();
        }}
      >
        <BtnControl label="pic2" />

        <style jsx global>{`
          .style-829803 {
          }
          .${prefixCls}__upload-image {
            display: inline-block;
            width: 0.6rem;
            height: 0.6rem;
          }
        `}</style>
      </Upload>
    );
  }

  renderBtnUploadVideo() {
    const { qiniu, qiniuFileKey, onQiniuUploadClick } = this.props;
    const { uploading } = this.state;

    return (
      <Upload
        className={`${prefixCls}__upload-video ml-md`}
        accept="video/mp4,video/quicktime,video/*"
        disabled={uploading}
        needCb
        qiniu={qiniu}
        qiniuFileKey={qiniuFileKey}
        beforeUpload={() => Utils.loading('上传中...')}
        onSuccess={async result => {
          let data;

          if (qiniu) {
            if (result.ret !== 'success') {
              Utils.hideToast();
              Utils.light('视频上传失败，请重试。');
              return;
            }

            data = await Api.P('get_qiniu_file-info', {
              key: qiniuFileKey
            });

            this.addMedia('video', {
              src: data.filePath,
              poster: data.surImg,
              size: data.fsize,
              playTime: data.playTime
            });
          } else {
            if (result.code !== 0) {
              Utils.hideToast();
              Utils.light(`文件上传失败, ${result.err}`);
              return;
            }

            const { data } = result;

            this.addMedia('video', {
              src: `${data.targetPath}/${data.name}`,
              poster: data.surface,
              size: data.size,
              playTime: data.play_time
            });
          }

          Utils.hideToast();
        }}
      >
        <BtnControl label="video2" onClick={onQiniuUploadClick} />

        <style jsx global>{`
          .style-829803 {
          }
          .${prefixCls}__upload-video {
            display: inline-block;
            width: 0.6rem;
            height: 0.6rem;
          }
        `}</style>
      </Upload>
    );
  }

  render() {
    const { className, focused } = this.props;

    return (
      <Flex className={classNames(prefixCls, className)}>
        <Flex.Item>
          <BtnEmoji focused={focused} onAdd={this.addDecoratorItem} />
          {this.renderBtnUploadImage()}
          {this.renderBtnUploadVideo()}
        </Flex.Item>
        <BtnControl
          className="ml-sm"
          label="history"
          onClick={this.getBackup}
        />

        <style jsx global>{`
          .style-829803 {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: ${Styles.z_rich_editor_control};
            padding: ${Styles.sm} ${Styles.wind};
            background: #e9e9e9;
          }
        `}</style>
      </Flex>
    );
  }
}
