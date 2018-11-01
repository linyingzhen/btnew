/**
 * const prefixCls = 'style-584784';
 * const images = '/static/images/src/discovery/fish/Post';
 * @Author: czy0729
 * @Date: 2018-08-11 15:55:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-12 14:31:37
 * @Path m.benting.com.cn /src/discovery/fish/Post/store.js
 */
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import { infoTypeDS, goodsDS } from './ds';

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
    qiniuFileKey: '',

    // 特殊商品
    specialGoods: Const.__EMPTY__,

    // 全部商品DS
    goods: goodsDS
  });

  // params = {
  //   hasFetchGoodsSubData: false
  // };

  fetch = {
    config: {
      one: ['specialGoods']
    },

    // 七牛文件key
    qiniuKey: async () => {
      const res = Api.P('get_qiniu_key');

      const data = await res;

      this.setState({
        qiniuFileKey: data
      });

      return res;
    },

    // 特殊商品
    specialGoods: () =>
      this.fetchThenSetState('get_shop_special-goods', 'specialGoods')

    // 找到分类里面的所有子商品
    // goodsSubData: async (id = 36) => {
    //   const data = await Api.P('get_shop_only-goods-list', {
    //     _: {
    //       limit: 0,
    //       search: {
    //         goodsType: id
    //       }
    //     }
    //   });

    //   let goods = this.getState('goods');
    //   goods = JSON.parse(JSON.stringify(goods));

    //   const index = goods.findIndex(item => item.value == id);

    //   if (index !== -1) {
    //     goods[index].children = data.goodsList.map(item => ({
    //       label: item.title,
    //       value: item.gid,
    //       parId: id
    //     }));
    //   }

    //   this.setState(goods, 'goods');
    // }
  };

  do = {
    // 发布
    publish: async values => {
      const { files, type } = this.getState('_media');
      const con = this.getState('_textarea');
      const goods = this.getState('goods');

      // 是否服饰可不填渔获
      if (String(values.goods).indexOf('51,') !== -1) {
        if (!values.fishArea) {
          Utils.light('请填写地区');
          return;
        }
      } else {
        if (!values.goods || !values.fishKind || !values.fishArea) {
          Utils.light('请先完善渔获信息');
          return;
        }

        if (!values.fishWeight && !values.fishTotalWeight) {
          Utils.light('单尾最重和渔获总重至少需填一项');
          return;
        }
      }

      if (!con) {
        Utils.light('请完善详细描述');
        return;
      }

      if (!files.length) {
        Utils.light('请添加图片或视频');
        return;
      }

      const ids = values.goods.split(',');
      const categoryId = ids[0];
      const goodsId = ids[1];

      // specialGoods存在该id
      // 使用 单品发布 传dtsourceType=20 dtsourceId=商品ID
      // 否则 分类发布 传dtsourceType=21 dtsourceId=分类ID
      const dtsourceType = 20;
      const dtsourceCategory = categoryId;
      const dtsourceId = goodsId;

      let goodsName;
      goods.forEach(item => {
        if (item.value == ids[0]) {
          item.children.forEach(i => {
            if (i.value == ids[1]) {
              goodsName = i.label;
            }
          });
        }
      });

      const query = {
        tit: `${goodsName}|${values.fishArea}|${values.fishKind}|${
          values.fishWeight
        }|${values.fishTotalWeight}`,
        weight: values.fishWeight,
        dtsourceType,
        dtsourceCategory,
        dtsourceId,
        con,
        infoType: infoTypeDS[type],
        fileIds: files.map(item => item.fileId).join(',')
      };

      const { point } = await Api.P('do_publish', query);

      // 发布成功，还原页面store
      this.page.reset();
      Utils.light(`发布成功，积分+${point}`);
      Utils.router.replace(
        `/discovery/fish?id=${dtsourceCategory}&gid=${dtsourceId}`,
        `/discovery/fish/${dtsourceCategory}/${dtsourceId}`
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

  // storeDidMount = () => {
  //   const { hasFetchGoodsSubData } = this.params;
  //   if (hasFetchGoodsSubData) {
  //     return;
  //   }

  //   const goods = this.getState('goods');

  //   goods.forEach(item => {
  //     this.fetch.goodsSubData(item.value);
  //   });
  //   this.setParams({
  //     hasFetchGoodsSubData: true
  //   });
  // };
}
