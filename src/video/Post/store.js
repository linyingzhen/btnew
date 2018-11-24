/**
 * const prefixCls = 'style-139266';
 * const images = '/static/images/src/video/Post';
 * @Author: czy0729
 * @Date: 2018-07-26 10:12:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-05 11:57:31
 * @Path m.benting.com.cn /src/video/Post/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import { fromDS } from './ds';

export default class Store extends common {
  @observable
  state = this.initState({
    _upload: {
      files: [],
      uploading: false,
      percent: 0,
      size: 0
    },

    _tags: {
      from: Utils.getValue(fromDS, '原创'),
      tags: []
    },

    qiniuFileKey: '',

    // 视频标签
    tags: Const.__EMPTY__
  });

  fetch = {
    config: {
      one: ['tags']
    },

    // 七牛文件key
    qiniuFileKey: async () => {
      const qiniuFileKey = this.getState('qiniuFileKey');

      if (qiniuFileKey) {
        return false;
      }

      const res = Api.P('get_qiniu_key');
      const data = await res;

      this.setState(data, 'qiniuFileKey');

      return res;
    },

    // 视频标签
    tags: () =>
      this.fetchThenSetState('get_video_label', 'tags', {
        _: {
          limit: 0,
          search: {
            labelType: 2
          }
        }
      })
  };

  do = {
    // 发布
    submit: async values => {
      const { files } = this.getState('_upload');
      const { from, tags } = this.getState('_tags');

      if (!files.length) {
        Utils.light('请上传视频');
        return;
      }

      await Api.P('do_video-v2_add', {
        fileId: files[0].fileId,
        from,
        tag: tags.join(','),
        ...values
      });

      this.page.reset();
      Utils.light('发布成功');
      Utils.router.push('/video');
    }
  };

  page = {
    // 重置
    reset: () => {
      this.setState(
        {
          files: [],
          uploading: false,
          percent: 0,
          size: 0
        },
        '_upload'
      );
      this.setState(
        {
          from: '',
          tags: []
        },
        '_tags'
      );
      this.setState('', 'qiniuFileKey');
    },

    // 删除视频
    delete: () => {
      this.setState(
        {
          files: [],
          uploading: false,
          percent: 0,
          size: 0
        },
        '_upload'
      );
      this.setState('', 'qiniuFileKey');
    },

    // 文件上传过程
    uploadProgress: (step, file) => {
      const percent = Math.round(step.percent);

      this.setState(
        {
          uploading: true,
          percent,
          size: file.size
        },
        '_upload'
      );
    },

    // 视频上传成功
    videoUploadSuccess: async result => {
      if (result.ret !== 'success') {
        this.setState({
          files: [],
          type: 'video',
          percent: 0,
          size: 0,
          uploading: false
        });

        Utils.light('视频上传失败，请重试。');
        this.setState('', 'qiniuFileKey');
        return;
      }

      const qiniuFileKey = this.getState('qiniuFileKey');
      const data = await Api.P('get_qiniu_file-info', {
        key: qiniuFileKey
      });

      this.setState(
        {
          files: [
            {
              fileId: qiniuFileKey,
              name: data.hash,
              play_time: data.playTime,
              size: data.fsize,
              surface: data.surImg,
              targetPath: data.filePath,
              type: 'mp4'
            }
          ],
          type: 'video',
          percent: 0,
          size: 0,
          uploading: false
        },
        '_upload'
      );
    },

    // 标签点击
    tagClick: tagId => {
      const { tags } = this.getState('_tags');
      let _tags;

      if (tags.find(item => item === tagId)) {
        _tags = tags.filter(item => item !== tagId);
      } else {
        _tags = [...tags, tagId];
      }

      this.setState({ tags: _tags }, '_tags');
    }
  };
}
