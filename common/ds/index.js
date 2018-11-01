/**
 * const prefixCls = 'style-432193';
 * const images = '/static/images/common/ds';
 * @Author: czy0729
 * @Date: 2018-06-20 11:15:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-19 00:11:16
 * @Path m.benting.com.cn \common\ds\index.js
 */
// export const shopDS = [
//   {
//     label: '天猫：本汀旗舰店',
//     value: '天猫：本汀旗舰店'
//   },
//   {
//     label: '天猫：本汀麦酥专卖店',
//     value: '天猫：本汀麦酥专卖店'
//   },
//   {
//     label: '淘宝：西门町台客名品',
//     value: '淘宝：西门町台客名品'
//   },
//   {
//     label: '京东：本汀渔具旗舰店',
//     value: '京东：本汀渔具旗舰店'
//   },
//   {
//     label: '苏宁：本汀旗舰店',
//     value: '苏宁：本汀旗舰店'
//   },
//   {
//     label: '唯品会',
//     value: '唯品会'
//   },
//   {
//     label: '本汀官网',
//     value: '本汀官网'
//   },
//   {
//     label: '实体店',
//     value: '实体店'
//   }
// ];

// 月份
export const numberMap = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '七',
  8: '八',
  9: '九',
  10: '十',
  11: '十一',
  12: '十二'
};

// 发现媒体类型
export const discoveryInfoTypeDS = [
  {
    label: '视频',
    value: '1'
  },
  {
    label: '图文',
    value: '2'
  },
  {
    label: '纯文',
    value: '3'
  },
  {
    label: '金币红包',
    value: '10'
  },
  {
    label: '积分红包',
    value: '11'
  },
  {
    label: '现金红包',
    value: '12'
  },
  {
    label: '优惠券红包',
    value: '13'
  }
];

// 渔获有礼分类
export const discoveryFishCategoryDS = [
  {
    label: '鱼竿',
    value: '36'
  },
  {
    label: '鱼饵',
    value: '38'
  },
  {
    label: '鱼线',
    value: '37'
  },
  {
    label: '鱼漂',
    value: '40'
  },
  {
    label: '装备',
    value: '49'
  },
  {
    label: '服饰',
    value: '51'
  },
  {
    label: '配件',
    value: '50'
  }
];

// 社区头顶菜单
export const bbsHeadMenuDS = [
  {
    label: '社区',
    href: '/bbs'
  },
  {
    label: '话题',
    href: '/bbs/topic'
  },
  {
    label: '视频',
    href: '/video'
  }
];

// 银行
export const bankDS = [
  {
    label: '工商银行',
    value: '工商银行',
    icon: 'gongshang',
    type: 'danger'
  },
  {
    label: '农业银行',
    value: '农业银行',
    icon: 'nongye',
    type: 'success'
  },
  {
    label: '中国银行',
    value: '中国银行',
    icon: 'zhongguo'
  },
  {
    label: '建设银行',
    value: '建设银行',
    icon: 'jianshe',
    type: 'primary'
  },
  {
    label: '招商银行',
    value: '招商银行',
    icon: 'zhaoshang',
    type: 'danger'
  },
  {
    label: '广发银行',
    value: '广发银行',
    icon: 'guangfa',
    type: 'danger'
  },
  {
    label: '邮政储蓄银行',
    value: '邮政储蓄银行',
    icon: 'youzheng',
    type: 'success'
  },
  {
    label: '光大银行',
    value: '光大银行',
    icon: 'guangda',
    type: 'warning'
  },
  {
    label: '中信银行',
    value: '中信银行',
    icon: 'zhongxin',
    type: 'danger'
  },
  {
    label: '交通银行',
    value: '交通银行',
    icon: 'jiaotong',
    type: 'danger'
  },
  {
    label: '兴业银行',
    value: '兴业银行',
    icon: 'xingye',
    type: 'primary'
  },
  {
    label: '浦发银行',
    value: '浦发银行',
    icon: 'pufa',
    type: 'primary'
  },
  {
    label: '华夏银行',
    value: '华夏银行',
    icon: 'huaxia',
    type: 'danger'
  },
  {
    label: '深圳发展银行',
    value: '深圳发展银行',
    icon: 'shenzhenfazhan',
    type: 'primary'
  },
  {
    label: '广州农商银行',
    value: '广州农商银行',
    icon: 'nongshang',
    type: 'warning'
  },
  {
    label: '民生银行',
    value: '民生银行',
    icon: 'minsheng',
    type: 'primary'
  },
  {
    label: '北京银行',
    value: '北京银行',
    icon: 'beijing',
    type: 'danger'
  },
  {
    label: '平安银行',
    value: '平安银行',
    icon: 'pingan',
    type: 'danger'
  },
  {
    label: '天津银行',
    value: '天津银行',
    icon: 'tianjin',
    type: 'primary'
  },
  {
    label: '上海银行',
    value: '上海银行',
    icon: 'shanghai',
    type: 'warning'
  },
  {
    label: '南京银行',
    value: '南京银行',
    icon: 'nanjing',
    type: 'danger'
  },
  {
    label: '宁波银行',
    value: '宁波银行',
    icon: 'ningbo',
    type: 'warning'
  },
  {
    label: '杭州银行',
    value: '杭州银行',
    icon: 'hangzhou',
    type: 'primary'
  },
  {
    label: '江苏银行',
    value: '江苏银行',
    icon: 'jiangsu',
    type: 'warning'
  },
  {
    label: '重庆银行',
    value: '重庆银行',
    icon: 'chongqin',
    type: 'success'
  },
  {
    label: '成都银行',
    value: '成都银行',
    icon: 'chengdu',
    type: 'warning'
  },
  {
    label: '哈尔滨银行',
    value: '哈尔滨银行',
    icon: 'haerbin',
    type: 'danger'
  },
  {
    label: '其他',
    value: '其他',
    icon: '',
    type: 'primary'
  }
];
