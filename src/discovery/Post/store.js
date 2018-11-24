/**
 * const prefixCls = 'style-544830';
 * const images = '/static/images/src/discovery/Post';
 * @Author: czy0729
 * @Date: 2018-07-23 13:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-05 11:59:48
 * @Path m.benting.com.cn /src/discovery/Post/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';
import { infoTypeDS } from './ds';

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
    _textarea: '',

    // 七牛文件key
    qiniuFileKey: ''
  });

  fetch = {
    config: {},

    // 七牛文件key
    qiniuKey: async () => {
      const res = Api.P('get_qiniu_key');

      const data = await res;

      this.setState(data, 'qiniuFileKey');

      return res;
    }
  };

  do = {
    // 发布
    publish: async () => {
      const {
        files,
        type
        // location,
        // permit,
        // atList
      } = this.getState('_media');
      const con = this.getState('_textarea');
      // const skinList = this.getState('skinList');

      if (!files.length && con.replace(/\s/g, '').length < 30) {
        Utils.light('纯文不能少于30个字');
        return;
      }

      if (con.replace(/\s/g, '').length < 20) {
        Utils.light('图文不能少于20个字');
        return;
      }

      const query = {
        con,
        infoType: infoTypeDS[type],
        fileIds: files.map(item => item.fileId).join(',')
        // infoAddress: location.address,
        // userLong: location.lng,
        // userLat: location.lat,
        // permit,
        // atList: atList.filter(item => ~con.indexOf(`@${item.name}`))
      };

      // if (skinList.list && skinList.list[0]) {
      //   query.skinId = skinList.list[0].tbId;
      // }

      const { point } = await Api.P('do_publish', query);

      // 发布成功，还原页面store
      this.page.reset();
      Utils.light(`发布成功，积分+${point}`);
      Utils.router.push('/discovery');
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
        '_media'
      );
    },

    // 文件上传失败
    uploadError: () => {
      this.setState(
        {
          uploading: false
        },
        '_media'
      );
    },

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
