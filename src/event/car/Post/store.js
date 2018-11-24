/**
 * const prefixCls = 'style-895317';
 * const images = '/static/images/src/event/car/Post';
 * @Author: czy0729
 * @Date: 2018-11-08 11:42:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-21 14:53:53
 * @Path bt_mb_new /src/event/car/Post/store.js.git
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Utils from '@utils';
import { goodsDS } from '@src/discovery/fish/Post/ds';
import { tid } from '../ds';
import { mainGoodsDS } from './ds';

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

    // 规则
    _rule: {
      show: false
    }
  });

  do = {
    // 发布
    publish: async values => {
      const { id = tid } = this.params.params;
      const { files } = this.getState('_media');
      const con = this.getState('_textarea');
      const { goodsId, len, weight, location, address, fishDate } = values;

      if (!con) {
        Utils.light('请完善详细描述');
        return;
      }

      if (!files.length) {
        Utils.light('请添加图片');
        return;
      }

      if (!goodsId || !len || !location || !address || !fishDate) {
        Utils.light('请先完善渔获信息');
        return;
      }

      const isCarEvent = id == tid;
      let rodName;
      let categoryId = 36;
      let _goodsId = goodsId;
      if (isCarEvent) {
        rodName = Utils.getLabel(mainGoodsDS, goodsId);
      } else {
        const ids = goodsId.split(',');
        [categoryId, _goodsId] = ids;

        goodsDS.forEach(item => {
          if (item.value == ids[0]) {
            item.children.forEach(i => {
              if (i.value == ids[1]) {
                rodName = i.label;
              }
            });
          }
        });
      }

      const _fishDate = Utils.date('Y-m-d', fishDate.getTime() / 1000);
      const _location = `${location
        .replace('市辖区', '')
        .replace(/,/g, '')}${address}`;
      const query = {
        tit: `${rodName}|${_location}||${weight}|`,
        rodName,
        weight,
        dtsourceType: 100,
        dtsourceCategory: categoryId,
        dtsourceId: _goodsId,
        con,
        infoType: 2,
        fileIds: files.map(item => item.fileId).join(','),
        tid: id,
        len,
        fishDate: _fishDate,
        location: _location
      };

      await Api.P('do_event-car_publish', query);

      // 发布成功，还原页面store
      this.page.reset();
      Utils.router.replace(
        `/event/car/success_publish?id=${id}`,
        `/event/car/success_publish/${id}`
      );
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
    },

    // 显示规则
    showRule: () =>
      this.setState(
        {
          show: true
        },
        '_rule'
      ),

    // 隐藏规则
    hideRule: () =>
      this.setState(
        {
          show: false
        },
        '_rule'
      )
  };
}
