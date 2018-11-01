/**
 * const prefixCls = 'style-869010';
 * const images = '/static/images/src/person/feedback/Post';
 * @Author: czy0729
 * @Date: 2018-09-08 17:32:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 18:21:18
 * @Path m.benting.com.cn /src/person/feedback/Post/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';

export default class Store extends common {
  @observable
  state = this.initState({
    // 媒体
    _media: {
      files: [], // 选择的文件
      type: undefined, // 这个时候是接受图片还是视频
      uploading: false, // 是否上传中
      percent: 0, // 正在上传百分比
      size: 0 // 正在上传文件大小
    },

    // 输入框
    _textarea: ''
  });

  do = {
    // 提交
    submit: async () => {
      const { _textarea } = this.state;
      const { files } = this.state._media;

      if (!_textarea) {
        Utils.light('请您留下意见');
        return;
      }

      await Api.P('do_feedback_add', {
        content: _textarea,
        imgId: files.map(item => item.fileId).join(',')
      });

      this.page.reset();
      Utils.router.replace('/person/feedback/success');
    }
  };

  page = {
    // 文件上传过程
    uploadProgress: (step, file) => {
      const percent = Math.round(step.percent);

      this.setState(
        {
          uploading: true,
          percent,
          size: file.size
        },
        '_media'
      );
    },

    // 图片上传成功
    imageUploadSuccess: result => {
      const { files } = this.getState('_media');

      const _files = [...files];
      _files.push(result.data);

      this.setState(
        {
          files: _files,
          type: 'image',
          percent: 0,
          size: 0,
          uploading: false
        },
        '_media'
      );
    },

    // 文件上传失败
    uploadError: () =>
      this.setState(
        {
          uploading: false
        },
        '_media'
      ),

    // 删除媒体
    delete: index => {
      const { files } = this.getState('_media');
      const _files = [...files];

      _files.splice(index, 1);

      if (_files.length === 0) {
        this.setState(
          {
            files: [],
            type: undefined
          },
          '_media'
        );
      } else {
        this.setState(
          {
            files: _files
          },
          '_media'
        );
      }
    },

    // 清空
    reset: () => {
      this.setState(
        {
          files: [],
          type: undefined,
          uploading: false,
          percent: 0,
          size: 0
        },
        '_media'
      );
      this.setState('', '_textarea');
    }
  };
}
